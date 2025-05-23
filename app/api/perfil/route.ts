import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { eq, gte, sql, and, asc } from "drizzle-orm";
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
    .innerJoin(
      // Subconsulta: mejor intento por lectura
      sql`
      (
        SELECT lectura_id, MAX(puntaje) AS max_puntaje, usuario_id
        FROM lectura_completada
        WHERE usuario_id = ${userId}
        GROUP BY lectura_id, usuario_id
      ) AS mejores_intentos
    `,
      sql`
      mejores_intentos.lectura_id = pregunta.lectura_id
      AND mejores_intentos.usuario_id = ${userId}
    `
    )
    .where(
      and(
        eq(respuesta.usuarioId, userId),
        sql`
      respuesta.numero_reintento = (
        SELECT numero_reintento
        FROM lectura_completada
        WHERE lectura_completada.usuario_id = ${userId}
        AND lectura_completada.lectura_id = pregunta.lectura_id
        AND lectura_completada.puntaje = mejores_intentos.max_puntaje
        LIMIT 1
      )
    `
      )
    )
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

  // 7. Tercer grafico
  const subquery = db
    .select({
      lecturaId: lecturaCompletada.lecturaId,
      puntaje: sql`MAX(${lecturaCompletada.puntaje})`.as("puntaje"),
    })
    .from(lecturaCompletada)
    .where(eq(lecturaCompletada.usuarioId, userId))
    .groupBy(lecturaCompletada.lecturaId)
    .as("sub");

  const puntajesPorCategoria = await db
    .select({
      categoria: lectura.categoria,
      promedioPuntaje: sql`ROUND(AVG(sub.puntaje)::decimal, 2)`.mapWith(Number),
    })
    .from(subquery)
    .innerJoin(lectura, eq(lectura.id, subquery.lecturaId))
    .groupBy(lectura.categoria);

  // Convertimos a un mapa para acceder más fácil por categoría
  const mapaPuntajes = Object.fromEntries(
    puntajesPorCategoria.map((item) => [item.categoria, item.promedioPuntaje])
  );

  // Creamos el array final con todas las categorías
  const promedioPorCategoria = TODAS_LAS_CATEGORIAS.map((categoria) => ({
    categoria,
    promedioPuntaje: mapaPuntajes[categoria] ?? 0, // o null si prefieres
  }));

  // 8. último gráfico
  const mejoresLecturasOrdenadas = await db
  .select({
    puntaje: sql`MAX(${lecturaCompletada.puntaje})`.mapWith(Number),
    fecha: lecturaCompletada.fechaCompletado,
  })
  .from(lecturaCompletada)
  .where(eq(lecturaCompletada.usuarioId, userId))
  .groupBy(lecturaCompletada.lecturaId, lecturaCompletada.fechaCompletado)
  .orderBy(asc(lecturaCompletada.fechaCompletado));

  const evolucionLectura = mejoresLecturasOrdenadas.map((item, index) => ({
  lectura: `Lectura ${index + 1}`,
  puntaje: item.puntaje,
  fecha: item.fecha.toISOString().split("T")[0], // opcional si quieres usar tooltip con fecha
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
    promedioPorCategoria: promedioPorCategoria,
    evolucionLectura: evolucionLectura,
  });
}
