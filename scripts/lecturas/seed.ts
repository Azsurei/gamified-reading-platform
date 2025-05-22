import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borra todas las lecturas para evitar duplicados
  await db.delete(schema.lectura);

  // 2. Inserta nueva lectura
  await db.insert(schema.lectura).values({
    titulo: "La vida en Marte: ¿una posibilidad futura?",
    descripcion: "Texto sobre los descubrimientos científicos en Marte y el debate sobre su colonización.",
    imagen: "/marte.svg",
    categoria: "Ciencia",
    tipoTexto: "expositivo",
    contenido: `Durante siglos, la humanidad ha mirado al cielo con la esperanza de encontrar vida más allá de la Tierra. Uno de los planetas que más ha despertado curiosidad es Marte. Este planeta rojo, nuestro vecino en el sistema solar, ha sido objeto de múltiples estudios científicos debido a sus condiciones geológicas y climáticas que podrían, en algún momento, haber permitido la vida.

Los científicos han descubierto rastros de antiguos cauces de ríos, así como minerales que solo se forman en presencia de agua. Aunque actualmente Marte es un planeta frío y seco, estos hallazgos sugieren que hace millones de años pudo haber tenido un ambiente más cálido y húmedo. La presencia pasada de agua líquida es uno de los indicios más importantes para pensar que tal vez la vida microbiana existió allí.

Además del pasado, el interés también está puesto en el futuro. Distintas agencias espaciales, como la NASA y la ESA, han desarrollado misiones para explorar el suelo marciano y estudiar su atmósfera. Incluso existen proyectos que investigan la posibilidad de enviar humanos a Marte en las próximas décadas. Esto implicaría grandes desafíos tecnológicos y éticos, como asegurar la supervivencia humana en un ambiente hostil y prevenir la contaminación del planeta.

También se discuten otras posibilidades: mientras algunos expertos consideran que establecer una colonia en Marte ayudaría a garantizar el futuro de la humanidad en caso de una catástrofe en la Tierra, otros opinan que los recursos deberían centrarse en resolver los problemas actuales de nuestro planeta. Estas posiciones reflejan distintas formas de pensar sobre el rol de la ciencia, la exploración y la responsabilidad ambiental.

La conversación sobre Marte continúa evolucionando a medida que se obtienen nuevos datos y se desarrollan tecnologías más avanzadas. Por ahora, Marte sigue siendo un territorio de misterio y posibilidades, donde la ciencia intenta responder preguntas fundamentales sobre la vida, el universo y nuestro lugar en él.`,
  });
  /* await db
    .update(schema.lectura)
    .set({
      contenido: `Un agujero negro es un objeto astronómico con una gravedad tan intensa que nada puede escapar de su interior, ni siquiera la luz. Se forma cuando una estrella muy masiva agota su energía y colapsa sobre sí misma, concentrando toda su masa en un punto extremadamente denso llamado singularidad. Alrededor de este punto se encuentra una región invisible, lo que conocemos como agujero negro. No podemos observarlo directamente porque ni la luz puede salir de él, pero los científicos pueden inferir su presencia observando el comportamiento de la materia y la luz en su entorno, como estrellas que giran de forma extraña o gases que se calientan al acercarse.

Uno de los conceptos más fascinantes y desafiantes al estudiar los agujeros negros es el llamado horizonte de eventos. Esta es la “frontera” que marca el punto sin retorno: una vez que algo lo cruza, ya no hay manera de volver atrás. Se le llama así porque más allá de ese límite ya no es posible recibir información o eventos desde dentro del agujero negro. No se trata de una barrera física, sino de un límite matemático definido por la velocidad de escape: para poder salir, un objeto tendría que moverse más rápido que la luz, lo cual, según la teoría de la relatividad de Einstein, es imposible. Por eso, el horizonte de eventos es una línea invisible, pero crítica, en la estructura del universo.

El estudio del horizonte de eventos ha llevado a grandes debates entre los científicos, especialmente cuando se mezcla con la mecánica cuántica. Uno de los más conocidos es la llamada paradoja de la información: si todo lo que entra en un agujero negro desaparece, ¿qué sucede con la información que contenía? ¿Se destruye para siempre? Esto desafía las leyes de la física, que afirman que la información no puede perderse. Además, los físicos han descubierto que cuando la materia se acerca al horizonte de eventos, experimenta fenómenos extremos: el tiempo se desacelera desde el punto de vista de un observador externo, y la materia puede alcanzar temperaturas muy altas. Todo esto hace que el horizonte de eventos no solo sea una frontera física, sino también una frontera del conocimiento humano, donde las leyes conocidas de la ciencia comienzan a encontrarse con sus propios límites.`,
    })
    .where(eq(schema.lectura.id, 1)); */
  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
