import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { eq, gte, sql } from "drizzle-orm";
import {
  usuario,
  lecturaCompletada,
  progresoDesafio,
  desafio,
  pregunta,
  respuesta,
  desempeno,
  lectura,
} from "@/db/schema";
import { subDays } from "date-fns";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth(); // Clerk en server-side

  // 1. Obtener datos del usuario
  const [user] = await db.select().from(usuario).where(eq(usuario.id, userId));

  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  // 2. Lecturas completadas
  const lecturas = await db
    .select({ fechaCompletado: lecturaCompletada.fechaCompletado })
    .from(lecturaCompletada)
    .where(eq(lecturaCompletada.usuarioId, userId));

  const lecturasLeidas = lecturas.length;

  // 3. Días de racha (consecutivos)
  const fechas = lecturas.map((l) => new Date(l.fechaCompletado));
  const diasUnicos = new Set(fechas.map((f) => f.toDateString()));

  let racha = 0;
  let hoy = new Date();
  let encontróDia = false;

  for (let i = 0; i < 30; i++) {
    const fecha = subDays(hoy, i).toDateString();
    if (diasUnicos.has(fecha)) {
      racha++;
      encontróDia = true;
    } else {
      // permitimos que el primer día fallido sea hoy si no ha hecho nada aún
      if (i === 0 && !encontróDia) continue;
      break;
    }
  }

  // 4. Badges (desafíos completados al 100%)
  const progresos = await db
    .select({
      progreso: progresoDesafio.progreso,
      meta: desafio.meta,
      imagen: desafio.imagenInsignia,
    })
    .from(progresoDesafio)
    .innerJoin(desafio, eq(progresoDesafio.desafioId, desafio.id))
    .where(eq(progresoDesafio.usuarioId, userId));

  const badges = progresos
    .filter((p) => p.progreso >= p.meta)
    .map((p) => p.imagen);

  // 5. Gráfico de radar
  const desempenoStats = await db
    .select({
      nombreDesempeno: desempeno.nombre,
      puntajePromedio: sql`
      ROUND(
        SUM(${respuesta.puntajeObtenido})::decimal / 
        (COUNT(${respuesta.id}) * 10) * 100
      )
    `.mapWith(Number),
    })
    .from(respuesta)
    .innerJoin(pregunta, eq(respuesta.preguntaId, pregunta.id))
    .innerJoin(desempeno, eq(pregunta.desempenoId, desempeno.id))
    .where(eq(respuesta.usuarioId, userId))
    .groupBy(desempeno.nombre);

  // 6. Gráfico de barras verticales
  const TODAS_LAS_CATEGORIAS = [
    "Literatura clásica",
    "Historia",
    "Ciencia",
    "Entretenimiento",
    "Arte",
  ];
  
  const resultados = await db
    .selectDistinctOn([lectura.id], {
      categoria: lectura.categoria,
      lecturaId: lectura.id,
    })
    .from(lecturaCompletada)
    .innerJoin(lectura, eq(lectura.id, lecturaCompletada.lecturaId))
    .where(eq(lecturaCompletada.usuarioId, userId));

  const conteoPorCategoria = Object.fromEntries(
    TODAS_LAS_CATEGORIAS.map((cat) => [cat, 0])
  );

  for (const r of resultados) {
    if (conteoPorCategoria.hasOwnProperty(r.categoria)) {
      conteoPorCategoria[r.categoria]++;
    }
  }

  const categoriasLeidas = TODAS_LAS_CATEGORIAS.map((categoria) => ({
    categoria,
    cantidad: conteoPorCategoria[categoria] || 0,
  }));

  return NextResponse.json({
    username: user.nombre,
    registeredDate: user.fechaCreacion,
    avatarUrl: user.imagen,
    stats: {
      lecturasLeidas: lecturasLeidas,
      experiencia: user.xpGanadoTotal,
      vecesTop3: user.numeroTop3,
      diasRacha: racha,
    },
    badges,
    desempeno: desempenoStats,
    categoriasLeidas: categoriasLeidas,
  });
}
