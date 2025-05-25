import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta si es necesario

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  // 1. Borra todos los comodines de lectura para evitar duplicados
  await db.delete(schema.comodinLectura);

  // 2. Inserta nuevos comodines para la lectura con id = 2
  await db.insert(schema.comodinLectura).values([
    {
      lecturaId: 2,
      tipoComodinId: 1, // Asumimos que 1 es resumen
      resumenTexto: `Marte, un planeta que ha intrigado a la humanidad durante siglos, presenta indicios de haber albergado vida microbiana en el pasado debido a evidencias geológicas como cauces de ríos y minerales asociados al agua. El interés actual se centra tanto en estudios científicos como en posibles misiones humanas, lo que genera debates éticos y científicos sobre colonización y sostenibilidad.`,
    },
    {
      lecturaId: 2,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `Marte es un planeta que podría haber tenido vida en el pasado y representa una posibilidad para la exploración y futura colonización humana, aunque esto plantea desafíos científicos, tecnológicos y éticos.`,
    },
    {
      lecturaId: 2,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: ["Marte", "vida", "agua", "exploración", "NASA", "colonización", "ciencia", "humanidad"],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
