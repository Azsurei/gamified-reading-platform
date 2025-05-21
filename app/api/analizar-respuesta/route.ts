import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  console.log("Petición recibida en /api/analizar-respuesta");
  try {
    const body = await request.json();
    const {
      lecturaContenido,
      preguntaContenido,
      preguntaTipoDeCorreccion,
      respuestaContenido,
    } = body;

    if (
      typeof lecturaContenido !== "string" ||
      typeof preguntaContenido !== "string" ||
      typeof preguntaTipoDeCorreccion !== "string" ||
      typeof respuestaContenido !== "string"
    ) {
      return NextResponse.json(
        { error: "Campos inválidos en la petición" },
        { status: 400 }
      );
    }

    // Construir el prompt según el tipo de corrección
    let prompt: string;
    if (preguntaTipoDeCorreccion === "objetivo") {
      prompt = `Eres un asistente de corrección de respuestas de estudiantes. Con la siguiente información:
- Lectura: ${lecturaContenido}
- Pregunta (objetiva): ${preguntaContenido}
- Respuesta del estudiante: ${respuestaContenido}

Evalúa si la respuesta del estudiante es correcta. Devuelve un objeto JSON con los campos:
- esCorrecta: boolean (true si la respuesta es correcta, false de lo contrario).
- retroalimentacion: string (proporciona una breve explicación o retroalimentación de la respuesta del estudiante).

Solo devuelve el objeto JSON, sin ningún texto adicional.
Ejemplo de formato:
{
  "esCorrecta": true,
  "retroalimentacion": "La respuesta es correcta porque..."
}`;
    } else if (preguntaTipoDeCorreccion === "subjetivo") {
      prompt = `Eres un asistente de corrección de respuestas de estudiantes. Con la siguiente información:
- Lectura: ${lecturaContenido}
- Pregunta (subjetiva): ${preguntaContenido}
- Respuesta del estudiante: ${respuestaContenido}

Evalúa el nivel de la respuesta del estudiante en 'bajo', 'medio' o 'alto' según su calidad. Además, proporciona una retroalimentación sobre la respuesta.
Devuelve un objeto JSON con los campos:
- nivel: 'bajo' | 'medio' | 'alto'
- retroalimentacion: string

Solo devuelve el objeto JSON, sin ningún texto adicional.
Ejemplo de formato:
{
  "nivel": "medio",
  "retroalimentacion": "La respuesta tiene algunos puntos buenos pero le falta detalle."
}`;
    } else {
      return NextResponse.json(
        { error: "Tipo de corrección inválido" },
        { status: 400 }
      );
    }

    // Llamar al modelo Gemini usando el SDK
    const ai = new GoogleGenAI({
      vertexai: false,
      apiKey: process.env.GEMINI_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const resultText = response.text;
    // Intentar extraer JSON desde un bloque Markdown si existe
    const match = resultText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = match ? match[1] : resultText;
    let resultJson;
    try {
      resultJson = JSON.parse(jsonString);
    } catch {
      return NextResponse.json(
        {
          error: "Respuesta del modelo no es JSON válido",
          detalle: resultText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(resultJson);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud", detalle: error.message },
      { status: 500 }
    );
  }
}
