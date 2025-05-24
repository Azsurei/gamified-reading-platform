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

    const { respuestas } = await req.json();
    if (!respuestas) {
      return NextResponse.json(
        { error: "Respuestas no proporcionadas" },
        { status: 400 }
      );
    }
    console.log("Respuestas recibidas:", respuestas);
    //Respuestas es un objeto con el id de la pregunta y un array de respuestas
    const respuestasArray = Object.values(respuestas);
    console.log("Respuestas transformadas:", respuestasArray);
    const respuestasConUsuario = respuestasArray.map((r: object) => ({
      ...r,
      usuarioId: userId,
    }));
    await db.insert(respuesta).values(respuestasConUsuario);

    return NextResponse.json({ message: "Respuestas guardadas exitosamente." });
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
