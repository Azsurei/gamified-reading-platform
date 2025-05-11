import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // Ajusta si tu instancia de Drizzle está en otra ruta
import { lectura } from "@/db/schema"; // Ajusta si tu esquema está en otra ruta

export async function GET() {
  try {
    const lecturas = await db
      .select({
        id: lectura.id,
        titulo: lectura.titulo,
        descripcion: lectura.descripcion,
        imagen: lectura.imagen,
        categoria: lectura.categoria,
      })
      .from(lectura);

    return NextResponse.json(lecturas);
  } catch (error) {
    console.error("Error al obtener lecturas:", error);
    return new NextResponse("Error al obtener lecturas", { status: 500 });
  }
}
