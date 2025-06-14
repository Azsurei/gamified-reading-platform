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
      titulo:
        "Francisco Pizarro: ¿héroe conquistador o destructor de civilizaciones?",
      descripcion:
        "Este texto ofrece una reflexión crítica sobre la figura de Francisco Pizarro, alejándose de las visiones simplistas de héroe o villano.",
      imagen: "/pizarro.svg",
      categoria: "Historia",
      tipoTexto: "argumentativo",
      contenido: `Cuando se habla de la conquista del Perú, el nombre de Francisco Pizarro aparece casi siempre acompañado de juicios negativos: traidor, ambicioso, destructor del imperio incaico. Esta visión, muy difundida en la historia escolar peruana, lo presenta como el principal responsable de una de las etapas más trágicas para los pueblos originarios. Sin embargo, algunos historiadores defienden una postura menos condenatoria: afirman que Pizarro no fue un simple villano, sino un hombre complejo, que actuó con astucia en un momento histórico sin precedentes y cuyo legado, aunque cuestionable, también dio origen a una nueva identidad cultural.

Pizarro llegó a lo que hoy es el Perú en 1532, con poco más de 180 hombres y un puñado de caballos. Frente a él, el Imperio inca estaba debilitado por una guerra civil entre Huáscar y Atahualpa, y por epidemias traídas por los europeos que diezmaron a la población. Los defensores de la figura de Pizarro sostienen que su triunfo no se debió únicamente a la violencia, sino también a su inteligencia política. Supo formar alianzas con pueblos andinos que resentían el dominio incaico, como los cañaris y los huancas, quienes vieron en él una oportunidad para liberarse del poder de Cusco.

Además, se argumenta que, aunque la conquista fue violenta, también marcó el inicio de un proceso histórico inevitable: el mestizaje. A partir de la llegada de los españoles se mezclaron lenguas, creencias, costumbres y saberes. Muchos defienden que, sin ese choque, el Perú tal como lo conocemos no existiría. Desde esta perspectiva, Pizarro no solo fue un conquistador, sino uno de los fundadores de una nación mestiza.

No se trata de justificar los abusos cometidos por los conquistadores, ni de olvidar el sufrimiento que causaron. Pero sí de entender la historia en toda su complejidad. Demonizar a Pizarro sin analizar el contexto de su tiempo es caer en simplificaciones peligrosas. En el siglo XVI, conceptos como derechos humanos o autodeterminación de los pueblos no existían. La expansión imperial era la norma, y quienes triunfaban en ella eran considerados héroes por sus contemporáneos.

Más que limitarse a juzgarlo con los ojos del presente, tal vez sea más útil comprender a Francisco Pizarro como una figura histórica compleja, cuyas acciones reflejan tanto la brutalidad de la conquista como la raíz de un proceso cultural profundo. Analizar su papel desde múltiples perspectivas no busca redimirlo ni condenarlo, sino abrir el camino para pensar críticamente nuestra historia y asumirla con responsabilidad.`,
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
    "El texto indica que, en el ámbito historiográfico peruano contemporáneo, la figura de Francisco Pizarro ha transitado de una condena unánime a un creciente reconocimiento como pieza clave en la fundación de una nueva identidad nacional.",
    "La lectura afirma que Francisco Pizarro arribó a lo que hoy es Perú en 1532 con aproximadamente 180 hombres y escasos caballos, encontrando un Imperio inca ya debilitado por conflictos internos y la propagación de enfermedades.",
    "El texto detalla que Pizarro logró un control estratégico del Imperio incaico mediante alianzas clave y una notable inteligencia política, estableciendo acuerdos fundamentales con facciones incas que buscaban su apoyo.",
    "Se menciona que la reinterpretación de Pizarro por ciertos historiadores se basa en la premisa de que la violencia ejercida durante la conquista fue un componente, si bien trágico, ineludible para el subsiguiente proceso de mestizaje cultural y la formación de Perú.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "La lectura afirma que Francisco Pizarro arribó a lo que hoy es Perú en 1532 con aproximadamente 180 hombres y escasos caballos, encontrando un Imperio inca ya debilitado por conflictos internos y la propagación de enfermedades.",
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
    "Además de las acciones de Pizarro, una comprensión más profunda de la conquista requiere analizar las intrincadas dinámicas políticas y sociales internas de los pueblos andinos, así como las motivaciones de otros grupos europeos que intervinieron en el proceso.",
    "La investigación arqueológica reciente ha revelado evidencia irrefutable que demuestra la existencia de redes comerciales preincaicas que influyeron significativamente en las rutas de expansión y las alianzas militares de los conquistadores españoles en los Andes.",
    "El estudio de la legislación indiana promulgada por la Corona española tras la conquista es crucial para entender cómo se intentó mitigar los abusos iniciales y establecer un marco jurídico para la nueva administración colonial.",
    "Una perspectiva más completa de la historia de Pizarro implicaría también la exploración detallada de su árbol genealógico y sus conexiones con otras figuras clave de la nobleza castellana, que facilitaron su acceso a recursos y poder.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Además de las acciones de Pizarro, una comprensión más profunda de la conquista requiere analizar las intrincadas dinámicas políticas y sociales internas de los pueblos andinos, así como las motivaciones de otros grupos europeos que intervinieron en el proceso.",
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
    "Los pormenores de la guerra civil incaica entre Huáscar y Atahualpa y su impacto decisivo en la caída del Imperio a manos de los conquistadores españoles.",
    "La justificación histórica de las acciones de Francisco Pizarro, presentándolo como un héroe necesario para el inicio del mestizaje cultural en el Perú colonial.",
    "Un análisis crítico y multifacético de la figura de Francisco Pizarro, trascendiendo las visiones simplistas para comprender su complejo papel en la conquista del Perú y la formación de su identidad.",
    "La descripción detallada de las estrategias militares y las alianzas políticas que Francisco Pizarro empleó para lograr la superioridad numérica sobre el ejército incaico.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "Un análisis crítico y multifacético de la figura de Francisco Pizarro, trascendiendo las visiones simplistas para comprender su complejo papel en la conquista del Perú y la formación de su identidad.",
    }))
  );

  // === P
  // regunta 4 ===
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
    "La compleja red de factores socioeconómicos que motivaron a Pizarro y a los conquistadores, incluyendo la búsqueda de oro y la expansión del sistema mercantilista europeo en el siglo XVI.",
    "La discusión sobre cómo el contexto histórico del siglo XVI, marcado por la normalización de la expansión imperial y la ausencia de conceptos modernos de derechos humanos, influye en la interpretación de las acciones de Pizarro.",
    "El rol crucial de la superioridad tecnológica y armamentística europea (armas de fuego, armaduras) como el factor determinante en la victoria de Pizarro sobre el ejército incaico, a pesar de su inferioridad numérica.",
    "El análisis de las repercusiones a largo plazo de la conquista en la estructura de poder de los pueblos andinos, más allá de la figura de Pizarro, y la resistencia cultural que perduró.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La discusión sobre cómo el contexto histórico del siglo XVI, marcado por la normalización de la expansión imperial y la ausencia de conceptos modernos de derechos humanos, influye en la interpretación de las acciones de Pizarro.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Si el texto aboga por "comprender a Francisco Pizarro como una figura histórica compleja" y no solo juzgarlo con los ojos del presente, ¿qué se puede deducir que el autor espera del lector al abordar otras figuras o eventos controvertidos de la historia?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Se deduce que el autor esperaría que el lector, al analizar otros eventos históricos, evite la empatía total con los personajes del pasado, manteniendo siempre una distancia crítica que permita una condena moral inequívoca.",
    'Se infiere que el autor preferiría que el lector solo se enfoque en el lado "negativo" de las figuras históricas complejas, para así aprender de los errores del pasado sin caer en la justificación de sus acciones.',
    "El autor, al promover un análisis complejo, buscaría que el lector priorice la identificación de héroes y villanos en la historia, ya que esto facilita la construcción de narrativas históricas claras y didácticas para la sociedad.",
    "El autor implicaría que, al estudiar figuras históricas controvertidas, se debe buscar activamente comprender las motivaciones y el contexto de la época, incluso si eso significa suspender juicios morales basados exclusivamente en valores contemporáneos.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "El autor implicaría que, al estudiar figuras históricas controvertidas, se debe buscar activamente comprender las motivaciones y el contexto de la época, incluso si eso significa suspender juicios morales basados exclusivamente en valores contemporáneos.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'A pesar de reconocer que "la expansión imperial era la norma" en el siglo XVI y que los "conceptos como derechos humanos... no existían", ¿qué se puede deducir de la postura del autor respecto a la responsabilidad moral por los abusos cometidos durante la conquista?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Se deduce que el autor considera que el contexto histórico exime completamente a Pizarro de la responsabilidad personal por los abusos, ya que actuó bajo las normas aceptadas de su época.",
    "La postura del autor infiere que la responsabilidad por los abusos es difusa y recae principalmente en la mentalidad imperialista de la época, diluyendo la culpa individual de Pizarro.",
    "Se deduce que el autor, al complejizar la figura de Pizarro, busca equilibrar la comprensión histórica con una firme necesidad de reconocer y no olvidar el sufrimiento y los abusos inherentes al proceso de conquista, sin llegar a justificarlos.",
    "El texto implica que, dado el contexto del siglo XVI, cualquier juicio moral contemporáneo sobre los abusos es irrelevante, ya que los valores actuales no pueden aplicarse retroactivamente a figuras históricas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que el autor, al complejizar la figura de Pizarro, busca equilibrar la comprensión histórica con una firme necesidad de reconocer y no olvidar el sufrimiento y los abusos inherentes al proceso de conquista, sin llegar a justificarlos.",
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
    "El texto sugiere que la historiografía peruana ha minimizado los logros estratégicos y la visión de Francisco Pizarro, enfocándose excesivamente en los aspectos negativos y no en su rol central como artífice de una nueva era cultural.",
    "La lectura concluye que Pizarro es un ejemplo de la inevitabilidad del imperialismo del siglo XVI, lo que despoja sus acciones de cualquier connotación moral negativa, haciéndolas comprensibles dentro de su contexto histórico.",
    "Se argumenta que, si bien la conquista fue violenta, la complejidad de Francisco Pizarro reside en su habilidad para capitalizar las circunstancias históricas y sentar las bases de una nueva identidad cultural, lo que exige una comprensión que trascienda juicios simplistas.",
    "El punto de vista central del autor es que, aunque Pizarro sea una figura controvertida, el impacto del sufrimiento de los pueblos originarios es tan central que debe prevalecer sobre cualquier intento de humanizar o complejizar su figura.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "Se argumenta que, si bien la conquista fue violenta, la complejidad de Francisco Pizarro reside en su habilidad para capitalizar las circunstancias históricas y sentar las bases de una nueva identidad cultural, lo que exige una comprensión que trascienda juicios simplistas.",
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
      resumenTexto: `El texto aborda la figura de Francisco Pizarro desde una perspectiva compleja, superando la visión simplista de "destructor" del Imperio incaico. Argumenta que su éxito, más allá de la violencia, se debió a su astucia política y a la debilitación interna inca. Además, destaca que la conquista, aunque trágica, fue un proceso inevitable que dio origen al mestizaje y a la identidad peruana actual. El autor enfatiza la necesidad de comprender a Pizarro en el contexto de su siglo (XVI), sin justificar abusos, pero evitando juicios anacrónicos para una reflexión histórica crítica y responsable.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `La figura de Francisco Pizarro debe ser analizada desde una perspectiva compleja y multifacética, más allá de los juicios simplistas, para comprender su papel en la conquista del Perú y la formación de la identidad mestiza del país, contextualizando sus acciones sin justificar los abusos.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Francisco Pizarro",
        "conquista del Perú",
        "figura compleja",
        "Imperio Inca",
        "mestizaje",
        "contexto histórico",
        "juicios simplistas",
        "identidad cultural",
        "abuso",
        "responsabilidad histórica",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
