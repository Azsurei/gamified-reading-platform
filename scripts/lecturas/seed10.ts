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
      titulo: "¿Somos solo química? Una mirada crítica desde la neurociencia",
      descripcion:
        "Este texto analiza los límites del conocimiento neurocientífico frente al misterio de la conciencia humana.",
      imagen: "/neurociencia.svg",
      categoria: "Ciencia",
      tipoTexto: "argumentativo",
      contenido: `La ciencia moderna ha logrado grandes avances en la comprensión del cerebro humano. Gracias a la neurociencia, hoy sabemos que nuestras emociones, recuerdos y decisiones se originan en complejos procesos químicos y eléctricos dentro de nuestro sistema nervioso. Sin embargo, esta explicación, aunque poderosa, ha generado un intenso debate: ¿puede la actividad cerebral explicar completamente lo que somos?

Los neurocientíficos sostienen que todo lo que experimentamos es el resultado de funciones cerebrales. Por ejemplo, cuando sentimos alegría, se liberan neurotransmisores como la dopamina; cuando recordamos, se activan ciertas áreas neuronales. Bajo esta perspectiva, nuestras ideas, valores y emociones serían solo el producto de conexiones sinápticas. Si eso es cierto, entonces todo lo que nos hace humanos —desde el amor hasta la creatividad— estaría determinado por procesos químicos.

Pero aquí surge una objeción fundamental: la conciencia. Aunque la neurociencia puede describir lo que ocurre en el cerebro cuando una persona sufre o ama, aún no puede explicar cómo se origina la experiencia consciente. Sentir dolor no es solo una reacción biológica: es una vivencia. Esa brecha entre lo físico y lo subjetivo es lo que algunos científicos llaman el “problema difícil de la conciencia”. Reducir la mente a reacciones neuronales ignora que sentir no es lo mismo que funcionar.

Además, este enfoque plantea una cuestión ética: si todo comportamiento humano está determinado por procesos cerebrales, ¿qué lugar queda para la responsabilidad personal? Si una persona comete un error, ¿fue una decisión libre o una reacción bioquímica inevitable? Negar el libre albedrío puede llevar a justificar actos humanos como consecuencias de un sistema que no controlamos.

Por tanto, aunque la neurociencia ha iluminado muchos aspectos de nuestra mente, no basta para responder completamente qué significa ser humano. Entender el cerebro es crucial, pero no deberíamos olvidar que la conciencia, la identidad y la libertad siguen siendo un misterio tan profundo como fascinante. La ciencia avanza, sí, pero aún no ha dicho la última palabra.`,
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
    "El texto afirma que la neurociencia ha dilucidado completamente el enigma de la conciencia, proporcionando una explicación exhaustiva de cómo se genera la experiencia subjetiva del amor o el sufrimiento.",
    "El autor asegura que la neurociencia desestima categóricamente el concepto de libre albedrío, argumentando que cada acción humana es una consecuencia ineludible de la actividad bioquímica cerebral.",
    "Se expone en el texto que, gracias a la neurociencia, se comprende que las emociones, los recuerdos y las decisiones humanas son el resultado de procesos electroquímicos complejos en el sistema nervioso.",
    "La lectura detalla una controversia ética central sobre la manipulación neuronal en investigaciones científicas, destacando la necesidad urgente de establecer regulaciones estrictas para la neurociencia moderna.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Se expone en el texto que, gracias a la neurociencia, se comprende que las emociones, los recuerdos y las decisiones humanas son el resultado de procesos electroquímicos complejos en el sistema nervioso.",
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
    "Los avances en neuroimagen y la inteligencia artificial están permitiendo a la neurociencia mapear el cerebro con una precisión sin precedentes, lo que augura soluciones inminentes para el 'problema difícil de la conciencia'.",
    "Desde esta perspectiva, disciplinas como la filosofía de la mente, la psicología profunda y la ética cobran una relevancia ineludible, ofreciendo marcos conceptuales cruciales para abordar las dimensiones de la conciencia, la identidad y la libertad que la biología no abarca por completo.",
    "La evolución del conocimiento sobre el cerebro sugiere que, en el futuro cercano, las decisiones humanas podrán ser completamente predecidas a partir de patrones neuronales, eliminando la ambigüedad sobre el libre albedrío y la responsabilidad.",
    "Las neurotecnologías emergentes, como las interfaces cerebro-computadora, prometen transformar radicalmente la experiencia humana, abriendo nuevas fronteras para el tratamiento de enfermedades mentales y la mejora cognitiva.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Desde esta perspectiva, disciplinas como la filosofía de la mente, la psicología profunda y la ética cobran una relevancia ineludible, ofreciendo marcos conceptuales cruciales para abordar las dimensiones de la conciencia, la identidad y la libertad que la biología no abarca por completo.",
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
    "Los avances recientes de la neurociencia en el mapeo cerebral y la identificación de neurotransmisores asociados a emociones y recuerdos.",
    "Un debate sobre la capacidad de la neurociencia para explicar completamente la complejidad de la existencia humana, la conciencia y el libre albedrío.",
    "La controversia ética sobre la experimentación en neurociencia y la manipulación de procesos cerebrales para influir en el comportamiento humano.",
    "La explicación de cómo las enfermedades mentales y los trastornos del comportamiento se originan exclusivamente en desequilibrios químicos del cerebro, según la neurociencia moderna.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "Un debate sobre la capacidad de la neurociencia para explicar completamente la complejidad de la existencia humana, la conciencia y el libre albedrío.",
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
    "El 'problema difícil de la conciencia', que aborda la incapacidad actual de la neurociencia para explicar cómo la actividad cerebral da origen a la experiencia subjetiva de ser y sentir.",
    "La descripción detallada de cómo la dopamina y otros neurotransmisores influyen directamente en la experimentación de emociones como la alegría.",
    "La propuesta de nuevas técnicas de neuroimagen que permiten una visualización más precisa de las conexiones sinápticas y su rol en la formación de los recuerdos.",
    "La discusión sobre la influencia de factores ambientales y sociales en la modulación de las respuestas bioquímicas cerebrales, más allá de la predisposición genética.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "El 'problema difícil de la conciencia', que aborda la incapacidad actual de la neurociencia para explicar cómo la actividad cerebral da origen a la experiencia subjetiva de ser y sentir.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Al problematizar la conciencia como una "vivencia" y la responsabilidad personal en el contexto del determinismo cerebral, ¿qué se puede inferir sobre la postura implícita del autor respecto a la idea de que "somos solo química"?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Se deduce que, para el autor, la afirmación 'somos solo química' es una verdad ineludible, y las objeciones sobre la conciencia o el libre albedrío son meros dilemas filosóficos sin impacto real en la comprensión científica.",
    "El texto implica que la neurociencia, al explicar el comportamiento humano puramente desde la química, busca desacreditar la existencia de la subjetividad y la moralidad en la experiencia humana.",
    "El autor sugiere que la noción de que 'somos solo química' es una simplificación excesiva que ignora dimensiones fundamentales de la experiencia humana, las cuales no pueden ser reducidas únicamente a procesos cerebrales.",
    "La postura del autor es que la incapacidad de la neurociencia para explicar completamente la conciencia valida la existencia de una mente separada del cerebro, que opera independientemente de la química neuronal.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "El autor sugiere que la noción de que 'somos solo química' es una simplificación excesiva que ignora dimensiones fundamentales de la experiencia humana, las cuales no pueden ser reducidas únicamente a procesos cerebrales.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Dada la manera en que el texto cierra, afirmando que la conciencia, la identidad y la libertad "siguen siendo un misterio tan profundo como fascinante" y que la ciencia "aún no ha dicho la última palabra", ¿qué se puede inferir sobre la visión del autor respecto al futuro de la comprensión de la humanidad?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Se deduce que el autor prevé un futuro en el que la neurociencia, con avances tecnológicos futuros, finalmente resolverá todos los misterios de la conciencia y el libre albedrío, ofreciendo una explicación completa del ser humano.",
    "Se infiere que el autor se muestra escéptico ante cualquier posibilidad de que la ciencia, en general, pueda alguna vez descifrar aspectos no físicos de la existencia humana, limitando su alcance solo a lo tangible.",
    "La visión del autor sugiere que los misterios de la conciencia y la identidad son inherentes a la condición humana y, por lo tanto, la ciencia no debe intentar siquiera abordarlos, ya que pertenecen exclusivamente al ámbito de la filosofía o la fe.",
    "El texto implica que la comprensión plena de lo que significa ser humano requerirá probablemente la integración de perspectivas de otras disciplinas, más allá de la explicación puramente biológica, para abordar las dimensiones aún inexplicadas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "El texto implica que la comprensión plena de lo que significa ser humano requerirá probablemente la integración de perspectivas de otras disciplinas, más allá de la explicación puramente biológica, para abordar las dimensiones aún inexplicadas.",
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
    "El texto sostiene que la neurociencia, con sus recientes descubrimientos, ha logrado una comprensión exhaustiva de la totalidad de la experiencia humana, incluyendo la conciencia y la responsabilidad personal.",
    "La lectura concluye que las limitaciones actuales de la neurociencia en la explicación de la conciencia y el libre albedrío invalidan su utilidad para cualquier comprensión significativa del comportamiento humano.",
    "Se argumenta en el texto que, si bien la neurociencia ofrece explicaciones poderosas sobre el funcionamiento cerebral, su enfoque resulta insuficiente para abordar completamente la complejidad de lo que significa ser humano, dejando misterios fundamentales sin resolver.",
    "El punto de vista central del autor es que la ciencia debe evitar adentrarse en cuestiones filosóficas como la conciencia o el libre albedrío, ya que estas pertenecen exclusivamente al ámbito de la especulación metafísica y la fe personal.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "Se argumenta en el texto que, si bien la neurociencia ofrece explicaciones poderosas sobre el funcionamiento cerebral, su enfoque resulta insuficiente para abordar completamente la complejidad de lo que significa ser humano, dejando misterios fundamentales sin resolver.",
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
      resumenTexto: `Si bien la neurociencia ha avanzado significativamente en la comprensión del cerebro humano y sus procesos químicos y eléctricos detrás de emociones y decisiones, no ofrece una explicación completa de lo que significa ser humano. El autor señala que aspectos como la conciencia (la experiencia subjetiva) y el libre albedrío (y la responsabilidad personal) siguen siendo misterios profundos que la visión puramente biológica no puede resolver. En última instancia, el texto concluye que, aunque la ciencia avanza, no ha dicho la última palabra sobre la complejidad de la existencia humana.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `A pesar de los importantes avances de la neurociencia en la comprensión del cerebro, esta disciplina es insuficiente para explicar por completo la complejidad de la existencia humana, dejando sin resolver misterios fundamentales como la conciencia y el libre albedrío.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "neurociencia",
        "cerebro",
        "conciencia",
        "libre albedrío",
        "responsabilidad personal",
        "determinismo",
        "reduccionismo",
        "experiencia humana",
        "misterio",
        "subjetividad",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
