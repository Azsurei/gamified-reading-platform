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
      titulo: "El cambio climático: una urgencia científica y humana",
      descripcion:
        "Este texto aborda el cambio climático desde un enfoque científico, explicando sus causas, consecuencias y la responsabilidad humana en su aceleración.",
      imagen: "/clima.svg",
      categoria: "Ciencia",
      tipoTexto: "argumentativo",
      contenido: `El cambio climático ya no es una predicción futura: es una realidad observable. Aumentos en la temperatura global, derretimiento de glaciares, olas de calor más frecuentes y fenómenos meteorológicos extremos son señales claras de un planeta que está cambiando. Aunque algunos todavía dudan de su gravedad o sus causas, la ciencia ha demostrado con evidencia contundente que este fenómeno está relacionado directamente con la actividad humana, especialmente con la emisión de gases de efecto invernadero.

Desde el siglo XIX, la quema de combustibles fósiles como el petróleo, el gas y el carbón ha liberado grandes cantidades de dióxido de carbono (CO₂) y otros gases que atrapan el calor en la atmósfera. Este efecto, conocido como “efecto invernadero”, es natural y necesario para la vida, pero en exceso está provocando un calentamiento acelerado. Según la NASA y el Panel Intergubernamental sobre Cambio Climático (IPCC), si no se toman medidas urgentes, podríamos enfrentar consecuencias irreversibles: aumento del nivel del mar, desaparición de especies, migraciones masivas y crisis alimentarias.

Algunos argumentan que los cambios climáticos han ocurrido siempre en la historia de la Tierra. Esto es cierto, pero la diferencia está en la velocidad y origen del cambio actual. Nunca antes en la historia reciente se había producido un aumento tan rápido de la temperatura global, y nunca antes había estado tan claramente vinculado a nuestras decisiones económicas, tecnológicas y de consumo.

Otros sostienen que cambiar el modelo actual de producción es costoso o inviable. Sin embargo, numerosos estudios muestran que las consecuencias de no actuar serían mucho más caras a largo plazo. Invertir en energías limpias, transporte sostenible y políticas de reducción de emisiones no solo ayudaría al planeta, sino que también generaría empleo, innovación y mejor calidad de vida.

Frente a esta evidencia, el argumento científico es claro: el cambio climático es real, es causado por el ser humano, y podemos (y debemos) actuar para frenarlo. Ignorar este problema no lo hará desaparecer; enfrentarlo con información, compromiso y responsabilidad puede marcar la diferencia.`,
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
    "El texto sugiere que los científicos aún están debatiendo si la actividad humana es la principal causa del aumento actual de la temperatura global.",
    "Según el texto, el calentamiento global es un fenómeno nuevo y sin precedentes en la historia geológica de la Tierra.",
    "Las consecuencias del cambio climático, si no se actua con urgencia, podrían incluir fenómenos como el aumento del nivel del mar y la pérdida de especies, lo que podría conducir a crisis a largo plazo.",
    "La única diferencia significativa entre los cambios climáticos pasados y el actual es la velocidad con la que está ocurriendo, según lo indicado por el texto.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Las consecuencias del cambio climático, si no se actua con urgencia, podrían incluir fenómenos como el aumento del nivel del mar y la pérdida de especies, lo que podría conducir a crisis a largo plazo.",
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
    "Además de los gases de efecto invernadero, la deforestación a gran escala contribuye significativamente al cambio climático al reducir la capacidad del planeta para absorber dióxido de carbono.",
    "La teoría del cambio climático fue inicialmente propuesta por científicos en la antigua Grecia, quienes ya observaban patrones de alteración en el clima de la Tierra.",
    "Los vehículos eléctricos, aunque prometedores, generan una huella de carbono considerable debido a la extracción y producción de sus baterías de litio.",
    "Las negociaciones internacionales sobre el clima han avanzado poco en las últimas décadas, debido a la falta de consenso entre las principales potencias económicas mundiales.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "Además de los gases de efecto invernadero, la deforestación a gran escala contribuye significativamente al cambio climático al reducir la capacidad del planeta para absorber dióxido de carbono.",
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
    "La historia de la Tierra y los ciclos naturales de calentamiento y enfriamiento a lo largo de millones de años.",
    "Las consecuencias económicas y sociales de la inacción frente al cambio climático, incluyendo los costos de la inversión en energías limpias.",
    "La contundente evidencia científica que demuestra que el cambio climático actual es real, está causado por la actividad humana y requiere una acción urgente y responsable.",
    "Un debate sobre las diferentes opiniones y posturas políticas respecto a la existencia y gravedad del calentamiento global.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La contundente evidencia científica que demuestra que el cambio climático actual es real, está causado por la actividad humana y requiere una acción urgente y responsable.",
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
    "La comparación de la velocidad y el origen del cambio climático actual con los cambios históricos de la Tierra.",
    "Las complejidades de la implementación de acuerdos internacionales para la reducción de emisiones de carbono.",
    "La historia de la investigación científica sobre el efecto invernadero desde sus primeros descubrimientos.",
    "El desarrollo de nuevas tecnologías de captura de carbono como una solución a gran escala para revertir el calentamiento global.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La comparación de la velocidad y el origen del cambio climático actual con los cambios históricos de la Tierra.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué relación existe entre las actividades humanas y el aumento del efecto invernadero, según el texto?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "El texto indica que el aumento del efecto invernadero se debe principalmente a un ciclo natural de la Tierra que coincide con la era industrial, sin que la actividad humana sea la causa primordial.",
    "Las actividades humanas, a través de la quema de combustibles fósiles, han liberado gases como el dióxido de carbono en cantidades que, al acumularse, amplifican el efecto invernadero, lo que se ha traducido en un calentamiento global acelerado.",
    "La principal relación es que el esfuerzo humano por modernizarse y desarrollar nuevas tecnologías energéticas ha, de manera paradójica, provocado un efecto invernadero más intenso.",
    "El texto sugiere que, aunque la actividad humana contribuye al efecto invernadero, su impacto es menor en comparación con las emisiones volcánicas y otras fuentes naturales.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Las actividades humanas, a través de la quema de combustibles fósiles, han liberado gases como el dióxido de carbono en cantidades que, al acumularse, amplifican el efecto invernadero, lo que se ha traducido en un calentamiento global acelerado.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué semejanza y qué diferencia fundamental se establecen en el texto entre los cambios climáticos ocurridos a lo largo de la historia de la Tierra y el cambio climático actual?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "La semejanza es que ambos son fenómenos naturales e inevitables, pero la diferencia es que el cambio actual es más lento de lo que se pensaba inicialmente.",
    "Se asemejan en que ambos alteran la temperatura global, pero se diferencian crucialmente en la velocidad de su ocurrencia y en su origen, que ahora está vinculado a la actividad humana.",
    "Ambos tipos de cambios tienen como causa principal las erupciones volcánicas, pero se diferencian en la magnitud de los efectos que producen en la biodiversidad.",
    "La semejanza es que ninguno de los cambios pasados fue causado por la actividad humana, y la diferencia es que el cambio actual es el único que ha provocado el derretimiento de glaciares.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Se asemejan en que ambos alteran la temperatura global, pero se diferencian crucialmente en la velocidad de su ocurrencia y en su origen, que ahora está vinculado a la actividad humana.",
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
    "La preocupación por el cambio climático es una exageración, ya que los ciclos naturales del planeta siempre han generado variaciones de temperatura sin intervención humana.",
    "La comunidad científica aún no ha llegado a un consenso claro sobre la verdadera causa del calentamiento global observado en las últimas décadas.",
    "Frenar el cambio climático es una tarea inviable debido a los altos costos económicos y la imposibilidad de modificar el modelo de producción global actual.",
    "El texto sostiene que el cambio climático actual es una realidad urgente, causada por la actividad humana y respaldada por evidencia científica, que exige una acción decidida y responsable.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto sostiene que el cambio climático actual es una realidad urgente, causada por la actividad humana y respaldada por evidencia científica, que exige una acción decidida y responsable.",
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
      resumenTexto: `El cambio climático es una realidad actual y observable, que se manifiesta en el aumento de temperaturas globales, el derretimiento de glaciares y fenómenos meteorológicos extremos. La ciencia ha demostrado contundentemente que este fenómeno está directamente relacionado con la actividad humana, principalmente por la emisión excesiva de gases de efecto invernadero debido a la quema de combustibles fósiles desde el siglo XIX. Aunque los cambios climáticos son naturales en la historia de la Tierra, la diferencia crucial del actual radica en su velocidad sin precedentes y su origen antropogénico. Además, el texto refuta la idea de que actuar es inviable, argumentando que las consecuencias de no hacerlo serían mucho más costosas a largo plazo. Por todo esto, se enfatiza que es una urgencia que requiere acción decidida y responsable, basada en la información y el compromiso.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El cambio climático actual es una urgencia real y observable, inequívocamente causada por la actividad humana y respaldada por una contundente evidencia científica, lo que demanda una acción inmediata y responsable para mitigar sus consecuencias.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "cambio climático",
        "calentamiento global",
        "actividad humana",
        "gases efecto invernadero",
        "combustibles fósiles",
        "temperatura global",
        "glaciares",
        "fenómenos extremos",
        "evidencia científica",
        "acción urgente",
        "responsabilidad",
        "consecuencias",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
