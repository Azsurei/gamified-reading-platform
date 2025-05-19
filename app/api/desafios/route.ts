import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { desafio, progresoDesafio } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("No autorizado", { status: 401 });
  }

  // Obtener todos los desafíos existentes
  const desafios = await db.select().from(desafio);

  // Obtener progreso del usuario actual
  const progresos = await db
    .select()
    .from(progresoDesafio)
    .where(eq(progresoDesafio.usuarioId, userId));

  // Encontrar desafíos sin progreso asociado aún
  const desafioIdsConProgreso = progresos.map((p) => p.desafioId);
  const desafiosSinProgreso = desafios.filter(
    (d) => !desafioIdsConProgreso.includes(d.id)
  );

  // Insertar progresos iniciales para desafíos faltantes
  if (desafiosSinProgreso.length > 0) {
    await db.insert(progresoDesafio).values(
      desafiosSinProgreso.map((d) => ({
        usuarioId: userId,
        desafioId: d.id,
        progreso: 0,
      }))
    );
  }

  // Volver a consultar los progresos actualizados
  const progresosActualizados = await db
    .select()
    .from(progresoDesafio)
    .where(eq(progresoDesafio.usuarioId, userId));

  // Combinar desafío + progreso
  const respuesta = desafios.map((d) => {
    const progreso = progresosActualizados.find((p) => p.desafioId === d.id);
    return {
      ...d,
      progreso: progreso?.progreso ?? 0,
      completado: progreso?.completado ?? false,
      fechaLogro: progreso?.fechaLogro ?? null,
    };
  });

  return NextResponse.json(respuesta);
}
