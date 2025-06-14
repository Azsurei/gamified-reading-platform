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
        "El arte peruano en TikTok: ¿expresión cultural o solo entretenimiento?",
      descripcion:
        "Este texto analiza el uso de TikTok por parte de jóvenes peruanos para difundir arte y expresiones culturales.",
      imagen: "/tiktok.svg",
      categoria: "Arte",
      tipoTexto: "argumentativo",
      contenido: `En los últimos años, TikTok se ha convertido en una de las plataformas favoritas de los adolescentes peruanos. En medio de bailes virales y retos graciosos, han comenzado a surgir jóvenes que utilizan esta red para algo más: difundir arte. Algunos enseñan danzas tradicionales como la marinera o el huaylas, otros cantan en quechua o tocan instrumentos andinos, mientras que unos más dibujan o pintan en vivo. Para muchos, esto es una forma novedosa y poderosa de expresión cultural. Pero también hay quienes critican que el arte en redes se vuelve superficial y se adapta demasiado al gusto del público para conseguir "likes".

Los defensores de esta nueva forma de arte sostienen que nunca antes fue tan fácil para un joven artista llegar a tantas personas. Antes, mostrar una pintura o una canción requería contactos, espacios físicos o dinero. Ahora, basta un celular e imaginación. Además, los contenidos artísticos que muestran aspectos de la identidad peruana permiten que más personas valoren nuestras expresiones culturales, incluso en otros países. Un adolescente en Cusco puede hacerse viral bailando danzas quechuas y, al mismo tiempo, reforzar su orgullo por sus raíces.

Sin embargo, los críticos advierten que esta exposición constante al juicio público puede deformar la intención del arte. En TikTok, muchos creadores priorizan lo que es "viralizable" antes que lo que tiene profundidad. A veces, se presentan danzas o trajes típicos como algo meramente decorativo, sin explicar su significado o historia. ¿Sigue siendo arte si se descontextualiza? ¿No se corre el riesgo de convertir el patrimonio en una moda pasajera?

Además, el algoritmo de la red premia lo rápido y visual, dejando fuera otras formas de arte más lentas o reflexivas, como la poesía o la escultura. Esto lleva a preguntarnos si estamos adaptando el arte a la plataforma, o si la plataforma está moldeando lo que consideramos arte.

En definitiva, el uso de TikTok por parte de jóvenes peruanos como espacio artístico es una muestra del poder de las nuevas tecnologías, pero también nos invita a reflexionar. ¿Estamos aprovechando el potencial expresivo de estas herramientas para enriquecer la cultura? ¿O estamos diluyendo el arte para que encaje en una pantalla de 15 segundos? El futuro del arte joven podría depender de cómo respondamos a estas preguntas.`,
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
    "El texto afirma que la principal función de TikTok para los adolescentes peruanos es el intercambio comercial de obras de arte tradicionales y contemporáneas.",
    "Según el autor, la crítica más extendida hacia el arte en TikTok es su incapacidad para generar un verdadero engagement con la audiencia joven, limitándose a contenidos superficiales.",
    "La lectura describe que algunos jóvenes peruanos utilizan TikTok para difundir diversas expresiones artísticas como danzas tradicionales, cantos en quechua o demostraciones de dibujo y pintura en vivo.",
    "Se menciona que el algoritmo de TikTok beneficia equitativamente a todas las formas de arte, incluyendo la poesía y la escultura, promoviendo su visibilidad de manera imparcial.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "La lectura describe que algunos jóvenes peruanos utilizan TikTok para difundir diversas expresiones artísticas como danzas tradicionales, cantos en quechua o demostraciones de dibujo y pintura en vivo.",
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
    "El debate sobre el arte en TikTok se extiende a cómo los propios creadores internalizan la presión por la viralidad, adaptando conscientemente su proceso creativo para encajar con las exigencias del algoritmo y el gusto masivo, lo que plantea nuevos interrogantes sobre la autenticidad artística.",
    "La evolución de la monetización en TikTok ha llevado a que los artistas peruanos más populares prioricen la creación de contenido patrocinado sobre la expresión cultural auténtica, afectando la percepción de su arte.",
    "Estudios recientes demuestran que la mayoría de los jóvenes peruanos utilizan TikTok no para fines artísticos, sino para la interacción social con amigos y el consumo de tendencias globales, lo que limita su impacto cultural significativo.",
    "La historia de las plataformas digitales muestra que las redes sociales, como TikTok, son inherentemente efímeras y rara vez logran generar un legado cultural duradero, por lo que el arte en ellas está destinado a desaparecer.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "El debate sobre el arte en TikTok se extiende a cómo los propios creadores internalizan la presión por la viralidad, adaptando conscientemente su proceso creativo para encajar con las exigencias del algoritmo y el gusto masivo, lo que plantea nuevos interrogantes sobre la autenticidad artística.",
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
    "La capacidad de TikTok para democratizar el acceso al arte y potenciar la visibilidad de jóvenes talentos peruanos, permitiendo que sus expresiones culturales tradicionales alcancen audiencias globales.",
    "El dilema central que plantea TikTok como plataforma para el arte peruano: si fomenta una genuina expresión cultural y refuerza la identidad, o si sus características intrínsecas conllevan riesgos de superficialidad y dilución artística.",
    "La crítica predominante hacia el algoritmo de TikTok por favorecer contenidos rápidos y visuales, lo que limita significativamente la difusión de formas de arte más reflexivas como la poesía y la escultura.",
    "Los múltiples usos de TikTok por parte de los adolescentes peruanos, que van desde el entretenimiento viral hasta la difusión de danzas tradicionales y expresiones musicales, mostrando la versatilidad de la plataforma.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "El dilema central que plantea TikTok como plataforma para el arte peruano: si fomenta una genuina expresión cultural y refuerza la identidad, o si sus características intrínsecas conllevan riesgos de superficialidad y dilución artística.",
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
    "El desafío que representa la tendencia a la decontextualización y superficialización del arte en TikTok, donde lo 'viralizable' puede despojar al patrimonio cultural de su significado profundo.",
    "La democratización sin precedentes del acceso al arte para los jóvenes artistas peruanos, quienes ahora pueden alcanzar una audiencia global sin las barreras de los espacios tradicionales.",
    "El impacto del algoritmo de TikTok en la promoción selectiva de ciertas expresiones artísticas visuales y rápidas, lo que marginaliza otras formas de arte más reflexivas o complejas.",
    "La función de TikTok como una herramienta esencial para la revitalización y preservación de lenguas y danzas originarias del Perú, garantizando su transmisión a nuevas generaciones y su orgullo identitario.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "El desafío que representa la tendencia a la decontextualización y superficialización del arte en TikTok, donde lo 'viralizable' puede despojar al patrimonio cultural de su significado profundo.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Considerando la pregunta final del texto sobre el futuro del arte joven en TikTok ("¿El futuro del arte joven podría depender de cómo respondamos a estas preguntas?"), ¿qué se puede deducir sobre la creencia implícita del autor acerca de quién tiene la mayor influencia en la dirección que tomará este fenómeno?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Se deduce que, para el autor, la evolución del arte peruano en TikTok dependerá fundamentalmente de las decisiones conscientes y la orientación que tomen tanto los jóvenes creadores como la audiencia, al priorizar la profundidad sobre la viralidad efímera.",
    "El autor sugiere que la responsabilidad de moldear el futuro del arte en TikTok recae principalmente en los desarrolladores de la plataforma, quienes deben ajustar sus algoritmos para fomentar contenidos de mayor calidad artística.",
    "Se infiere que la consolidación del arte en TikTok será determinada por la intervención y el reconocimiento de instituciones culturales y educativas tradicionales, que deberán establecer pautas para la difusión de patrimonio.",
    "El autor considera que el futuro del arte en TikTok ya está predeterminado por las tendencias globales de consumo de contenido digital, lo que hace inevitable su orientación hacia la superficialidad y el entretenimiento de masas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que, para el autor, la evolución del arte peruano en TikTok dependerá fundamentalmente de las decisiones conscientes y la orientación que tomen tanto los jóvenes creadores como la audiencia, al priorizar la profundidad sobre la viralidad efímera.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'A partir de la observación del texto de que el algoritmo de TikTok "premia lo rápido y visual, dejando fuera otras formas de arte más lentas o reflexivas", ¿qué se puede inferir sobre la concepción implícita del autor acerca de la relación entre las características de las plataformas digitales y la creación artística?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "El autor infiere que las plataformas digitales son herramientas neutrales que simplemente ofrecen un nuevo medio para que los artistas expresen su visión sin alterar la esencia de su obra o la percepción de su valor.",
    "El texto implica que la principal ventaja de las plataformas digitales para el arte es su capacidad para eliminar la necesidad de adaptar el contenido, permitiendo una expresión artística totalmente libre y sin condicionamientos.",
    "El autor sugiere que la relación entre tecnología y arte es puramente simbiótica, donde la tecnología siempre enriquece las posibilidades del arte sin introducir dilemas o desafíos significativos a su autenticidad.",
    "Se deduce que las características inherentes de las plataformas digitales, como sus algoritmos, ejercen una influencia activa y moldeadora sobre las formas que adopta el arte y, consecuentemente, sobre lo que la sociedad tiende a valorar como tal.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que las características inherentes de las plataformas digitales, como sus algoritmos, ejercen una influencia activa y moldeadora sobre las formas que adopta el arte y, consecuentemente, sobre lo que la sociedad tiende a valorar como tal.",
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
    "El texto expresa un optimismo incondicional sobre el futuro del arte peruano en TikTok, viéndolo como una plataforma esencial que garantiza la preservación y difusión de las tradiciones culturales a nivel global.",
    "La postura central del autor es que TikTok, aunque facilita la difusión, representa un riesgo fundamental para la autenticidad y profundidad del arte peruano, al promover la superficialidad y la decontextualización cultural.",
    "El punto de vista del autor es que TikTok, si bien ofrece una visibilidad sin precedentes para el arte peruano, plantea un dilema complejo sobre si enriquece la cultura o diluye las expresiones artísticas para adaptarlas a sus formatos y demandas.",
    "El texto argumenta que TikTok es principalmente una herramienta de entretenimiento masivo, cuyo impacto en el arte peruano es secundario y se limita a una moda pasajera impulsada por tendencias virales y la búsqueda de 'likes'.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El punto de vista del autor es que TikTok, si bien ofrece una visibilidad sin precedentes para el arte peruano, plantea un dilema complejo sobre si enriquece la cultura o diluye las expresiones artísticas para adaptarlas a sus formatos y demandas.",
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
      resumenTexto: `El texto examina el uso de TikTok por parte de jóvenes peruanos como una plataforma para difundir arte, trascendiendo el mero entretenimiento. Se destaca cómo facilita la exposición de expresiones culturales como danzas tradicionales y cantos en quechua, fomentando el orgullo identitario y el alcance global. Sin embargo, también se abordan las críticas sobre la superficialidad y decontextualización que la plataforma puede generar, ya que prioriza lo viral y lo visual, afectando formas de arte más reflexivas. El texto concluye planteando un dilema clave: ¿TikTok enriquece la cultura o diluye el arte para adaptarlo a sus formatos? El futuro del arte joven, sugiere, dependerá de cómo se aborden estas preguntas.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El uso de TikTok por jóvenes peruanos plantea un dilema complejo sobre si la plataforma realmente enriquece la cultura y el arte al difundir expresiones tradicionales, o si más bien las diluye y superficializa debido a sus características y demandas de viralidad.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "arte peruano",
        "TikTok",
        "expresión cultural",
        "entretenimiento digital",
        "juventud",
        "redes sociales",
        "autenticidad artística",
        "viralidad",
        "patrimonio cultural",
        "algoritmo",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
