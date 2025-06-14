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
        "El freestyle en el Perú: ¿pasatiempo urbano o nueva forma de arte?",
      descripcion:
        "Este texto analiza el auge del freestyle en el Perú como fenómeno cultural reciente, presentando argumentos a favor y en contra de su reconocimiento como forma de arte.",
      imagen: "/freestyle.svg",
      categoria: "Entretenimiento",
      tipoTexto: "argumentativo",
      contenido: `En los últimos años, el freestyle —una forma de rap improvisado en la que los participantes compiten en batallas verbales— ha dejado de ser un pasatiempo de esquina para convertirse en un fenómeno cultural que llena estadios y genera millones de visualizaciones en redes. En el Perú, este movimiento ha crecido notablemente, con exponentes como Jaze, Nekroos o Stick, que han llevado el nombre del país a escenarios internacionales como la Red Bull Batalla de los Gallos.

Más allá de las rimas ingeniosas o los enfrentamientos vibrantes, el freestyle ha ganado un lugar en el mundo del entretenimiento por su capacidad de conectar con los jóvenes. Los temas que se abordan en estas batallas van desde la identidad y el racismo hasta la política y la desigualdad social. En una era en la que muchas voces jóvenes no se sienten representadas en los espacios tradicionales, el freestyle aparece como un canal genuino de expresión.

Sin embargo, no todos ven este fenómeno con buenos ojos. Algunos críticos lo consideran una moda pasajera, carente de profundidad artística y con un lenguaje muchas veces ofensivo. Pero esta visión ignora el nivel de complejidad que implica improvisar versos con coherencia, ritmo, rima y contenido, todo en cuestión de segundos. Además, las competencias oficiales ya cuentan con reglas claras que sancionan los discursos de odio y fomentan el respeto entre los participantes.

Lo que ocurre con el freestyle recuerda a lo que pasó en el pasado con otros géneros musicales, como el rock o el reguetón: primero rechazados por los sectores conservadores, luego reconocidos como parte del paisaje cultural. El talento, la creatividad y el impacto social del freestyle peruano podrían estar marcando el inicio de un nuevo capítulo artístico, en el que las plazas se convierten en escenarios y los raperos, en referentes.

Más que una moda, el freestyle parece ser una muestra del poder del lenguaje, la improvisación y el arte urbano. ¿Estamos frente a una forma de entretenimiento efímera o al nacimiento de una nueva manifestación cultural? Tal vez la respuesta esté en las rimas que se escuchen mañana en alguna plaza del Perú.`,
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
    "El texto afirma que el freestyle ha logrado llenar estadios y acumular millones de visualizaciones en redes sociales, con exponentes peruanos destacando internacionalmente en competencias como la Red Bull Batalla de los Gallos.",
    "Según la lectura, los temas predominantes en las batallas de freestyle se centran exclusivamente en el humor y las vivencias personales de los raperos, evitando cuestiones sociales o políticas complejas.",
    "Se menciona que el freestyle, a pesar de su popularidad actual, es considerado por la mayoría de los críticos como una moda pasajera y un arte sin reglas ni profundidad.",
    "El texto detalla cómo el freestyle surgió directamente del reguetón, compartiendo sus orígenes y estructuras rítmicas antes de desarrollar su propia identidad como género.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "El texto afirma que el freestyle ha logrado llenar estadios y acumular millones de visualizaciones en redes sociales, con exponentes peruanos destacando internacionalmente en competencias como la Red Bull Batalla de los Gallos.",
    }))
  );

  // === Pregunta 2 ===
  const [preguntaSeleccion2] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 1,
      enunciado:
        "¿Cuál de estas opciones aporta información complementaria que amplía lo expuesto en el texto, reforzando la idea del freestyle como una nueva manifestación cultural o forma de arte?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas2 = [
    "La creación de una liga profesional de freestyle en Perú ha garantizado que los participantes reciban salarios fijos y patrocinios millonarios, transformando el pasatiempo en una industria del entretenimiento altamente rentable.",
    "El texto sugiere que la evolución del freestyle está intrínsecamente ligada a la aparición de nuevas tecnologías de producción musical que permiten a los artistas crear instrumentales complejos en tiempo real durante las batallas.",
    "Además de su impacto mediático, el freestyle peruano ha comenzado a ser objeto de estudio en universidades, analizando su valor lírico, su influencia en el lenguaje juvenil y su rol como crónica social, lo que valida su profundidad artística.",
    "La historia del freestyle se remonta a las raíces del hip-hop en el Bronx, donde la improvisación verbal era una herramienta de resistencia cultural y un medio de expresión para las comunidades afroamericanas y latinas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Además de su impacto mediático, el freestyle peruano ha comenzado a ser objeto de estudio en universidades, analizando su valor lírico, su influencia en el lenguaje juvenil y su rol como crónica social, lo que valida su profundidad artística.",
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
    "La exposición de la creciente popularidad del freestyle en el Perú, destacando a sus principales exponentes y la manera en que sus habilidades de improvisación verbal superan las expectativas de la audiencia internacional.",
    "La exploración de los argumentos de los críticos del freestyle que lo tildan de efímero y superficial, y cómo estas objeciones, a pesar de los esfuerzos por regular el lenguaje, aún representan desafíos para su legitimación artística.",
    "El análisis del ascenso del freestyle en el Perú, debatiendo su naturaleza como mero entretenimiento versus su reconocimiento como una nueva manifestación cultural y forma de arte, a pesar de las críticas.",
    "Un paralelismo histórico entre el rechazo inicial de géneros como el rock y el reguetón y la actual resistencia a la plena aceptación del freestyle, sugiriendo que la historia musical se repite con cada nueva expresión urbana.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "El análisis del ascenso del freestyle en el Perú, debatiendo su naturaleza como mero entretenimiento versus su reconocimiento como una nueva manifestación cultural y forma de arte, a pesar de las críticas.",
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
    "El creciente impacto económico del freestyle, manifestado en la capacidad de llenar estadios y generar vastas ganancias por visualizaciones, consolidándolo como una industria del entretenimiento rentable.",
    "La función del freestyle como un auténtico canal de expresión para la juventud, abordando temáticas sociales y políticas relevantes que a menudo carecen de representación en otros espacios culturales.",
    "La superación de la complejidad técnica inherente a la improvisación de rimas en tiempo real, demostrando que esta habilidad artística trasciende la percepción de ser un mero pasatiempo urbano.",
    "La comparación del freestyle con otros géneros musicales históricamente marginados como el rock y el reguetón, para prever su inevitable aceptación y legitimación en el panorama cultural dominante.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La función del freestyle como un auténtico canal de expresión para la juventud, abordando temáticas sociales y políticas relevantes que a menudo carecen de representación en otros espacios culturales.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "A partir de la manera en que el texto aborda las críticas al freestyle (su supuesta falta de profundidad y lenguaje ofensivo) y su defensa como expresión cultural, ¿qué se puede deducir sobre la postura implícita del autor con respecto a la definición y evolución del arte?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "El autor sugiere que la verdadera expresión artística se limita a las formas tradicionales y académicamente validadas, considerando que las manifestaciones urbanas como el freestyle son meras modas pasajeras sin valor perdurable.",
    "Se infiere que, para el autor, el único criterio válido para considerar al freestyle como arte es su capacidad para abordar temas sociales y políticos, independientemente de su calidad estética o su cumplimiento con reglas formales.",
    "Se deduce que el autor concibe el arte como una categoría fluida y en constante evolución, capaz de integrar nuevas formas de expresión popular que, a pesar de la resistencia inicial, demuestran complejidad, creatividad e impacto social.",
    "El texto implica que el arte debe ser inherentemente inofensivo en su lenguaje y temática para ser considerado legítimo, por lo que el freestyle aún enfrenta un obstáculo insuperable en este aspecto.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que el autor concibe el arte como una categoría fluida y en constante evolución, capaz de integrar nuevas formas de expresión popular que, a pesar de la resistencia inicial, demuestran complejidad, creatividad e impacto social.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Considerando la comparación del freestyle con géneros como el rock y el reguetón, que fueron "primero rechazados" y "luego reconocidos", y la pregunta final del texto sobre su futuro, ¿qué se puede inferir sobre la expectativa implícita del autor respecto a la eventual aceptación cultural del freestyle en el Perú?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "El autor predice que la aceptación del freestyle, a pesar de su popularidad actual, será limitada y efímera debido a la resistencia constante de los sectores más conservadores y la falta de apoyo institucional.",
    "Se infiere un optimismo mesurado por parte del autor, quien sugiere que el freestyle, impulsado por su talento y arraigo popular, muy probablemente seguirá un camino de creciente reconocimiento y legitimación artística, análogo al de géneros previamente marginalizados.",
    "El texto implica que la plena legitimación del freestyle como forma de arte dependerá exclusivamente de su inclusión en los programas educativos formales y del respaldo explícito de las academias de lengua y literatura.",
    "Se deduce que el autor considera que la trayectoria del freestyle difiere fundamentalmente de la del rock o el reguetón, por lo que su futuro está más ligado a su éxito comercial internacional que a su integración cultural local.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Se infiere un optimismo mesurado por parte del autor, quien sugiere que el freestyle, impulsado por su talento y arraigo popular, muy probablemente seguirá un camino de creciente reconocimiento y legitimación artística, análogo al de géneros previamente marginalizados.",
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
    "El texto argumenta que, a pesar de los desafíos inherentes a su naturaleza improvisada, el freestyle ha evolucionado demostrando ser una forma de arte verbal con una complejidad y un impacto social suficientes para merecer un reconocimiento cultural más amplio.",
    "Se postula que el freestyle, pese a su actual popularidad, es un fenómeno impulsado mayormente por el consumo masivo en redes sociales, lo que dificulta que alcance la perdurabilidad y la profundidad de otras expresiones artísticas consolidadas.",
    "La lectura sugiere que el valor más significativo del freestyle radica en su capacidad para ofrecer un entretenimiento dinámico y accesible, capturando la atención de las nuevas generaciones sin la necesidad de una profunda trascendencia cultural.",
    "El autor defiende que, para que el freestyle sea plenamente validado como arte, es imperativo que abandone completamente su lenguaje ofensivo y se integre en los circuitos culturales formales, adoptando los estándares estéticos ya establecidos.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto argumenta que, a pesar de los desafíos inherentes a su naturaleza improvisada, el freestyle ha evolucionado demostrando ser una forma de arte verbal con una complejidad y un impacto social suficientes para merecer un reconocimiento cultural más amplio.",
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
      resumenTexto: `El freestyle en Perú ha evolucionado de pasatiempo urbano a un fenómeno cultural significativo, con exponentes reconocidos internacionalmente. El texto argumenta que es un canal de expresión juvenil crucial para temas sociales y políticos, desafiando a los críticos que lo tildan de superficial o pasajero. Defiende su complejidad artística y la regulación de su lenguaje, comparando su trayectoria con la de géneros como el rock y el reguetón. Se plantea que el freestyle podría ser el nacimiento de una nueva manifestación cultural con un impacto duradero, más allá del mero entretenimiento.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El freestyle en el Perú está trascendiendo su rol de pasatiempo para consolidarse como una significativa manifestación cultural y forma de arte, al servir como un complejo canal de expresión juvenil y social, superando las críticas de superficialidad o efímero.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "freestyle Perú",
        "rap improvisado",
        "fenómeno cultural",
        "arte urbano",
        "expresión juvenil",
        "crítica cultural",
        "complejidad artística",
        "identidad peruana",
        "música urbana",
        "reconocimiento cultural",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
