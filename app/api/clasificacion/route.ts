import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { usuario } from "@/db/schema"; // Ajusta si tu path real difiere
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const users = await db
      .select({
        id: usuario.id,
        nombre: usuario.nombre,
        imagen: usuario.imagen,
        xp: usuario.xpGanado,
      })
      .from(usuario)
      .orderBy(desc(usuario.xpGanado));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener la clasificación:", error);
    return NextResponse.json(
      { error: "Error al obtener la clasificación" },
      { status: 500 }
    );
  }
}
