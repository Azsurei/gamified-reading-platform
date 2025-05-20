import { db } from "@/db/drizzle";
import { eq, and, max } from "drizzle-orm";
import { lectura, pregunta, alternativa, lecturaCompletada } from "@/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth(); // Clerk en server-side
  const params = await props.params;
  const lecturaId = parseInt(params.id);

  // Obtener la lectura
  const lecturaResult = await db
    .select()
    .from(lectura)
    .where(eq(lectura.id, lecturaId))
    .limit(1);

  // Obtener todas las preguntas asociadas a la lectura
  const preguntasResult = await db
    .select()
    .from(pregunta)
    .where(eq(pregunta.lecturaId, lecturaId))
    .orderBy(pregunta.id);

  // Filtrar preguntas de tipo 'seleccion' y obtener sus alternativas
  const preguntasConAlternativas = await Promise.all(
    preguntasResult.map(async (preg) => {
      if (preg.tipo === "seleccion") {
        const alternativas = await db
          .select()
          .from(alternativa)
          .where(eq(alternativa.preguntaId, preg.id));

        return {
          id: preg.id,
          tipo: preg.tipo,
          tipoCorreccion: preg.tipoCorreccion,
          contenido: preg.enunciado,
          dificultad: preg.nivelDificultad,
          alternativas: alternativas.map((alt) => ({
            id: alt.id,
            texto: alt.texto,
          })),
          respuestaCorrecta:
            alternativas.find((alt) => alt.esCorrecta)?.id ?? null,
          desempenoId: preg.desempenoId,
          lecturaId: preg.lecturaId,
        };
      } else {
        return {
          id: preg.id,
          tipo: preg.tipo,
          tipoCorreccion: preg.tipoCorreccion,
          contenido: preg.enunciado,
          dificultad: preg.nivelDificultad,
          desempenoId: preg.desempenoId,
          lecturaId: preg.lecturaId,
        };
      }
    })
  );

  // Obtener puntaje máximo si el usuario está autenticado
  let puntajeMaximo: number | null = null;

  if (userId) {
    const resultadoCompletado = await db
      .select({ puntajeMaximo: max(lecturaCompletada.puntaje) })
      .from(lecturaCompletada)
      .where(
        and(
          eq(lecturaCompletada.usuarioId, userId),
          eq(lecturaCompletada.lecturaId, lecturaId)
        )
      );

    puntajeMaximo = resultadoCompletado[0]?.puntajeMaximo ?? null;
  }

  return NextResponse.json({
    lectura: lecturaResult[0],
    preguntas: preguntasConAlternativas,
    puntajeMaximo,
  });
}
