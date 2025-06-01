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
      titulo: "El juicio de Galileo: ciencia contra poder",
      descripcion:
        "El texto narra el conflicto entre Galileo y la Iglesia al defender el heliocentrismo, destacando sus descubrimientos, su juicio y su legado como símbolo de la lucha por la libertad de pensamiento.",
      imagen: "/galileo.svg",
      categoria: "Historia",
      tipoTexto: "narrativo",
      contenido: `En el siglo XVII, Europa atravesaba una era de profundos cambios. La ciencia, antes subordinada a la religión, comenzaba a levantar su voz con fuerza propia. Fue en este contexto que vivió Galileo Galilei, un hombre que, con su telescopio y su mente inquisitiva, se atrevió a desafiar las creencias dominantes.

Galileo no fue el primero en proponer que la Tierra gira alrededor del Sol. Esa teoría, conocida como heliocentrismo, había sido formulada por Copérnico décadas antes. Sin embargo, fue Galileo quien aportó las pruebas observacionales que sacudieron los cimientos del pensamiento medieval. Con su telescopio, descubrió que Júpiter tenía lunas propias, que la Luna tenía montañas y cráteres, y que Venus mostraba fases, como la Luna. Estas observaciones contradecían directamente el modelo geocéntrico, defendido por la Iglesia, que colocaba a la Tierra en el centro del universo.

Pero Galileo no era solo un científico: también era un hábil divulgador. Publicó sus hallazgos en italiano, la lengua del pueblo, en lugar del latín académico. Eso hizo que sus ideas se esparcieran con rapidez y provocaran reacciones intensas, tanto de admiración como de rechazo.

En 1633, tras años de presión, fue convocado a Roma por la Inquisición, el tribunal eclesiástico encargado de proteger la doctrina católica. Allí, Galileo fue obligado a abjurar de sus creencias, es decir, a negar públicamente que la Tierra se moviera. Bajo amenaza de tortura, pronunció las palabras que lo salvarían físicamente, pero que marcaron una derrota simbólica para la libertad de pensamiento.

Según la leyenda, al salir del juicio, murmuró: “Eppur si muove” —“Y sin embargo, se mueve”—. Esta frase resume la tensión entre lo que se ve y lo que se cree, entre la razón y el poder. Galileo fue condenado a arresto domiciliario hasta su muerte, pero su obra siguió influyendo a generaciones futuras de científicos.

Hoy, el caso de Galileo es un símbolo universal del conflicto entre la verdad científica y las estructuras de autoridad. Su historia no es solo un episodio del pasado, sino una advertencia constante: el conocimiento puede ser peligroso cuando desafía las certezas establecidas, pero también es la llave para liberar a la humanidad de la oscuridad.`,
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
    "Galileo Galilei, apoyándose en las teorías previas de Isaac Newton, demostró mediante observaciones telescópicas la validez del modelo heliocéntrico propuesto originalmente por Johannes Kepler.",
    "En el siglo XVII, durante un periodo de cambios significativos en Europa, Galileo Galilei utilizó su telescopio para realizar descubrimientos que apoyaban la teoría heliocéntrica de Copérnico, desafiando así la visión geocéntrica defendida por la Iglesia.",
    "La Inquisición romana, un tribunal civil de la época, convocó a Galileo en 1633 y, tras un juicio público donde se presentaron numerosas pruebas científicas, lo absolvió de todos los cargos relacionados con sus creencias heliocéntricas.",
    "A pesar de la condena a arresto domiciliario y la obligación de retractarse públicamente de sus ideas, Galileo continuó publicando sus descubrimientos en latín, llegando así a una audiencia académica aún mayor en toda Europa.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "En el siglo XVII, durante un periodo de cambios significativos en Europa, Galileo Galilei utilizó su telescopio para realizar descubrimientos que apoyaban la teoría heliocéntrica de Copérnico, desafiando así la visión geocéntrica defendida por la Iglesia.",
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
    "La Iglesia Católica, siglos después, reconoció formalmente los errores del juicio y reivindicó la figura de Galileo como un importante científico.",
    "En esa misma época, otros científicos europeos se dedicaban a investigar la alquimia y la búsqueda de la piedra filosofal.",
    "Galileo, además de sus contribuciones a la astronomía, también incursionó en la pintura y la composición musical.",
    "Los telescopios modernos utilizados por los astrónomos son increíblemente más potentes que el rudimentario instrumento de Galileo.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "La Iglesia Católica, siglos después, reconoció formalmente los errores del juicio y reivindicó la figura de Galileo como un importante científico.",
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
    "La biografía detallada de Galileo Galilei, desde sus primeros descubrimientos hasta su muerte bajo arresto domiciliario.",
    "El debate astronómico del siglo XVII entre los defensores del modelo geocéntrico y el modelo heliocéntrico del universo.",
    "El enfrentamiento histórico entre la ciencia emergente, representada por Galileo, y el poder dogmático de la Iglesia Católica en el siglo XVII.",
    "La influencia del telescopio en la revolución científica del siglo XVII y los descubrimientos astronómicos que transformaron la comprensión del universo.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "El enfrentamiento histórico entre la ciencia emergente, representada por Galileo, y el poder dogmático de la Iglesia Católica en el siglo XVII.",
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
    "La importancia del telescopio como herramienta revolucionaria en la astronomía del siglo XVII.",
    "El papel de Nicolás Copérnico y su formulación previa de la teoría heliocéntrica.",
    "La tensión entre la observación empírica y la autoridad doctrinal como motor del conflicto.",
    "Las consecuencias personales que sufrió Galileo a raíz de su confrontación con la Inquisición.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La tensión entre la observación empírica y la autoridad doctrinal como motor del conflicto.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Cuál fue la consecuencia directa de que Galileo publicara sus ideas en italiano en lugar de latín?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Sus descubrimientos fueron inmediatamente traducidos y ampliamente aceptados por la comunidad científica internacional, consolidando rápidamente el modelo heliocéntrico.",
    "La Inquisición tuvo dificultades para comprender sus argumentos, lo que retrasó su citación a Roma y le dio más tiempo para seguir investigando.",
    "Sus ideas se difundieron más rápidamente entre el público general, generando tanto apoyo como una fuerte oposición por parte de quienes defendían la visión tradicional.",
    "Esto le valió el reconocimiento y el apoyo financiero de la nobleza italiana, permitiéndole construir telescopios más potentes y realizar descubrimientos aún más significativos.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Sus ideas se difundieron más rápidamente entre el público general, generando tanto apoyo como una fuerte oposición por parte de quienes defendían la visión tradicional.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué diferencia fundamental se presenta entre el pensamiento científico de Galileo y la postura de la Iglesia?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Galileo se basaba en cálculos matemáticos complejos, mientras que la Iglesia prefería interpretaciones filosóficas abstractas.",
    "El pensamiento de Galileo priorizaba la observación empírica y la evidencia como base para la comprensión del universo, en contraste con la Iglesia, que se fundamentaba en la autoridad de la doctrina religiosa y las escrituras.",
    "Galileo buscaba el apoyo de la nobleza y los gobernantes para difundir sus ideas, mientras que la Iglesia dependía del consenso popular y la tradición.",
    "El método de Galileo era inherentemente revolucionario y buscaba derrocar el orden social establecido, a diferencia de la Iglesia, que promovía la estabilidad y la continuidad del conocimiento.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "El pensamiento de Galileo priorizaba la observación empírica y la evidencia como base para la comprensión del universo, en contraste con la Iglesia, que se fundamentaba en la autoridad de la doctrina religiosa y las escrituras.",
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
    "El juicio de Galileo ejemplifica cómo el poder institucional, en este caso la Iglesia, puede entrar en conflicto con el avance del conocimiento científico cuando este desafía las creencias establecidas.",
    "Galileo, impulsado por su fe en la razón y la evidencia empírica, consideraba su deber difundir sus descubrimientos a pesar de la oposición de las autoridades religiosas.",
    "El conflicto entre Galileo y la Iglesia fue fundamentalmente un desacuerdo sobre la interpretación de las Escrituras y la ubicación de la Tierra en el universo, sin implicaciones mayores sobre la libertad de pensamiento.",
    "A pesar de la condena, la obra de Galileo fue rápidamente adoptada por la jerarquía eclesiástica, que vio en sus descubrimientos una nueva forma de comprender la grandeza de la creación divina.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El juicio de Galileo ejemplifica cómo el poder institucional, en este caso la Iglesia, puede entrar en conflicto con el avance del conocimiento científico cuando este desafía las creencias establecidas.",
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
      resumenTexto: `En el siglo XVII, Galileo Galilei desafió la visión geocéntrica de la Iglesia al presentar pruebas telescópicas a favor del heliocentrismo, difundiendo sus ideas en italiano. Esto lo llevó a ser juzgado por la Inquisición en 1633, donde fue obligado a abjurar de sus creencias bajo amenaza y condenado a arresto domiciliario. A pesar de su retractación forzada, la leyenda de su "Eppur si muove" simboliza la tensión entre razón y poder. Su caso perdura como un recordatorio del conflicto entre la verdad científica y las estructuras de autoridad, y la importancia de la libertad de pensamiento frente a las certezas establecidas.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `La lucha histórica entre el avance del conocimiento científico, representado por Galileo Galilei, y el poder dogmático de la Iglesia Católica, ejemplificando la tensión entre la razón y la autoridad en la búsqueda de la verdad.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Galileo Galilei",
        "siglo XVII",
        "heliocentrismo",
        "geocentrismo",
        "telescopio",
        "Iglesia Católica",
        "Inquisición",
        "juicio",
        "abjurar",
        "Eppur si muove",
        "ciencia",
        "poder",
        "verdad",
        "autoridad",
        "libertad de pensamiento",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
