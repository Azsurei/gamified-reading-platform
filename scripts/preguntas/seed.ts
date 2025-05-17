import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // Ajusta la ruta a tu archivo de schemas

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { schema } });

async function seed() {
  // 1. Borrar preguntas y alternativas para evitar duplicados
  await db.delete(schema.alternativa);
  await db.delete(schema.pregunta);

  const lecturaId = 2;

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
    "Marte tiene una atmósfera rica en oxígeno, lo que permite la vida humana.",
    "El suelo marciano es completamente estéril y sin rastros geológicos.",
    "Los científicos han descubierto rastros de antiguos cauces de ríos en Marte.",
    "Las condiciones en Marte son similares a las de la Tierra, lo que permite asentamientos sin protección.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Los científicos han descubierto rastros de antiguos cauces de ríos en Marte.",
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
    "La atmósfera de Marte contiene gases que impiden la formación de hielo.",
    "Existen proyectos que investigan la posibilidad de enviar humanos a Marte en las próximas décadas.",
    "Marte se formó hace más de 10 mil millones de años, antes que el Sol.",
    "Marte es el único planeta con dos lunas visibles a simple vista desde la Tierra.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Existen proyectos que investigan la posibilidad de enviar humanos a Marte en las próximas décadas.",
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
    "Los avances tecnológicos que permitirán establecer colonias permanentes en Marte.",
    "Las condiciones climáticas que han impedido la exploración tripulada de Marte.",
    "Las características de Marte y el debate sobre su colonización.",
    "El proceso de formación de los planetas del sistema solar, con énfasis en Marte.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "Las características de Marte y el debate sobre su colonización.",
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
    "El contraste entre los intentos fallidos de misiones humanas a Marte y los éxitos de sondas robóticas.",
    "La hipótesis de que Marte tuvo océanos similares a los de la Tierra hace millones de años.",
    "El debate sobre si deberíamos colonizar Marte o centrarnos en resolver los problemas de la Tierra.",
    "Las teorías más aceptadas sobre la existencia de vida inteligente en Marte.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "El debate sobre si deberíamos colonizar Marte o centrarnos en resolver los problemas de la Tierra.",
    }))
  );

    // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación existe entre la presencia de antiguos cauces de ríos en Marte y la posibilidad de vida en el pasado?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "Indican que el planeta aún tiene grandes océanos subterráneos.",
    "Sugieren que en el pasado existieron condiciones que pudieron permitir la vida microbiana.",
    "Prueban que los humanos ya vivieron en Marte hace millones de años.",
    "Muestran que el clima marciano siempre ha sido estable y templado.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Sugieren que en el pasado existieron condiciones que pudieron permitir la vida microbiana.",
    }))
  );

    // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué comparación implícita se establece en el texto entre Marte y la Tierra?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "Ambas tienen una atmósfera rica en nitrógeno y oxígeno.",
    "Marte tiene una superficie más cálida y fértil que la Tierra.",
    "Mientras algunos quieren colonizar Marte, otros creen que deberíamos resolver primero los problemas de la Tierra.",
    "Marte es considerado más adecuado para la vida que la Tierra en su estado actual.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Mientras algunos quieren colonizar Marte, otros creen que deberíamos resolver primero los problemas de la Tierra.",
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
    "Algunos científicos afirman que deberíamos enfocarnos en estudiar la Luna antes que Marte.",
    "Existen posturas que sugieren que colonizar Marte podría ser un escape irresponsable ante los problemas de la Tierra.",
    "Algunos expertos creen que colonizar Marte podría asegurar la supervivencia de la humanidad.",
    "Muchos científicos creen que Marte ya no es relevante para la investigación astronómica.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "Algunos expertos creen que colonizar Marte podría asegurar la supervivencia de la humanidad.",
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
    enunciado:
      "¿Recomendarías este texto a otra persona? ¿Por qué?",
    tipo: "completar",
    tipoCorreccion: "subjetivo",
    nivelDificultad: "Difícil",
  });

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
