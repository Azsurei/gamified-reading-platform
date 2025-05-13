// app/api/analizar-respuesta/route.ts

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Esta función responde a peticiones POST a /api/analizar-respuesta
export async function POST(request: Request) {
  try {
    // Extraemos los datos del cuerpo de la solicitud
    const { lectura, pregunta, respuesta } = await request.json();

    // Creamos una instancia del cliente de Gemini con tu API key
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY, // Asegúrate que esté en tu archivo .env.local
    });

    // Formamos el prompt para enviarle a Gemini
    const prompt = `
    Analiza la respuesta de un estudiante con base en la siguiente lectura y pregunta.
    
    Lectura:
    ${lectura}
    
    Pregunta:
    ${pregunta}
    
    Respuesta del estudiante:
    ${respuesta}
    
    Indica si la respuesta es correcta o no, justifica tu decisión brevemente y ofrece una retroalimentación clara. Usa un lenguaje simple.
    `;

    // Llamamos al modelo Gemini 2.5 Flash (versión preliminar)
    const resultStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-pro-preview-05-06',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseMimeType: 'text/plain',
      },
    });

    // Unimos las partes del stream en una única cadena
    let fullResponse = '';
    for await (const chunk of resultStream) {
      fullResponse += chunk.text;
    }

    // Devolvemos la respuesta al frontend
    return NextResponse.json({ result: fullResponse });

  } catch (error) {
    console.error('Error al procesar con Gemini:', error);
    return NextResponse.json({ error: 'Hubo un error al analizar la respuesta.' }, { status: 500 });
  }
}
