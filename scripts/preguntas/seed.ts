import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borrar preguntas y alternativas para evitar duplicados
  await db.delete(schema.alternativa);
  await db.delete(schema.pregunta);

  const lecturaId = 1;

  // === Pregunta 1 ===
  const [preguntaSeleccion] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 1,
      enunciado: "¿Qué es un agujero negro?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas = [
    "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar.",
    "Una estrella que brilla intensamente en el cielo nocturno.",
    "Una galaxia con una gran cantidad de estrellas.",
    "Un tipo de planeta en el borde de un sistema solar.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas.map((texto) => ({
      preguntaId: preguntaSeleccion.id,
      texto,
      esCorrecta:
        texto ===
        "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar.",
    }))
  );

  // === Pregunta 2 ===
  await db.insert(schema.pregunta).values({
    lecturaId,
    desempenoId: 6,
    enunciado:
      "¿Consideras que el autor logró organizar bien las ideas para explicar un tema tan complejo? ¿Por qué?",
    tipo: "completar",
    tipoCorreccion: "subjetivo",
    nivelDificultad: "Difícil",
  });

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});