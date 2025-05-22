import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todos las desafios para evitar duplicados
  await db.delete(schema.desafio);

  // 2. Inserta nuevas lecturas
  await db.insert(schema.desafio).values([
  // 1. Lecturas con puntaje perfecto
  {
    descripcion: "Completa 5 lecturas con puntaje perfecto.",
    tipoObjetivo: "lecturas_perfectas",
    meta: 5,
    categoria: null,
    desempenoId: null,
    imagenInsignia: "/score-badge.svg",
  },

  // 2. Desafíos por categoría
  {
    descripcion: "Lee 3 textos de la categoría Historia.",
    tipoObjetivo: "categoria",
    meta: 3,
    categoria: "Historia",
    desempenoId: null,
    imagenInsignia: "/history-badge.svg",
  },
  {
    descripcion: "Lee 3 textos de la categoría Ciencia.",
    tipoObjetivo: "categoria",
    meta: 3,
    categoria: "Ciencia",
    desempenoId: null,
    imagenInsignia: "/science-badge.svg",
  },
  {
    descripcion: "Lee 3 textos de la categoría Literatura clásica.",
    tipoObjetivo: "categoria",
    meta: 3,
    categoria: "Literatura clásica",
    desempenoId: null,
    imagenInsignia: "/literature-badge.svg",
  },
  {
    descripcion: "Lee 3 textos de la categoría Geografía.",
    tipoObjetivo: "categoria",
    meta: 3,
    categoria: "Entretenimiento",
    desempenoId: null,
    imagenInsignia: "/entertainment-badge.svg",
  },
  {
    descripcion: "Lee 3 textos de la categoría Arte.",
    tipoObjetivo: "categoria",
    meta: 3,
    categoria: "Arte",
    desempenoId: null,
    imagenInsignia: "/art-badge.svg",
  },

  // 3. Desafíos por desempeño
  {
    descripcion: "Responde correctamente preguntas de 'Identificación de información relevante y complementaria' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 1,
    imagenInsignia: "/primer-desempeno.svg",
  },
  {
    descripcion: "Responde correctamente preguntas de 'Explicación de tema, subtemas y propósito comunicativo' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 2,
    imagenInsignia: "/segundo-desempeno.svg",
  },
  {
    descripcion: "Responde correctamente preguntas de 'Deducción de relaciones lógicas' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 3,
    imagenInsignia: "/tercer-desempeno.svg",
  },
  {
    descripcion: "Responde correctamente preguntas de 'Interpretación de intenciones y puntos de vista del autor' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 4,
    imagenInsignia: "/cuarto-desempeno.svg",
  },
  {
    descripcion: "Responde correctamente preguntas de 'Opinión crítica sobre el contenido y la organización textual' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 5,
    imagenInsignia: "/quinto-desempeno.svg",
  },
  {
    descripcion: "Responde correctamente preguntas de 'Justificación de preferencias' en 3 lecturas.",
    tipoObjetivo: "desempeno_perfecto",
    meta: 3,
    categoria: null,
    desempenoId: 6,
    imagenInsignia: "/sexto-desempeno.svg",
  },
]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});


