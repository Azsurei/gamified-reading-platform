import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todos las comodines para evitar duplicados
  await db.delete(schema.tipoComodin);

  // 2. Inserta nueva comodin
  await db.insert(schema.tipoComodin).values([
    {
      nombre: "Resumir lectura",
      descripcion:
        "Condensa el texto completo en un resumen, aporta un panorama detallado y global.",
      costoXp: 50,
      imagen: "/estrella.svg",
    },
    {
      nombre: "Mostrar idea principal",
      descripcion: "Destacar la idea principal del texto.",
      costoXp: 30,
      imagen: "/idea.svg",
    },
    {
      nombre: "Mostrar palabras claves destacadas",
      descripcion: "Muestra palabras clave importantes en el texto.",
      costoXp: 15,
      imagen: "/estructura.svg",
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
