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
      titulo: "Las oscuras golondrinas y el eco del amor perdido",
      descripcion:
        'Este texto analiza el poema "Volverán las oscuras golondrinas" de Gustavo Adolfo Bécquer, destacando cómo el autor expresa la nostalgia por un amor perdido a través de símbolos de la naturaleza y un lenguaje cargado de emoción.',
      imagen: "/golondrina.svg",
      categoria: "Literatura clásica",
      tipoTexto: "expositivo",
      contenido: `"Volverán las oscuras golondrinas en tu balcón sus nidos a colgar..." Así comienza uno de los poemas más recordados del poeta español Gustavo Adolfo Bécquer. Es parte de sus “Rimas”, una colección lírica escrita en el siglo XIX durante el auge del Romanticismo, un movimiento literario que valoraba los sentimientos intensos, la naturaleza y la subjetividad. En este poema, el hablante se despide de un amor que ya no volverá, recordando que, aunque las estaciones se repitan y la naturaleza siga su curso, el amor vivido entre ellos fue único e irrepetible.

A través de imágenes simbólicas como las "oscuras golondrinas" (que representan los ciclos de la naturaleza) o las palabras ardientes del corazón, Bécquer expresa la idea de que ciertos momentos y emociones no pueden repetirse. Puede haber otros amores, otros gestos y otras promesas, pero nada será igual a lo que ellos compartieron. En ese sentido, el poema no solo habla de una relación fallida, sino también de la nostalgia y la imposibilidad de recuperar el pasado.

Este texto conmueve porque captura algo muy humano: la intensidad del primer amor y el dolor de perderlo. Esas experiencias, aunque particulares, son universales. Muchos jóvenes se identifican con esa sensación de haber vivido algo tan fuerte que ninguna otra experiencia podrá igualarla. El poema también enseña a valorar la profundidad emocional sin miedo a mostrar fragilidad.

Además, la musicalidad de los versos, el uso de repeticiones (“Volverán... pero aquéllas no volverán”) y el contraste entre lo que regresa y lo que se ha perdido, hacen que el poema tenga una fuerza expresiva que sigue tocando a los lectores siglo y medio después de haber sido escrito.

Leer a Bécquer es también una oportunidad para descubrir que la literatura clásica no está lejos de nosotros. Habla de temas que siguen siendo actuales: el amor, el paso del tiempo, la memoria. Y lo hace con belleza, con pasión y con palabras que nos invitan a pensar en lo que hemos sentido y en lo que aún podemos sentir.`,
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
    "El texto afirma que el poema 'Volverán las oscuras golondrinas' fue escrito por Gustavo Adolfo Bécquer en el siglo XVIII, antes del auge del Romanticismo.",
    "La lectura detalla cómo el poema de Bécquer fue inicialmente rechazado por la crítica de su época debido a su excesiva sentimentalismo y falta de originalidad temática.",
    "Se menciona explícitamente que el poema 'Volverán las oscuras golondrinas' es parte de las 'Rimas' de Bécquer y fue creado en el siglo XIX durante el Romanticismo.",
    "El texto describe que las 'oscuras golondrinas' simbolizan la esperanza de un nuevo amor que eventualmente reemplazará al amor perdido en el poema de Bécquer.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Se menciona explícitamente que el poema 'Volverán las oscuras golondrinas' es parte de las 'Rimas' de Bécquer y fue creado en el siglo XIX durante el Romanticismo.",
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
    'La perdurable resonancia de las "Rimas" de Bécquer se refleja en su constante estudio en las aulas, la adaptación de sus versos a canciones populares y su presencia en la cultura pop contemporánea, evidenciando su vigencia.',
    'Bécquer, influenciado por la estética gótica, también exploró en sus "Leyendas" un mundo de misterio y fantasía, lo que demuestra su versatilidad más allá de la poesía amorosa.',
    "Aunque Bécquer es un pilar del Romanticismo español, su obra sentó las bases para el Simbolismo posterior, influyendo a poetas que buscarían una expresión más abstracta y musical.",
    "La biografía de Gustavo Adolfo Bécquer, marcada por la tragedia y una vida bohemia, explica en gran medida la melancolía y el tono nostálgico que impregna su poesía amorosa.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        'La perdurable resonancia de las "Rimas" de Bécquer se refleja en su constante estudio en las aulas, la adaptación de sus versos a canciones populares y su presencia en la cultura pop contemporánea, evidenciando su vigencia.',
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
    "Un estudio de la evolución de la poesía romántica española, analizando cómo poemas como 'Volverán las oscuras golondrinas' marcan un punto de inflexión estilístico hacia la modernidad lírica.",
    "La exploración de la vida personal de Gustavo Adolfo Bécquer, destacando cómo sus vivencias y la melancolía inherente a su biografía se manifiestan en la emotividad de sus 'Rimas'.",
    "La argumentación sobre la atemporalidad y el profundo valor emocional y estético de las 'Rimas' de Bécquer, destacando su resonancia universal en la experiencia humana contemporánea.",
    "Un análisis de la estructura y los recursos retóricos empleados en el poema 'Volverán las oscuras golondrinas', explicando su contribución a la musicalidad y la fuerza expresiva de la poesía decimonónica.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La argumentación sobre la atemporalidad y el profundo valor emocional y estético de las 'Rimas' de Bécquer, destacando su resonancia universal en la experiencia humana contemporánea.",
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
    "La forma en que el poema, a través de sus imágenes simbólicas y su tono, logra capturar y expresar emociones humanas universales como la intensidad del amor, la pérdida y la nostalgia, facilitando la identificación de los lectores.",
    "La influencia directa de la obra de Bécquer en la evolución del Romanticismo español hacia movimientos poéticos posteriores, como el Simbolismo o la Generación del 98.",
    "El análisis detallado de la métrica y la rima de los versos de 'Volverán las oscuras golondrinas', destacando la maestría técnica de Bécquer en la creación de musicalidad.",
    "La relevancia de las 'Leyendas' de Bécquer como obras de prosa fantástica, y cómo estas complementan la visión del amor y la muerte en sus 'Rimas', ofreciendo una perspectiva más completa de su universo literario.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La forma en que el poema, a través de sus imágenes simbólicas y su tono, logra capturar y expresar emociones humanas universales como la intensidad del amor, la pérdida y la nostalgia, facilitando la identificación de los lectores.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Considerando cómo el texto describe el uso de "imágenes simbólicas" y la capacidad del poema para "conmover", ¿qué se puede inferir sobre la forma en que Bécquer logra la universalidad y el impacto emocional de su mensaje?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Se infiere que Bécquer logra la universalidad de su poema principalmente a través de la descripción explícita y detallada de la ruptura amorosa, lo que facilita la comprensión literal de cualquier lector.",
    "El texto implica que la fuerza del poema proviene de la maestría de Bécquer para adaptar elementos del folclore español, haciendo que sus temas resulten familiares y universalmente aceptados por la cultura hispanohablante.",
    "La lectura sugiere que Bécquer alcanza la universalidad al limitar el contenido emocional de sus versos, evitando lo particular para no alienar a los lectores de otras culturas o épocas.",
    "La universalidad y el impacto emocional del poema residen, se deduce, en su habilidad para trascender la experiencia personal específica mediante el uso de símbolos atemporales y la profunda exploración de sentimientos, permitiendo una resonancia más allá de la narrativa concreta.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "La universalidad y el impacto emocional del poema residen, se deduce, en su habilidad para trascender la experiencia personal específica mediante el uso de símbolos atemporales y la profunda exploración de sentimientos, permitiendo una resonancia más allá de la narrativa concreta.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'A partir de la afirmación del texto de que la literatura clásica, como la de Bécquer, "no está lejos de nosotros" y "habla de temas que siguen siendo actuales", ¿qué se puede inferir sobre la visión del autor acerca del valor perdurable de las obras literarias?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Se deduce que, para el autor, el valor perdurable de una obra clásica se mide por su capacidad de adaptarse a formatos modernos como el cine o la música, garantizando su supervivencia cultural a lo largo del tiempo.",
    "El autor infiere que el verdadero valor de la literatura clásica reside en su función pedagógica, permitiendo a las nuevas generaciones comprender el contexto histórico y los movimientos artísticos del pasado.",
    "La lectura sugiere que el valor perdurable de una obra literaria, y su estatus de 'clásico', depende menos de su contexto histórico o su técnica formal y más de su continua capacidad para conectar emocional y temáticamente con la experiencia humana universal, sin importar la época del lector.",
    "Se puede inferir que el autor considera que solo aquellas obras clásicas que han sido objeto de un riguroso estudio académico y crítico logran trascender su tiempo y mantener su relevancia en el panorama cultural.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "La lectura sugiere que el valor perdurable de una obra literaria, y su estatus de 'clásico', depende menos de su contexto histórico o su técnica formal y más de su continua capacidad para conectar emocional y temáticamente con la experiencia humana universal, sin importar la época del lector.",
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
    "El texto argumenta que la obra de Bécquer, a pesar de su relevancia histórica como estandarte del Romanticismo, encuentra su mayor mérito en la capacidad de sus poemas para articular complejidades emocionales universales, manteniéndolos profundamente conectados con la sensibilidad de los lectores de cualquier época.",
    "La lectura sugiere que la perdurabilidad de la poesía de Bécquer se debe, en esencia, a la perfecta combinación de su musicalidad, su sencillez expresiva y el uso de un lenguaje accesible, cualidades que aseguran su éxito popular en distintas plataformas culturales.",
    "El texto sostiene que la principal barrera para la plena identificación de la audiencia contemporánea con las 'Rimas' de Bécquer es la marcada melancolía del poema, pues las sensibilidades actuales demandan narrativas que enfaticen la resiliencia y la superación personal.",
    "Se postula que la verdadera razón de la vigencia de Bécquer en el canon literario moderno es su innegable influencia en el desarrollo de la poesía española del siglo XX, más que su impacto directo en el sentir del lector común actual.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto argumenta que la obra de Bécquer, a pesar de su relevancia histórica como estandarte del Romanticismo, encuentra su mayor mérito en la capacidad de sus poemas para articular complejidades emocionales universales, manteniéndolos profundamente conectados con la sensibilidad de los lectores de cualquier época.",
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
      resumenTexto: `El poema de Gustavo Adolfo Bécquer, "Volverán las oscuras golondrinas", es un ejemplo sobresaliente del Romanticismo del siglo XIX, que, a través de sus imágenes simbólicas y su musicalidad, logra expresar la irrepetibilidad del amor perdido y la nostalgia por el pasado. El texto argumenta que la belleza y la profundidad emocional de este poema le permiten conmover y conectar con la experiencia humana universal, manteniendo su vigencia y actualidad para los lectores de cualquier época, demostrando que la literatura clásica, como la de Bécquer, sigue siendo profundamente relevante hoy.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El poema de Gustavo Adolfo Bécquer, "Volverán las oscuras golondrinas", ejemplifica cómo la literatura clásica mantiene una profunda y atemporal relevancia al abordar con belleza y pasión emociones humanas universales, permitiendo que su mensaje siga resonando poderosamente en los lectores contemporáneos.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Bécquer",
        "poema",
        "Rimas",
        "Romanticismo",
        "literatura clásica",
        "amor perdido",
        "universalidad",
        "emociones",
        "atemporalidad",
        "relevancia",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
