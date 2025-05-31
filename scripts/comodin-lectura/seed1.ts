import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta si es necesario

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  await db.insert(schema.comodinLectura).values([
    {
      lecturaId: 3,
      tipoComodinId: 1, // Asumimos que 1 es resumen
      resumenTexto: `El mito de Ariadna narra cómo el rey Minos de Creta, tras ofender a Poseidón, engendró al monstruoso Minotauro, al que encerró en un laberinto construido por Dédalo. Como castigo a Atenas, Minos exigía un tributo anual de jóvenes para alimentar a la bestia. El príncipe ateniense Teseo se ofreció como voluntario para matar al Minotauro y, con la ayuda de Ariadna, la hija de Minos que se enamoró de él, logró salir del laberinto gracias a un hilo mágico que le proporcionó ella. Sin embargo, en su huida, Teseo abandonó a Ariadna en la isla de Naxos, donde fue encontrada y desposada por el dios Dionisio, quien la elevó a la inmortalidad. El mito perdura como símbolo de la ayuda inesperada, la solución a problemas complejos (el hilo), los laberintos de la vida y la dualidad del amor y la traición.`,
    },
    {
      lecturaId: 3,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `La narración del mito de Ariadna, destacando su papel crucial al proporcionar el hilo que permitió a Teseo vencer al Minotauro y escapar del laberinto, así como las posteriores consecuencias de su ayuda y su destino final, explorando temas de ingenio, amor, traición y la perdurabilidad de sus símbolos.`,
    },
    {
      lecturaId: 3,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Minotauro",
        "laberinto",
        "hilo de Ariadna",
        "Teseo",
        "Minos",
        "Creta",
        "Ariadna",
        "ayuda",
        "abandono",
        "Dionisio",
        "mito",
        "símbolo",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
