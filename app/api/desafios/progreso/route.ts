import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { progresoDesafio, desafio, lecturaDesafioLog } from "@/db/schema"; // asegúrate de tener estas tablas

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { tipoObjetivo, lecturaId, categoria, desempenoId } = body;

  try {
    let condiciones = [eq(desafio.tipoObjetivo, tipoObjetivo)]; 

    // Ajustes por tipo de desafío
    if (tipoObjetivo === "categoria") {
      if (!categoria) return NextResponse.json({ error: "Falta la categoría" }, { status: 400 });
      condiciones.push(eq(desafio.categoria, categoria));
    }

    if (tipoObjetivo === "desempeno_perfecto") {
      if (!desempenoId) return NextResponse.json({ error: "Falta el desempeñoId" }, { status: 400 });
      condiciones.push(eq(desafio.desempenoId, desempenoId));
    }

    const desafios = await db.query.desafio.findMany({
      where: and(...condiciones),
    });

    for (const d of desafios) {
      // Verificamos si ya se usó esta lectura para este desafío
      const yaRegistrado = await db.query.lecturaDesafioLog.findFirst({
        where: and(
          eq(lecturaDesafioLog.usuarioId, userId),
          eq(lecturaDesafioLog.lecturaId, lecturaId),
          eq(lecturaDesafioLog.desafioId, d.id)
        ),
      });

      if (yaRegistrado) continue;

      // Insertar el log de lectura usada para este desafío
      await db.insert(lecturaDesafioLog).values({
        usuarioId: userId,
        lecturaId,
        desafioId: d.id,
      });

      // Actualizar el progreso del usuario en ese desafío (si existe)
      const progresoActual = await db.query.progresoDesafio.findFirst({
        where: and(
          eq(progresoDesafio.usuarioId, userId),
          eq(progresoDesafio.desafioId, d.id)
        ),
      });

      if (progresoActual) {
        await db
          .update(progresoDesafio)
          .set({ progreso: progresoActual.progreso + 1 })
          .where(eq(progresoDesafio.id, progresoActual.id));
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al registrar progreso de desafío:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
