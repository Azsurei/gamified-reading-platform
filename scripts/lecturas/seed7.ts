import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  const [lecturaSeleccionada] = await db
    .insert(schema.lectura)
    .values({
      titulo: "La rebelión de Túpac Amaru: ¿un héroe incomprendido?",
      descripcion:
        "Este texto reflexiona sobre el papel histórico de Túpac Amaru II, destacando su lucha contra la opresión colonial y su impacto en la construcción de la identidad peruana.",
      imagen: "/tupac.svg",
      categoria: "Historia",
      tipoTexto: "argumentativo",
      contenido: `Cuando se habla de las grandes figuras de la historia del Perú, pocos nombres despiertan tanto debate como el de Túpac Amaru II. Para algunos, fue un rebelde que desafió la autoridad colonial sin medir las consecuencias. Para otros, fue un héroe que encendió la chispa de la libertad décadas antes de la independencia. ¿Pero quién fue realmente este personaje y por qué su legado sigue siendo tan importante?

Túpac Amaru II, cuyo verdadero nombre era José Gabriel Condorcanqui, lideró una gran rebelión indígena contra el dominio español en 1780. Lo hizo en un contexto de abusos: el sistema de mita, que obligaba a los indígenas a trabajar en condiciones inhumanas; los altos tributos, que empobrecían a las comunidades; y la discriminación racial, que marginaba a los pueblos originarios. Su levantamiento no fue un acto impulsivo, sino una respuesta a siglos de injusticia.

Algunos historiadores afirman que su lucha fue fallida, pues fue capturado, torturado y ejecutado públicamente. Sin embargo, este argumento pasa por alto algo fundamental: su rebelión marcó un punto de quiebre. Por primera vez, se organizó un movimiento masivo que unió a indígenas, mestizos e incluso algunos criollos contra el sistema colonial. Su mensaje de justicia y dignidad encendió una conciencia que luego sería clave en los movimientos independentistas.

Criticar a Túpac Amaru por no lograr la independencia inmediata es ignorar el poder simbólico de su acción. Como sucede con otros líderes históricos, su valor no está solo en lo que logró en vida, sino en lo que inspiró después. Su figura fue recuperada en el siglo XIX por los libertadores, en el siglo XX por movimientos sociales, y hoy sigue siendo un símbolo de resistencia y orgullo cultural.

Más que un simple rebelde, Túpac Amaru II fue un líder visionario que, en su tiempo, alzó la voz por los más olvidados. Su legado trasciende su derrota, porque dejó una huella profunda en la historia del Perú. Nos invita a reflexionar sobre la justicia, la identidad y el valor de luchar por un mundo más equitativo. Tal vez no venció en su época, pero su voz sigue viva en la memoria colectiva del país.`,
    })
    .returning({ id: schema.lectura.id });

  const lecturaId = lecturaSeleccionada.id;
  // === Pregunta 1 ===
  const [preguntaSeleccion1] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 1,
      enunciado:
        "¿Cuál de las siguientes frases extrae información explícita y relevante del texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas1 = [
    "La rebelión de Túpac Amaru II, aunque un levantamiento significativo, es presentada en el texto como un acto puramente reactivo y sin un plan estratégico a largo plazo.",
    "José Gabriel Condorcanqui, conocido como Túpac Amaru II, encabezó en 1780 una extensa insurrección indígena que fue una respuesta directa a la opresión colonial española, incluyendo la mita y los excesivos tributos.",
    "La derrota y ejecución de Túpac Amaru II significaron el fin inmediato de toda resistencia indígena organizada en Perú, retrasando la independencia por casi medio siglo.",
    "El texto sugiere que Túpac Amaru II logró unificar a todas las facciones de la sociedad colonial, incluyendo a los criollos, en un movimiento homogéneo que buscaba una independencia total.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "José Gabriel Condorcanqui, conocido como Túpac Amaru II, encabezó en 1780 una extensa insurrección indígena que fue una respuesta directa a la opresión colonial española, incluyendo la mita y los excesivos tributos.",
    }))
  );

  // === Pregunta 2 ===
  const [preguntaSeleccion2] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 1,
      enunciado:
        "¿Cuál de estas opciones aporta información complementaria que amplía lo expuesto en el texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas2 = [
    "La figura de Túpac Amaru II ha sido objeto de diversas interpretaciones ideológicas a lo largo de los siglos, siendo utilizada por diferentes movimientos políticos para legitimar sus propias causas.",
    "Las Leyes Nuevas de 1542, implementadas por la Corona Española, ya intentaron limitar los abusos de la encomienda, lo que demuestra la larga historia de resistencia indígena al sistema colonial.",
    "La rebelión de Túpac Amaru II coincidió con otras insurrecciones en la región andina, como la de Túpac Katari en el Alto Perú, lo que sugiere una efervescencia continental de descontento indígena.",
    "La historiografía revisionista reciente cuestiona si Túpac Amaru II realmente buscaba una independencia total o si su objetivo inicial era una reforma dentro del marco de la Corona española.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "La figura de Túpac Amaru II ha sido objeto de diversas interpretaciones ideológicas a lo largo de los siglos, siendo utilizada por diferentes movimientos políticos para legitimar sus propias causas.",
    }))
  );

  // === Pregunta 3 ===
  const [preguntaSeleccion3] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 2,
      enunciado:
        "¿Cuál es el tema principal que se desarrolla a lo largo del texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas3 = [
    "La descripción detallada de los abusos del sistema colonial español y su impacto en las comunidades indígenas del Perú.",
    "La biografía completa de José Gabriel Condorcanqui y los pormenores de su vida antes y durante la rebelión de 1780.",
    "La argumentación sobre el legado trascendente de Túpac Amaru II como un líder visionario y símbolo de resistencia, más allá de su derrota militar.",
    "El análisis de las causas económicas y sociales que llevaron a la caída del imperio español en América Latina durante el siglo XVIII.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La argumentación sobre el legado trascendente de Túpac Amaru II como un líder visionario y símbolo de resistencia, más allá de su derrota militar.",
    }))
  );

  // === Pregunta 4 ===
  const [preguntaSeleccion4] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 2,
      enunciado:
        "¿Qué subtema secundario se menciona en el texto como un desarrollo del tema principal?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas4 = [
    "La descripción detallada del sistema de la mita y las condiciones laborales en las minas coloniales.",
    "La evolución del simbolismo de Túpac Amaru II y su recuperación por diferentes movimientos sociales a lo largo de la historia peruana.",
    "Las estrategias militares específicas empleadas por los rebeldes indígenas y las fuerzas coloniales españolas durante el levantamiento.",
    "El análisis de las diferencias culturales entre indígenas, mestizos y criollos que dificultaron la unificación total del movimiento rebelde.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La evolución del simbolismo de Túpac Amaru II y su recuperación por diferentes movimientos sociales a lo largo de la historia peruana.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación de causa y efecto se establece entre las injusticias coloniales y el inicio de la rebelión liderada por Túpac Amaru II?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Las injusticias del sistema colonial, como la mita y los altos tributos, actuaron como detonantes directos que provocaron el levantamiento masivo de Túpac Amaru II como una respuesta a siglos de opresión.",
    "La rebelión de Túpac Amaru II fue una causa del aumento de las injusticias coloniales, ya que España intensificó los abusos como represalia a los movimientos independentistas.",
    "El texto sugiere que no hay una relación directa de causa y efecto, sino que la rebelión fue un evento aislado que coincidió con un periodo de injusticias coloniales generalizadas.",
    "La principal causa de la rebelión no fueron las injusticias, sino la ambición personal de Túpac Amaru II por obtener poder político y riqueza, aprovechando el descontento existente.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Las injusticias del sistema colonial, como la mita y los altos tributos, actuaron como detonantes directos que provocaron el levantamiento masivo de Túpac Amaru II como una respuesta a siglos de opresión.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿En qué se diferencia la imagen tradicional de Túpac Amaru II como rebelde violento frente a la visión que propone el texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "El texto lo presenta como un líder estratégico que priorizaba el diálogo sobre la confrontación armada, a diferencia de la imagen de un rebelde impulsivo y violento.",
    "La visión del texto lo muestra como un héroe incomprendido que, más allá de la derrota, fue un líder visionario motivado por la justicia, contrastando con la imagen de un mero rebelde que desafió sin medir consecuencias.",
    "El texto diferencia su figura al destacar que su rebelión fue la primera en lograr la independencia inmediata, a diferencia de la imagen de un movimiento fracasado y sin impacto real.",
    "Se diferencia al enfatizar que su rebelión fue exclusivamente indígena y se oponía a la participación de mestizos y criollos, en contraste con una visión que lo muestra como un unificador de razas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "La visión del texto lo muestra como un héroe incomprendido que, más allá de la derrota, fue un líder visionario motivado por la justicia, contrastando con la imagen de un mero rebelde que desafió sin medir consecuencias.",
    }))
  );

  // === Pregunta 7 ===
  const [preguntaSeleccion7] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 4,
      enunciado:
        "¿Cuál de estas afirmaciones refleja mejor un punto de vista presentado en el texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas7 = [
    "El texto argumenta que la rebelión de Túpac Amaru II, a pesar de su fracaso en lograr la independencia inmediata, fue un punto de inflexión decisivo que simbolizó el despertar de la conciencia indígena y mestiza.",
    "La lectura enfatiza que el principal legado de Túpac Amaru II es su rol como estratega militar, cuya táctica, aunque arriesgada, sentó las bases para futuras victorias criollas en la independencia.",
    "Según el texto, Túpac Amaru II es una figura controvertida, y su rebelión, aunque noble en sus intenciones, finalmente desestabilizó la región y retrasó el proceso de unificación en el virreinato.",
    "El punto de vista principal sugiere que la importancia de Túpac Amaru II radica en su liderazgo efectivo para erradicar completamente la mita y los abusos coloniales durante su levantamiento.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto argumenta que la rebelión de Túpac Amaru II, a pesar de su fracaso en lograr la independencia inmediata, fue un punto de inflexión decisivo que simbolizó el despertar de la conciencia indígena y mestiza.",
    }))
  );
  // === Pregunta 8 ===
  await db.insert(schema.pregunta).values({
    lecturaId,
    desempenoId: 4,
    enunciado:
      "¿Cuál crees que fue la intención del autor al escribir este texto?",
    tipo: "completar",
    tipoCorreccion: "objetivo",
    nivelDificultad: "Difícil",
  });

  // === Pregunta 9 ===
  await db.insert(schema.pregunta).values({
    lecturaId,
    desempenoId: 5,
    enunciado:
      "¿Cómo ayudan las palabras, el orden de las ideas y la forma en que está escrito el texto a transmitir su mensaje?",
    tipo: "completar",
    tipoCorreccion: "subjetivo",
    nivelDificultad: "Difícil",
  });

  // === Pregunta 10 ===
  await db.insert(schema.pregunta).values({
    lecturaId,
    desempenoId: 6,
    enunciado: "¿Recomendarías este texto a otra persona? ¿Por qué?",
    tipo: "completar",
    tipoCorreccion: "subjetivo",
    nivelDificultad: "Difícil",
  });

  // ===Comodines de lectura===

  await db.insert(schema.comodinLectura).values([
    {
      lecturaId: lecturaId,
      tipoComodinId: 1, // Asumimos que 1 es resumen
      resumenTexto: `La lectura explora la figura de Túpac Amaru II (José Gabriel Condorcanqui), líder de una gran rebelión indígena en 1780 contra el dominio español. El texto argumenta que su levantamiento no fue impulsivo, sino una respuesta a siglos de injusticia colonial, como la mita, los altos tributos y la discriminación. A pesar de su derrota y ejecución, se enfatiza que su rebelión marcó un punto de quiebre, uniendo a indígenas, mestizos e incluso algunos criollos, y encendió una conciencia clave para futuros movimientos independentistas. Se concluye que el valor de Túpac Amaru II no reside solo en lo que logró en vida, sino en su poder simbólico y legado duradero como líder visionario y símbolo de resistencia y orgullo cultural en la memoria colectiva del Perú.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `Túpac Amaru II fue un líder visionario y héroe incomprendido cuya rebelión contra la injusticia colonial, aunque militarmente derrotada, fue un punto de quiebre histórico que sentó las bases para la conciencia independentista y se convirtió en un símbolo perdurable de resistencia y orgullo cultural en Perú.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Túpac Amaru II",
        "rebelión indígena",
        "colonialismo español",
        "injusticia",
        "legado",
        "símbolo de resistencia",
        "héroe incomprendido",
        "independencia",
        "poder simbólico",
        "conciencia",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
