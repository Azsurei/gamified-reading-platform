import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todos las desempeños para evitar duplicados
  await db.delete(schema.tipoComodin);

  // 2. Inserta nueva lectura
  await db.insert(schema.tipoComodin).values([
    {
      nombre: "Resaltar estructuras del texto",
      descripcion:
        "Resalta las secciones de introducción, desarrollo y conclusión.",
      costoXp: 30,
      imagen: "/estructura.svg",
    },
    {
      nombre: "Mostrar idea principal",
      descripcion: "Destacar la idea principal del texto.",
      costoXp: 20,
      imagen: "/idea.svg",
    },
    {
      nombre: "Mostrar palabras claves destacadas",
      descripcion: "Marca palabras clave importantes en el texto.",
      costoXp: 20,
      imagen: "/estrella.svg",
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
