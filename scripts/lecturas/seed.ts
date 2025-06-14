import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
/*   // 1. Borra todas las lecturas para evitar duplicados
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
  }); */
  await db
    .update(schema.lectura)
    .set({
      contenido: `El cambio climático ya no es una predicción futura: es una realidad observable. Aumentos en la temperatura global, derretimiento de glaciares, olas de calor más frecuentes y fenómenos meteorológicos extremos son señales claras de un planeta que está cambiando. Aunque algunos todavía dudan de su gravedad o sus causas, la ciencia ha demostrado con evidencia contundente que este fenómeno está relacionado directamente con la actividad humana, especialmente con la emisión de gases de efecto invernadero.

Desde el siglo XIX, la quema de combustibles fósiles como el petróleo, el gas y el carbón ha liberado grandes cantidades de dióxido de carbono (CO₂) y otros gases que atrapan el calor en la atmósfera. Este efecto, conocido como “efecto invernadero”, es natural y necesario para la vida, pero en exceso está provocando un calentamiento acelerado. Según la NASA y el Panel Intergubernamental sobre Cambio Climático (IPCC), si no se toman medidas urgentes, podríamos enfrentar consecuencias irreversibles: aumento del nivel del mar, desaparición de especies, migraciones masivas y crisis alimentarias.

Algunos argumentan que los cambios climáticos han ocurrido siempre en la historia de la Tierra. Esto es cierto, pero la diferencia está en la velocidad y origen del cambio actual. Nunca antes en la historia reciente se había producido un aumento tan rápido de la temperatura global, y nunca antes había estado tan claramente vinculado a nuestras decisiones económicas, tecnológicas y de consumo.

Otros sostienen que cambiar el modelo actual de producción es costoso o inviable. Sin embargo, numerosos estudios muestran que las consecuencias de no actuar serían mucho más caras a largo plazo. Invertir en energías limpias, transporte sostenible y políticas de reducción de emisiones no solo ayudaría al planeta, sino que también generaría empleo, innovación y mejor calidad de vida.

Frente a esta evidencia, el argumento científico es claro: el cambio climático es real, es causado por el ser humano, y podemos (y debemos) actuar para frenarlo. Ignorar este problema no lo hará desaparecer; enfrentarlo con información, compromiso y responsabilidad puede marcar la diferencia.`,
    })
    .where(eq(schema.lectura.id, 7));
  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
