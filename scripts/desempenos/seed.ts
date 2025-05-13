import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todos las desempeños para evitar duplicados
  await db.delete(schema.desempeno);

  // 2. Inserta nueva lectura
  await db.insert(schema.desempeno).values([
    {
      nombre: "Identificación de información relevante y complementaria",
      descripcion:
        "Los estudiantes identifican información explícita, relevante y complementaria en textos de estructura compleja, seleccionando datos específicos y algunos detalles.",
    },
    {
      nombre: "Explicación de tema, subtemas y propósito comunicativo",
      descripcion:
        "Los estudiantes explican el tema, los subtemas y el propósito comunicativo de un texto, distinguiendo información relevante y complementaria.",
    },
    {
      nombre: "Deducción de relaciones lógicas",
      descripcion:
        "Los estudiantes deducen relaciones causa-efecto, semejanza-diferencia y otras a partir de la información presentada en el texto.",
    },
    {
      nombre: "Interpretación de intenciones y puntos de vista del autor",
      descripcion:
        "Los estudiantes explican la intención del autor, diferentes puntos de vista y estereotipos.",
    },
    {
      nombre: "Opinión crítica sobre el contenido y la organización textual",
      descripcion:
        "Opina sobre el contenido, la organización textual, el sentido de diversos recursos textuales y la intención del autor.",
    },
    {
      nombre: "Justificación de preferencias",
      descripcion:
        "Justifica su preferencia por determinados textos, expresando las razones que sustentan su elección.",
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
