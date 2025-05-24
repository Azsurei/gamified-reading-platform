import { db } from "@/db/drizzle";
import { lecturaCompletada } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { lecturaId, xpGanado, numeroReintento } = await req.json();

    if (!lecturaId) {
      return NextResponse.json(
        { error: "lecturaId es requerido" },
        { status: 400 }
      );
    }

    await db.insert(lecturaCompletada).values({
      usuarioId: userId,
      lecturaId,
      puntaje: xpGanado,
      numeroReintento: numeroReintento + 1,
    });

    return NextResponse.json({ message: "Lectura completada registrada" });
  } catch (error) {
    console.error("Error al registrar lectura completada:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
