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
      titulo: "Entre dragones y magia: el éxito de las historias fantásticas",
      descripcion:
        "El texto analiza cómo la fantasía, con sus mundos mágicos y criaturas míticas, refleja conflictos humanos universales y permite comprender la realidad más allá del entretenimiento.",
      imagen: "/dragon.svg",
      categoria: "Entretenimiento",
      tipoTexto: "expositivo",
      contenido: `Desde los antiguos cuentos medievales hasta las series más vistas en plataformas de streaming, las historias de fantasía siguen atrapando a millones de personas. ¿Por qué nos atraen tanto los mundos llenos de dragones, hechiceros y reinos lejanos? Más allá del entretenimiento, estas narraciones cumplen una función más profunda: explorar, desde lo simbólico, nuestros miedos, sueños y conflictos.

Autoras como J. K. Rowling o sagas como El Señor de los Anillos no solo inventaron universos mágicos, sino también estructuras morales complejas: el bien contra el mal, la tentación del poder, el valor de la amistad. Lo irreal se convierte así en un espejo que refleja dilemas humanos reales. Incluso las criaturas fantásticas, como elfos, ogros o dragones, representan aspectos profundos del alma humana: lo noble, lo salvaje, lo desconocido.

Además, la fantasía permite imaginar lo que la realidad nos niega. Mientras la ciencia limita lo posible, la ficción lo expande. Volar en escoba, hablar con animales o viajar entre dimensiones no son solo caprichos mágicos: son metáforas de nuestras ansias por liberarnos de las reglas cotidianas. Esta libertad creativa permite que autores y lectores aborden temas profundos —como el duelo, el destino o la búsqueda de identidad— sin las restricciones del mundo real.

Por otra parte, el éxito comercial de este género no es casual. Las películas de fantasía lideran las taquillas, y los libros de este tipo se convierten en fenómenos editoriales. Esto se debe a que estas historias combinan aventura, emoción, reflexión y, a menudo, una fuerte conexión emocional con personajes que evolucionan a lo largo del tiempo. El héroe o heroína que empieza siendo débil o desconocido y termina salvando el mundo es una fórmula que resuena con las etapas de crecimiento personal de cualquier lector.

En tiempos donde la rutina, la crisis y la información constante nos saturan, sumergirse en un universo imaginario puede ser un acto de resistencia. La fantasía nos recuerda que todavía hay espacio para la maravilla, para lo inesperado, y para la esperanza. Por eso, leer o ver una historia fantástica no es solo "escapar": es también conectar con nuestra parte más creativa, emocional y humana.`,
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
    "Las historias de fantasía, desde sus orígenes medievales hasta las producciones modernas en streaming, han mantenido una popularidad constante gracias a sus efectos especiales y tramas sencillas.",
    "Autores como J.R.R. Tolkien y J.K. Rowling crearon mundos de fantasía que, además de elementos mágicos, exploran dilemas morales universales como el bien contra el mal y la tentación del poder.",
    "La ciencia ficción, a diferencia de la fantasía, se enfoca en explorar las posibilidades futuras basadas en avances tecnológicos y científicos reales.",
    "El éxito comercial de la fantasía se debe principalmente a la nostalgia por los cuentos de hadas de la infancia y a la repetición de fórmulas narrativas predecibles.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Autores como J.R.R. Tolkien y J.K. Rowling crearon mundos de fantasía que, además de elementos mágicos, exploran dilemas morales universales como el bien contra el mal y la tentación del poder.",
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
    "Una exploración de cómo la fantasía, más allá de la lectura, se manifiesta en nuevas formas de consumo cultural como los podcasts de historias inmersivas o los juegos de rol en línea.",
    "Una lista de los escritores de fantasía menos conocidos pero influyentes en el desarrollo del género a lo largo del siglo XX.",
    "Un análisis técnico sobre el tipo de papel y la encuadernación más utilizados en la edición de novelas de fantasía.",
    "Un debate sobre las teorías psicológicas que explican la fascinación humana por los mundos imaginarios y sus criaturas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Una exploración de cómo la fantasía, más allá de la lectura, se manifiesta en nuevas formas de consumo cultural como los podcasts de historias inmersivas o los juegos de rol en línea.",
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
    "El análisis detallado de las sagas de fantasía más exitosas en el mercado actual, incluyendo datos de ventas y estrategias de marketing.",
    "La exploración de las razones por las cuales las historias de fantasía han mantenido su popularidad a lo largo del tiempo, examinando su función simbólica y su conexión con las necesidades humanas.",
    "Una comparación exhaustiva entre los elementos narrativos y los tropos comunes encontrados en la literatura fantástica medieval y la fantasía contemporánea.",
    "La influencia de la mitología antigua y el folclore en la creación de mundos fantásticos y criaturas mágicas en la literatura y el cine.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La exploración de las razones por las cuales las historias de fantasía han mantenido su popularidad a lo largo del tiempo, examinando su función simbólica y su conexión con las necesidades humanas.",
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
    "La evolución histórica de la figura del dragón en la literatura fantástica, desde sus representaciones medievales hasta las interpretaciones modernas.",
    "El análisis del impacto económico de la industria de la fantasía en el sector editorial y cinematográfico a nivel global.",
    "La capacidad de la fantasía para actuar como un espejo de los dilemas humanos reales a través de sus personajes y mundos irreales.",
    "Una tipología de los diferentes sistemas de magia encontrados en las obras de fantasía más populares, categorizando sus reglas y orígenes.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La capacidad de la fantasía para actuar como un espejo de los dilemas humanos reales a través de sus personajes y mundos irreales.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación de causa y efecto se puede establecer entre la creación de mundos de fantasía y la conexión emocional del lector con los personajes?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "La creación de mundos de fantasía con reglas y elementos mágicos detallados obliga a los autores a desarrollar personajes complejos y con motivaciones profundas para que los lectores puedan entender sus acciones dentro de ese contexto.",
    "Al situar a los personajes en mundos completamente diferentes al suyo, los lectores experimentan una sensación de extrañamiento que dificulta la formación de una conexión emocional genuina con ellos.",
    "La libertad creativa de la fantasía permite a los autores explorar temas profundos y dilemas humanos universales a través de sus personajes, lo que facilita una fuerte identificación y conexión emocional por parte del lector.",
    "El uso de criaturas fantásticas y elementos sobrenaturales en los mundos de fantasía distrae la atención del lector de las emociones y los conflictos internos de los personajes, debilitando la conexión emocional.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "La libertad creativa de la fantasía permite a los autores explorar temas profundos y dilemas humanos universales a través de sus personajes, lo que facilita una fuerte identificación y conexión emocional por parte del lector.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué semejanza o diferencia se puede deducir entre las criaturas fantásticas y los conflictos humanos?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Las criaturas fantásticas, al ser producto de la imaginación sin limitaciones de la realidad, ofrecen representaciones de conflictos humanos mucho más exageradas y simplificadas que los dilemas de la vida real.",
    "Mientras que los conflictos humanos se basan en la complejidad de las relaciones sociales y las motivaciones individuales, las criaturas fantásticas suelen encarnar fuerzas arquetípicas del bien o del mal, carentes de matices.",
    "Las criaturas fantásticas, a pesar de su apariencia irreal, pueden simbolizar aspectos profundos del alma humana —como la nobleza, lo salvaje o lo desconocido—, reflejando así la diversidad y complejidad de los conflictos internos y externos de los seres humanos.",
    "La principal diferencia radica en que los conflictos humanos tienen consecuencias reales en el mundo tangible, mientras que las interacciones con criaturas fantásticas ocurren en un plano puramente imaginario, sin impacto directo en la vida del lector.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Las criaturas fantásticas, a pesar de su apariencia irreal, pueden simbolizar aspectos profundos del alma humana —como la nobleza, lo salvaje o lo desconocido—, reflejando así la diversidad y complejidad de los conflictos internos y externos de los seres humanos.",
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
    "El principal atractivo de la fantasía radica en su capacidad de ofrecer una evasión total de los problemas y las limitaciones del mundo real.",
    "Aunque las historias de fantasía son inherentemente irreales, poseen la capacidad única de explorar y reflejar las complejidades de la condición humana a través de símbolos y metáforas.",
    "El éxito comercial de la fantasía demuestra que el público prefiere historias simples y llenas de acción antes que narrativas complejas que reflejan la realidad.",
    "La fantasía debería centrarse en crear mundos completamente originales y desligados de cualquier referencia a los miedos, sueños o conflictos humanos para ser verdaderamente innovadora.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "Aunque las historias de fantasía son inherentemente irreales, poseen la capacidad única de explorar y reflejar las complejidades de la condición humana a través de símbolos y metáforas.",
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
      resumenTexto: `El texto explora el perdurable atractivo de las historias de fantasía, argumentando que su éxito va más allá del mero entretenimiento. Estas narrativas, pobladas de elementos mágicos y reinos lejanos, cumplen una función profunda al simbolizar y examinar miedos, sueños y conflictos humanos. Autores como Rowling y sagas como El Señor de los Anillos demuestran cómo lo irreal puede reflejar dilemas morales reales, y cómo criaturas fantásticas encarnan aspectos del alma humana. La fantasía ofrece una libertad creativa que permite abordar temas complejos sin las limitaciones de la realidad, satisfaciendo ansias de liberación y permitiendo una conexión emocional con personajes en crecimiento. En un mundo saturado, la inmersión en la fantasía es un acto de resistencia que reconecta con la maravilla, la esperanza y nuestra propia humanidad creativa y emocional, explicando así su continuo éxito comercial.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `La perdurabilidad y el profundo atractivo de las historias de fantasía radican en su capacidad para explorar simbólicamente la condición humana, ofreciendo un espejo de nuestros miedos, sueños y dilemas morales a través de mundos irreales y personajes memorables, lo que explica su éxito continuo y su conexión emocional con el público.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "fantasía",
        "dragones",
        "magia",
        "éxito",
        "atracción",
        "simbólico",
        "miedos",
        "sueños",
        "conflictos",
        "dilemas humanos",
        "criaturas fantásticas",
        "libertad creativa",
        "conexión emocional",
        "crecimiento personal",
        "maravilla",
        "esperanza",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
