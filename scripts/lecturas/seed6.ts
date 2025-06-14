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
        "¿Es justo el destino de Edipo? Una mirada crítica a la tragedia griega",
      descripcion:
        "Este texto analiza la tragedia griega Edipo Rey, cuestionando si el castigo que sufre el protagonista es justo.",
      imagen: "/edipo.svg",
      categoria: "Literatura clásica",
      tipoTexto: "argumentativo",
      contenido: `En la tragedia griega Edipo Rey, escrita por Sófocles, el protagonista se enfrenta a un destino terrible: sin saberlo, mata a su padre y se casa con su madre, cumpliendo así una profecía que intentó evitar desde su nacimiento. Muchos consideran esta historia como un ejemplo claro del poder inescapable del destino. Sin embargo, ¿es justo culpar a Edipo por lo que ocurrió? En este texto, se argumenta que Edipo no merece la condena que sufre, ya que actuó siempre guiado por la ignorancia, la buena intención y el deseo de proteger a su pueblo.

En primer lugar, Edipo no conocía su verdadera identidad cuando cometió los actos por los que fue castigado. Fue adoptado desde niño por otros reyes y criado lejos de sus padres biológicos, precisamente para evitar que la profecía se cumpliera. Cuando se entera del oráculo que predice que matará a su padre y se casará con su madre, decide abandonar su hogar adoptivo para protegerlos. Este acto demuestra su intención de hacer el bien, no el mal.

Además, Edipo no solo era un gobernante justo, sino también un líder que se preocupaba por su pueblo. Cuando Tebas sufre una peste, él se compromete a encontrar la causa, sin saber que al final descubriría su propia culpa. La búsqueda de la verdad lo lleva a investigar sin descanso, a pesar de que muchos le advierten que deje el asunto. Edipo insiste porque cree que como rey tiene el deber de actuar con justicia, incluso si eso lo pone en peligro.

Finalmente, el castigo que Edipo recibe es extremadamente severo: se arranca los ojos y se exilia, una vida de sufrimiento físico y emocional. Pero este castigo no es resultado de una mala elección moral, sino de un destino impuesto por los dioses desde antes de su nacimiento. Esto plantea una gran pregunta ética: ¿puede considerarse culpable alguien que actúa sin intención de hacer daño? En este caso, parece más bien una víctima de una voluntad divina incontrolable.

Por todo esto, se puede concluir que el destino de Edipo, aunque trágico, no es justo. Su historia nos invita a reflexionar sobre el poder del destino en la literatura clásica, pero también sobre temas universales como la responsabilidad, la culpa y la justicia. Edipo no fue culpable por elección, sino por circunstancia, y eso hace que su castigo sea más conmovedor que merecido.`,
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
    "La tragedia de Edipo es un ejemplo del poder de los dioses sobre la humanidad, donde el libre albedrío del protagonista es completamente inexistente en todo momento.",
    "El texto argumenta que Edipo no merece su condena porque actuó bajo ignorancia, con buena intención y por el bienestar de su pueblo.",
    "Edipo era consciente de que mataría a su padre biológico al salir de su hogar adoptivo, pero decidió hacerlo por el bien mayor de la ciudad de Tebas.",
    "Sófocles, el autor de Edipo Rey, fue un filósofo griego que creía firmemente en la justicia de las profecías divinas y el castigo inevitable.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "El texto argumenta que Edipo no merece su condena porque actuó bajo ignorancia, con buena intención y por el bienestar de su pueblo.",
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
    "La universalidad de estos dilemas morales y éticos, presentados en Edipo, sigue resonando en debates contemporáneos sobre la justicia legal y la responsabilidad individual en sistemas complejos.",
    "Historiadores del teatro griego han documentado que las obras de Sófocles a menudo incluían complejas coreografías y música, elementos que potenciaban el impacto emocional de las tragedias.",
    "El desarrollo de la imprenta en el Renacimiento fue crucial para la difusión de textos clásicos como Edipo Rey, permitiendo que su estudio llegara a un público más amplio fuera de las élites.",
    "Estudios recientes en lingüística demuestran la influencia del griego antiguo en la formación de numerosos conceptos y palabras en las lenguas romances modernas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "La universalidad de estos dilemas morales y éticos, presentados en Edipo, sigue resonando en debates contemporáneos sobre la justicia legal y la responsabilidad individual en sistemas complejos.",
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
    "La descripción detallada de la trama de Edipo Rey y el resumen de los eventos principales de la tragedia griega.",
    "Un análisis de la influencia de las profecías y los oráculos en la vida de los personajes en la literatura clásica griega.",
    "La argumentación crítica sobre la injusticia del destino de Edipo, al considerarlo una víctima de circunstancias más que un culpable por elección.",
    "La importancia del coro en las tragedias griegas como elemento narrativo y su función en la expresión de la moralidad.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La argumentación crítica sobre la injusticia del destino de Edipo, al considerarlo una víctima de circunstancias más que un culpable por elección.",
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
    "La crítica al concepto de la predestinación divina en las creencias de la antigua Grecia y su impacto en la moral humana.",
    "La demostración de la buena intención y la ignorancia de Edipo en sus acciones como atenuantes de su culpabilidad.",
    "El análisis de la estructura dramática de la tragedia griega clásica y el papel del coro en el desarrollo de la trama.",
    "La influencia de la figura de Edipo en la psicología moderna, particularmente en el desarrollo de teorías sobre el subconsciente.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La demostración de la buena intención y la ignorancia de Edipo en sus acciones como atenuantes de su culpabilidad.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Cuál es la relación entre el desconocimiento de Edipo sobre su origen y el castigo que recibe al final de la historia?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "El desconocimiento de Edipo es directamente la causa de sus acciones prohibidas, lo que, al revelarse, lo lleva a un castigo severo que el texto considera inmerecido dado su falta de intención.",
    "La falta de información de Edipo sobre su pasado le permite actuar con libre albedrío, por lo que su castigo final es justo y proporcional a sus crímenes conscientes.",
    "El texto sugiere que el desconocimiento de Edipo es irrelevante para su destino, ya que el castigo estaba predestinado y ocurriría sin importar sus acciones o su nivel de conciencia.",
    "El desconocimiento de Edipo funciona como una excusa moral que evita cualquier tipo de castigo, lo que lo diferencia de otros héroes trágicos que sufren por sus errores intencionales.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "El desconocimiento de Edipo es directamente la causa de sus acciones prohibidas, lo que, al revelarse, lo lleva a un castigo severo que el texto considera inmerecido dado su falta de intención.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "¿Qué diferencia fundamental establece el texto entre la culpabilidad moral de Edipo y la idea tradicional de culpa por una elección intencional?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "La diferencia radica en que Edipo es culpable por una falla de carácter (hybris), a diferencia de otros héroes que son castigados por decisiones conscientes.",
    "El texto diferencia que Edipo es culpable por circunstancias ajenas a su voluntad, a diferencia de la culpa que surge de una decisión libre y con conocimiento de sus consecuencias.",
    "La principal diferencia es que Edipo es castigado por los dioses por su falta de fe, mientras que la culpa humana se relaciona con acciones maliciosas.",
    "No hay una diferencia significativa, ya que el texto considera que Edipo, al igual que cualquier otro criminal, es plenamente responsable de sus actos sin importar su ignorancia.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "El texto diferencia que Edipo es culpable por circunstancias ajenas a su voluntad, a diferencia de la culpa que surge de una decisión libre y con conocimiento de sus consecuencias.",
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
    "La tragedia de Edipo Rey demuestra que, por más que los humanos intenten evadirlo, el destino impuesto por los dioses siempre prevalecerá, haciendo inútil cualquier resistencia.",
    "El texto argumenta que Edipo, a pesar de sus acciones trágicas, no es moralmente culpable, ya que actuó sin conocimiento y con buenas intenciones, siendo una víctima de las circunstancias.",
    "La historia de Edipo es un ejemplo de cómo los reyes de la antigua Grecia usaban las profecías como excusa para justificar sus errores y ejercer un control absoluto sobre sus súbditos.",
    "Según el texto, la verdadera justicia en la tragedia griega reside en la inevitable revelación de la verdad, sin importar las intenciones de los personajes involucrados.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El texto argumenta que Edipo, a pesar de sus acciones trágicas, no es moralmente culpable, ya que actuó sin conocimiento y con buenas intenciones, siendo una víctima de las circunstancias.",
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
      resumenTexto: `El texto argumenta que el trágico destino de Edipo, quien sin saberlo mata a su padre y se casa con su madre, es injusto y no merecido. Se defiende que Edipo actuó siempre desde la ignorancia, con buenas intenciones y preocupado por el bienestar de su pueblo, buscando la verdad como líder. El autor concluye que el severo castigo que recibe (cegarse y exiliarse) no es resultado de una elección moral reprobable, sino de un destino divino incontrolable. Por tanto, Edipo es presentado como una víctima de las circunstancias más que un culpable por elección, invitando a la reflexión sobre la responsabilidad, la culpa y la justicia en la literatura clásica.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El destino de Edipo, marcado por la tragedia de matar a su padre y casarse con su madre, es injusto según el texto, ya que el protagonista actuó siempre guiado por la ignorancia y buenas intenciones, convirtiéndose en una víctima de las circunstancias más que en un culpable por elección.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "Edipo",
        "tragedia griega",
        "Sófocles",
        "destino",
        "profecía",
        "ignorancia",
        "buenas intenciones",
        "culpa",
        "justicia",
        "castigo",
        "responsabilidad",
        "víctima",
        "circunstancia",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
