import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todas las lecturas para evitar duplicados
  await db.delete(schema.lectura);

  // 2. Inserta nueva lectura
  await db.insert(schema.lectura).values({
    titulo: "El horizonte de eventos: la frontera que marca el destino",
    descripcion: "Breve texto científico sobre el horizonte de eventos de un agujero negro.",
    imagen: "/agujero-negro.svg",
    categoria: "ciencia",
    tipoTexto: "expositivo",
    contenido: `
    Un agujero negro es un objeto astronómico con una gravedad tan intensa que nada puede escapar de su interior, ni siquiera la luz. 
Se forma cuando una estrella muy masiva agota su energía y colapsa sobre sí misma, concentrando toda su masa en un punto extremadamente denso llamado singularidad. Alrededor de este punto se encuentra una región invisible, lo que conocemos como agujero negro. No podemos observarlo directamente porque ni la luz puede salir de él, pero los científicos pueden inferir su presencia observando el comportamiento de la materia y la luz en su entorno, como estrellas que giran de forma extraña o gases que se calientan al acercarse.

Uno de los conceptos más fascinantes y desafiantes al estudiar los agujeros negros es el llamado horizonte de eventos. Esta es la “frontera” que marca el punto sin retorno: una vez que algo lo cruza, ya no hay manera de volver atrás. Se le llama así porque más allá de ese límite ya no es posible recibir información o eventos desde dentro del agujero negro. No se trata de una barrera física, sino de un límite matemático definido por la velocidad de escape: para poder salir, un objeto tendría que moverse más rápido que la luz, lo cual, según la teoría de la relatividad de Einstein, es imposible. Por eso, el horizonte de eventos es una línea invisible, pero crítica, en la estructura del universo.

El estudio del horizonte de eventos ha llevado a grandes debates entre los científicos, especialmente cuando se mezcla con la mecánica cuántica. Uno de los más conocidos es la llamada paradoja de la información: si todo lo que entra en un agujero negro desaparece, ¿qué sucede con la información que contenía? ¿Se destruye para siempre? Esto desafía las leyes de la física, que afirman que la información no puede perderse. Además, los físicos han descubierto que cuando la materia se acerca al horizonte de eventos, experimenta fenómenos extremos: el tiempo se desacelera desde el punto de vista de un observador externo, y la materia puede alcanzar temperaturas muy altas. Todo esto hace que el horizonte de eventos no solo sea una frontera física, sino también una frontera del conocimiento humano, donde las leyes conocidas de la ciencia comienzan a encontrarse con sus propios límites.
  `,
  });

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
