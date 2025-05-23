import { db } from "@/db/drizzle";
import { respuesta } from "@/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // Clerk en server-side

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();

    const { numeroReintento, respuestas } = body;

    if (!Array.isArray(respuestas) || typeof numeroReintento !== "number") {
      return NextResponse.json(
        {
          error:
            "Formato inválido. Se esperaba un array de respuestas y un número de reintento.",
        },
        { status: 400 }
      );
    }

    const respuestasFormateadas = respuestas.map((r: any) => ({
      preguntaId: r.preguntaId,
      usuarioId: userId,
      contenidoRespuesta: r.contenidoRespuesta,
      alternativaId: r.alternativaId ?? null,
      retroalimentacion: r.retroalimentacion ?? null,
      resultado: r.resultado,
      puntajeObtenido: r.puntajeObtenido,
      numeroReintento,
    }));

    await db.insert(respuesta).values(respuestasFormateadas);

    return NextResponse.json({ message: "Respuestas guardadas exitosamente." });
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
