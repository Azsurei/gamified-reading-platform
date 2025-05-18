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

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Formato inválido. Se esperaba un array de respuestas." },
        { status: 400 }
      );
    }

    const respuestasFormateadas = body.map((r) => ({
      usuarioId: userId,
      preguntaId: r.preguntaId,
      contenidoRespuesta: r.contenidoRespuesta,
      alternativaId: r.alternativaId ?? null,
      retroalimentacion: r.retroalimentacion ?? null,
      resultado: r.resultado,
      puntajeObtenido: r.puntajeObtenido,
      // fechaRespuesta y numeroReintento se omiten para usar valores por defecto
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