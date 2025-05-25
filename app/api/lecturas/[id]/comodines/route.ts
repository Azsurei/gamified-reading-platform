import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { comodinLectura, comodinUsuario } from "@/db/schema"; // Asegúrate de tener este schema
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const lecturaId = parseInt(params.id);
  const { userId } = await auth();

  if (isNaN(lecturaId)) {
    return NextResponse.json(
      { error: "ID de lectura inválido" },
      { status: 400 }
    );
  }

  try {
    const comodines = await db
      .select()
      .from(comodinLectura)
      .where(eq(comodinLectura.lecturaId, lecturaId));

    const inventarioComodines = await db
      .select()
      .from(comodinUsuario)
      .where(eq(comodinUsuario.usuarioId, userId));

    return NextResponse.json({ comodines, inventarioComodin1: inventarioComodines[0].cantidad, inventarioComodin2: inventarioComodines[1]?.cantidad, inventarioComodin3: inventarioComodines[2]?.cantidad });
  } catch (error) {
    console.error("Error al obtener los comodines:", error);
    return NextResponse.json(
      { error: "Error al obtener los comodines" },
      { status: 500 }
    );
  }
}
