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
      titulo: "¿Puede considerarse el videojuego una forma de arte?",
      descripcion:
        "Este texto reflexiona sobre el estatus de los videojuegos como forma de arte.",
      imagen: "/videojuegos.svg",
      categoria: "Entretenimiento",
      tipoTexto: "argumentativo",
      contenido: `Durante años, los videojuegos fueron vistos simplemente como una forma de ocio juvenil, una actividad ligada al entretenimiento sin mayor trascendencia. Sin embargo, a medida que la industria ha evolucionado, surgen preguntas más complejas: ¿puede un videojuego ser arte? ¿Puede transmitir emociones profundas, reflexiones éticas o estéticas igual que una pintura, una novela o una película?

Algunos críticos sostienen que los videojuegos no pueden ser arte porque su propósito principal es divertir, no conmover ni expresar ideas profundas. A esto se suma su carácter interactivo: el jugador influye en lo que ocurre, lo que para algunos rompe con la noción tradicional de una obra artística, que se contempla sin modificarla. Bajo esta visión, el videojuego sería un producto comercial, diseñado para entretener, no para elevar el espíritu.

Sin embargo, esta postura ignora los profundos avances que ha logrado el medio. Existen videojuegos que cuentan historias complejas, con personajes desarrollados, diálogos cargados de simbolismo y entornos visuales que rivalizan con la cinematografía más cuidada. Juegos como Journey, Shadow of the Colossus o Gris exploran temas como la soledad, el sacrificio o el duelo, a través de recursos visuales, musicales y narrativos que provocan una fuerte experiencia emocional en el jugador.

Además, la interactividad no es una debilidad, sino una fortaleza. En un videojuego, el jugador no solo observa: participa, toma decisiones, asume responsabilidades. Esto genera un nivel de inmersión y empatía que otros lenguajes artísticos no siempre logran. En Life is Strange, por ejemplo, las decisiones éticas del jugador afectan el rumbo de la historia, lo que permite una reflexión directa sobre temas como el acoso escolar, la amistad o la identidad.

Otro argumento en defensa del videojuego como arte es su capacidad de integrar múltiples disciplinas: música, diseño visual, guion, actuación de voz, programación y dirección artística. Este carácter multidisciplinario convierte al videojuego en una de las formas más completas de expresión contemporánea. Requiere coordinación creativa, visión estética y una intención comunicativa, todas características presentes en las artes tradicionales.

Entonces, ¿qué impide que reconozcamos a los videojuegos como arte? En muchos casos, los prejuicios generacionales y el desconocimiento del medio. Al igual que el cine, que en sus inicios fue criticado por su carácter comercial, los videojuegos están viviendo una transición: de pasatiempo masivo a vehículo legítimo de expresión cultural.

Aceptar a los videojuegos como arte no significa afirmar que todos lo son, del mismo modo que no toda película o pintura tiene valor artístico. Pero negar esa posibilidad sería cerrar los ojos ante una forma de creación que, en pleno siglo XXI, ha demostrado su capacidad para emocionar, hacer pensar y representar la complejidad de la experiencia humana.`,
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
    "El texto inicia reconociendo que los videojuegos, en su etapa temprana, eran considerados primariamente una forma de ocio juvenil, aunque luego desmiente que esa sea su única capacidad.",
    "La interactividad es citada en el texto como el obstáculo principal que impide a los videojuegos ser reconocidos como arte, ya que altera la integridad de la obra artística tradicional.",
    "Se defiende que los videojuegos logran conmover y generar profundas reflexiones al integrar múltiples disciplinas artísticas y permitir al jugador una inmersión y toma de decisiones que supera a otros medios.",
    "El cine, a diferencia de los videojuegos, experimentó una aceptación inmediata como arte al evitar las críticas por su naturaleza comercial, lo que allanó su camino hacia el reconocimiento cultural.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "El texto inicia reconociendo que los videojuegos, en su etapa temprana, eran considerados primariamente una forma de ocio juvenil, aunque luego desmiente que esa sea su única capacidad.",
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
    "Este creciente reconocimiento también se refleja en la proliferación de simposios académicos y exposiciones especializadas que analizan el diseño de juegos desde perspectivas estéticas y narrativas, equiparándolos a otras bellas artes.",
    "La próxima generación de consolas de videojuegos promete gráficos hiperrealistas y una inteligencia artificial avanzada, lo que revolucionará aún más la experiencia de entretenimiento interactivo.",
    "A pesar de su potencial artístico, la industria del videojuego enfrenta el desafío constante de equilibrar la innovación creativa con las presiones comerciales para producir títulos de alto volumen de ventas.",
    "Las estadísticas de ventas anuales demuestran que los videojuegos generan más ingresos que la industria del cine y la música combinadas, consolidando su posición como la forma de entretenimiento dominante a nivel global.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Este creciente reconocimiento también se refleja en la proliferación de simposios académicos y exposiciones especializadas que analizan el diseño de juegos desde perspectivas estéticas y narrativas, equiparándolos a otras bellas artes.",
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
    "El análisis de las tendencias de desarrollo de videojuegos en el siglo XXI y el impacto de la tecnología en el futuro del entretenimiento digital.",
    "La evolución del videojuego desde un mero pasatiempo juvenil hasta una forma de arte legítima, defendiendo su capacidad para evocar emociones y reflexiones profundas.",
    "Un debate sobre la viabilidad económica de la industria del videojuego en comparación con otras formas de entretenimiento tradicionales como el cine y la música.",
    "La descripción de los diferentes géneros de videojuegos y cómo cada uno contribuye a la diversidad cultural del medio interactivo.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La evolución del videojuego desde un mero pasatiempo juvenil hasta una forma de arte legítima, defendiendo su capacidad para evocar emociones y reflexiones profundas.",
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
    "La evolución del reconocimiento del cine como arte, utilizada en el texto para trazar un paralelo con la actual situación de los videojuegos y prever su futura aceptación cultural.",
    "El argumento de que la interactividad del jugador, vista inicialmente como un obstáculo, es en realidad una fortaleza que permite una inmersión y reflexión ética más profunda en el medio artístico del videojuego.",
    "El análisis de cómo los videojuegos logran captar la atención de audiencias masivas, lo que ha llevado a que su modelo de negocio se convierta en el más lucrativo dentro de la industria del entretenimiento global.",
    "La exploración de la capacidad de los videojuegos para integrar elementos de otras artes, como la música y el diseño visual, lo que los posiciona como la forma de expresión más innovadora del siglo XXI.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "El argumento de que la interactividad del jugador, vista inicialmente como un obstáculo, es en realidad una fortaleza que permite una inmersión y reflexión ética más profunda en el medio artístico del videojuego.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación se puede deducir entre la integración de elementos artísticos (como música, narrativa visual y diseño) y la capacidad de los videojuegos para generar una experiencia emocional inmersiva en el jugador?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "El texto sugiere que los elementos artísticos, aunque importantes, actúan principalmente como un complemento estético, siendo la interactividad el único factor determinante para la inmersión emocional del jugador.",
    "Se deduce que la orquestación y el diseño minucioso de diversas disciplinas artísticas son los pilares que permiten a los videojuegos construir mundos complejos y relatos que, a su vez, desencadenan una profunda conexión emocional y sentido de inmersión en el participante.",
    "La lectura establece que la calidad de la integración artística en un videojuego es directamente proporcional a su éxito comercial, lo que indirectly garantiza una experiencia emocional elevada para la mayoría de los jugadores.",
    "El texto implica que la riqueza de los elementos artísticos en un videojuego a menudo puede abrumar al jugador, restando protagonismo a su capacidad de toma de decisiones y limitando así la verdadera inmersión afectiva.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que la orquestación y el diseño minucioso de diversas disciplinas artísticas son los pilares que permiten a los videojuegos construir mundos complejos y relatos que, a su vez, desencadenan una profunda conexión emocional y sentido de inmersión en el participante.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿En qué se diferencia el enfoque interactivo de los videojuegos de la manera en que se perciben otras formas de arte, según la argumentación del texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "El texto señala que la interactividad del videojuego desafía la concepción tradicional de una obra de arte que se experimenta de forma pasiva, sin la intervención del espectador.",
    "La argumentación sugiere que, a diferencia de otras artes que buscan la contemplación, los videojuegos priorizan exclusivamente la diversión del jugador, lo que impide una conexión emocional profunda.",
    "La principal distinción reside en que la interactividad de los videojuegos, al diluir el control del autor, contrasta con la autoría única y la visión inalterable que se espera de las obras de arte tradicionales.",
    "El texto explica que la interactividad es una debilidad de los videojuegos que los aleja de la inmersión lograda por el cine o la literatura, medios que permiten una experiencia más unidireccional y profunda.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "El texto señala que la interactividad del videojuego desafía la concepción tradicional de una obra de arte que se experimenta de forma pasiva, sin la intervención del espectador.",
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
    "El texto sostiene que, aunque los videojuegos comenzaron como entretenimiento, su evolución ha probado su capacidad para el arte, equiparándose a formas de expresión tradicionales mediante la integración de elementos narrativos y emocionales únicos.",
    "La lectura argumenta que el valor artístico de los videojuegos, si bien creciente, permanece limitado por su naturaleza de producto comercial masivo y su dificultad para trascender la mera diversión, a diferencia de otras artes establecidas.",
    "Se defiende que los videojuegos son una forma de arte emergente superior a las tradicionales, principalmente por su interactividad, que permite una inmersión emocional y una participación del espectador inalcanzables para el cine o la literatura.",
    "El punto de vista central del texto es que la categorización de los videojuegos como arte es un debate puramente subjetivo, dado que su reconocimiento depende más de la aceptación generacional que de criterios estéticos universales.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto sostiene que, aunque los videojuegos comenzaron como entretenimiento, su evolución ha probado su capacidad para el arte, equiparándose a formas de expresión tradicionales mediante la integración de elementos narrativos y emocionales únicos.",
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
      resumenTexto: `El texto argumenta firmemente que los videojuegos han trascendido su percepción inicial como mero entretenimiento juvenil para convertirse en una forma de arte legítima. Refuta las críticas de que su propósito es solo divertir y que su interactividad rompe con la noción de obra artística, defendiendo que esta última es, de hecho, una fortaleza que genera inmersión y empatía únicas. Además, destaca su naturaleza multidisciplinaria (integrando música, diseño visual, guion) como prueba de su complejidad artística. El autor concluye que los prejuicios generacionales y el desconocimiento del medio impiden su reconocimiento pleno, pero afirma que negar su capacidad para emocionar, hacer pensar y representar la experiencia humana sería ignorar una de las formas de creación más completas del siglo XXI.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `Los videojuegos han trascendido el mero entretenimiento para ser una forma de arte legítima, argumentando que su interactividad es una fortaleza que permite una profunda inmersión emocional y que su naturaleza multidisciplinaria los equipara a otras expresiones artísticas, a pesar de los prejuicios generacionales.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "videojuegos",
        "arte",
        "entretenimiento",
        "interactividad",
        "emoción",
        "inmersión",
        "narrativa",
        "multidisciplinario",
        "prejuicios",
        "reconocimiento cultural",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
