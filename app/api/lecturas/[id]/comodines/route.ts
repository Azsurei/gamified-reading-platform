import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import {
  comodinLectura,
  comodinUsuario,
  comodinLecturaUsuario,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
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
    const [comodines, inventarioComodines, comodinesComprados] =
      await Promise.all([
        db
          .select()
          .from(comodinLectura)
          .where(eq(comodinLectura.lecturaId, lecturaId)),

        db
          .select()
          .from(comodinUsuario)
          .where(eq(comodinUsuario.usuarioId, userId)),

        db
          .select({
            comodinId: comodinLecturaUsuario.tipoComodinId,
          })
          .from(comodinLecturaUsuario)
          .where(
            and(
              eq(comodinLecturaUsuario.usuarioId, userId),
              eq(comodinLecturaUsuario.lecturaId, lecturaId)
            )
          ),
      ]);

    const cantidadPorTipo = (tipoId: number) =>
      inventarioComodines.find((c) => c.tipoComodinId === tipoId)?.cantidad ??
      0;

    return NextResponse.json({
      comodines,
      inventarioComodin1: cantidadPorTipo(1),
      inventarioComodin2: cantidadPorTipo(2),
      inventarioComodin3: cantidadPorTipo(3),
      comodinesComprados: comodinesComprados.map((c) => c.comodinId),
    });
  } catch (error) {
    console.error("Error al obtener los comodines:", error);
    return NextResponse.json(
      { error: "Error al obtener los comodines" },
      { status: 500 }
    );
  }
}
