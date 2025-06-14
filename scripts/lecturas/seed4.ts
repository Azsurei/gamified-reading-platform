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
        "El poder de la música: una forma de arte que conecta con los jóvenes",
      descripcion:
        "Este texto reflexiona sobre el valor de la música como una forma de arte significativa en la vida de los adolescentes.",
      imagen: "/musica.svg",
      categoria: "Arte",
      tipoTexto: "expositivo",
      contenido: `La música no es solo un conjunto de sonidos: es una forma de arte que tiene el poder de transmitir emociones, contar historias y expresar ideas que a veces no se pueden decir con palabras. Para muchos adolescentes, la música se convierte en una compañera diaria: los acompaña mientras estudian, entrenan o simplemente descansan. Más allá del entretenimiento, la música influye en su estado de ánimo, en cómo se ven a sí mismos y en cómo entienden el mundo.

A lo largo de la historia, la música ha sido una forma de expresión cultural y social. Desde los tambores tribales hasta las sinfonías clásicas, desde el rock hasta el reguetón, cada género refleja una época, una identidad y una forma de ver la vida. Hoy en día, los jóvenes consumen música de manera diferente: a través de plataformas como Spotify o YouTube, descubren artistas de todo el mundo y crean listas personalizadas que reflejan su personalidad.

Lo interesante es que, a pesar de los cambios tecnológicos, la música sigue cumpliendo una función muy antigua: ayudar a las personas a sentirse comprendidas. Por ejemplo, canciones como “This Is Me” de The Greatest Showman celebran la aceptación personal y la valentía de mostrarse tal como uno es; “Unstoppable” de Sia transmite un poderoso mensaje de fortaleza frente a las dificultades; y “Flowers” de Miley Cyrus habla de amor propio y autosuficiencia tras una ruptura. Estas letras conectan con los jóvenes porque reflejan emociones reales y ofrecen mensajes de empoderamiento y superación.

La música también despierta el pensamiento crítico. Algunas letras cuestionan problemas sociales como la violencia, la discriminación o la presión estética. Además, muchos artistas jóvenes combinan ritmos modernos con letras reflexivas, demostrando que es posible disfrutar y pensar al mismo tiempo. Para un adolescente, encontrar una canción que exprese exactamente lo que siente puede ser una experiencia poderosa.

La música, entonces, va más allá de ser solo un pasatiempo: es una forma de arte cercana, viva y transformadora. Tiene el poder de entretener, pero también de enseñar, acompañar e inspirar. En la adolescencia, cada canción puede convertirse en un refugio, una voz amiga o un impulso para seguir adelante. Por eso, vale la pena mirarla no solo con los oídos, sino también con el corazón y la mente abierta.`,
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
    "La música, desde sus inicios con los cantos gregorianos hasta la música electrónica contemporánea, siempre ha sido un mero pasatiempo sin influencia real en las emociones humanas.",
    "Para muchos adolescentes, la música se ha convertido en una presencia constante en sus vidas, acompañándolos en diversas actividades y teniendo un impacto significativo en su estado de ánimo y autopercepción.",
    "Plataformas de streaming como TikTok han reemplazado por completo a la radio y la televisión como principales medios de descubrimiento y consumo musical para la juventud actual.",
    "La música, a lo largo de la historia y en todos sus géneros, siempre ha transmitido mensajes explícitamente políticos y sociales, buscando generar un cambio directo en la sociedad.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Para muchos adolescentes, la música se ha convertido en una presencia constante en sus vidas, acompañándolos en diversas actividades y teniendo un impacto significativo en su estado de ánimo y autopercepción.",
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
    "Esta conexión profunda y personal con la música durante la adolescencia a menudo moldea los gustos musicales que perduran en la edad adulta, influyendo en la identidad y las preferencias a largo plazo.",
    "Algunos estudios sugieren que la exposición temprana a una amplia variedad de géneros musicales puede mejorar las habilidades cognitivas y la creatividad en los jóvenes.",
    "La producción musical actual se ha abaratado significativamente gracias a la tecnología digital, permitiendo a más adolescentes crear y compartir su propia música.",
    "Las terapias musicales han demostrado ser efectivas para abordar problemas de salud mental en adolescentes, utilizando la música como una herramienta para la expresión y la sanación emocional.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Esta conexión profunda y personal con la música durante la adolescencia a menudo moldea los gustos musicales que perduran en la edad adulta, influyendo en la identidad y las preferencias a largo plazo.",
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
    "La evolución histórica de los diferentes géneros musicales a lo largo del tiempo y su impacto en la sociedad.",
    "El papel fundamental de la música en la vida de los adolescentes como compañera, influencia emocional, reflejo de identidad y herramienta para la comprensión del mundo.",
    "Un análisis comparativo de las plataformas de streaming musical más populares y su influencia en los hábitos de consumo de los jóvenes.",
    "La relación entre la música y el desarrollo del pensamiento crítico en los adolescentes a través del análisis de letras con contenido social.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "El papel fundamental de la música en la vida de los adolescentes como compañera, influencia emocional, reflejo de identidad y herramienta para la comprensión del mundo.",
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
    "La influencia de la música en el desarrollo de la identidad personal de los adolescentes.",
    "El impacto económico de la industria musical en la cultura juvenil actual.",
    "La utilización de la música como herramienta en terapias psicológicas para adolescentes.",
    "La historia y evolución de las plataformas de streaming musical y su accesibilidad para los jóvenes.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La influencia de la música en el desarrollo de la identidad personal de los adolescentes.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación de causa y efecto se puede establecer entre la escucha de música con letras significativas y el desarrollo del pensamiento crítico en los adolescentes?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "La exposición constante a letras musicales complejas y metafóricas puede sobrecargar cognitivamente a los adolescentes, dificultando el desarrollo de habilidades de pensamiento crítico que requieren claridad y lógica.",
    "Escuchar música con letras que abordan problemas sociales, cuestionan normas o presentan perspectivas diversas puede exponer a los adolescentes a diferentes puntos de vista y fomentar la reflexión, contribuyendo así al desarrollo de su pensamiento crítico.",
    "La popularidad de la música con letras significativas entre los adolescentes se debe principalmente a su ritmo pegadizo y melodías atractivas, sin una conexión directa con el desarrollo de habilidades cognitivas superiores.",
    "El análisis de letras musicales significativas requiere un conocimiento profundo de la historia y la literatura, áreas que generalmente no son de interés para la mayoría de los adolescentes, lo que limita cualquier impacto en su pensamiento crítico.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Escuchar música con letras que abordan problemas sociales, cuestionan normas o presentan perspectivas diversas puede exponer a los adolescentes a diferentes puntos de vista y fomentar la reflexión, contribuyendo así al desarrollo de su pensamiento crítico.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué semejanza o diferencia se puede deducir entre la función de la música en la vida de los adolescentes y la función de un amigo cercano?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Mientras que un amigo cercano ofrece compañía activa e interacción bidireccional, la música proporciona un acompañamiento pasivo y una conexión unidireccional con el artista.",
    "Tanto la música como un amigo cercano pueden ofrecer consuelo, comprensión y un sentido de pertenencia, aunque la música lo hace a través de la expresión artística y el amigo a través del diálogo y la empatía personal.",
    "La música, a diferencia de un amigo, siempre está disponible y no requiere esfuerzo para 'escucharla', pero carece de la capacidad de ofrecer consejos personalizados o apoyo directo en situaciones específicas.",
    "Un amigo cercano puede evolucionar y cambiar en la relación, mientras que la función de una canción permanece constante a lo largo del tiempo, ofreciendo un refugio emocional predecible.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Tanto la música como un amigo cercano pueden ofrecer consuelo, comprensión y un sentido de pertenencia, aunque la música lo hace a través de la expresión artística y el amigo a través del diálogo y la empatía personal.",
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
    "La música es fundamentalmente una forma de entretenimiento superficial, cuyo valor radica principalmente en su capacidad para distraer a los adolescentes de sus problemas.",
    "A pesar de su naturaleza intangible, la música posee un poder significativo para influir en las emociones, la identidad y la comprensión del mundo de los jóvenes, actuando como un compañero y un refugio.",
    "El valor de la música para los adolescentes reside principalmente en su capacidad para facilitar la interacción social y la creación de grupos basados en gustos musicales compartidos.",
    "La industria musical contemporánea explota las vulnerabilidades emocionales de los adolescentes a través de letras simplistas y ritmos pegadizos con fines puramente comerciales.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "A pesar de su naturaleza intangible, la música posee un poder significativo para influir en las emociones, la identidad y la comprensión del mundo de los jóvenes, actuando como un compañero y un refugio.",
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
      resumenTexto: `La música es presentada como una forma de arte poderosa que transmite emociones e ideas, convirtiéndose en una compañera diaria para muchos adolescentes que influye en su estado de ánimo, identidad y comprensión del mundo. A lo largo de la historia, la música ha sido una expresión cultural y social, y hoy en día, a través de plataformas digitales, los jóvenes descubren y personalizan su consumo musical. A pesar de los cambios tecnológicos, la música cumple la función de hacer sentir comprendidas a las personas, con canciones que abordan temas de aceptación, fortaleza y amor propio. Además, despierta el pensamiento crítico al cuestionar problemas sociales. En la adolescencia, la música trasciende el pasatiempo, actuando como un refugio, una voz amiga y una fuente de inspiración, mereciendo ser apreciada con el corazón y la mente abierta.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `La música juega un rol fundamental y multifacético en la vida de los adolescentes, sirviendo como compañera, influencia emocional, reflejo de identidad y herramienta para la comprensión del mundo, trascendiendo el mero entretenimiento.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "música",
        "adolescentes",
        "emociones",
        "identidad",
        "mundo",
        "compañera",
        "historia",
        "cultura",
        "plataformas",
        "comprensión",
        "empoderamiento",
        "pensamiento crítico",
        "refugio",
        "inspiración",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
