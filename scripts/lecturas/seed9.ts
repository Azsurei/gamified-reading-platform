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
        "¿Debe el anime ocupar un lugar legítimo dentro del arte contemporáneo?",
      descripcion:
        "Este texto plantea que el anime, más allá de ser entretenimiento, debe ser reconocido como una forma legítima de arte contemporáneo.",
      imagen: "/anime.svg",
      categoria: "Arte",
      tipoTexto: "argumentativo",
      contenido: `Durante décadas, el anime ha sido relegado al ámbito del entretenimiento popular, asociado frecuentemente con la infancia o con nichos específicos de fanáticos. No obstante, en los últimos años, esta percepción ha empezado a cambiar. Gracias a su creciente proyección internacional, su riqueza visual y narrativa, y su capacidad de representar temas universales desde una óptica culturalmente diversa, el anime merece ser considerado una manifestación artística legítima dentro del arte contemporáneo.

A nivel estético, el anime ha desarrollado un lenguaje visual propio, con códigos estilísticos fácilmente reconocibles pero a la vez flexibles. Series como Violet Evergarden o Made in Abyss combinan ilustraciones detalladas con composiciones cinematográficas y uso simbólico del color. Estas producciones demuestran que la animación japonesa no se limita a entretener, sino que también busca conmover, cuestionar y transformar la mirada del espectador. En este sentido, el anime no solo transmite una historia, sino también una propuesta visual que puede ser analizada con los mismos criterios que una pintura, una escultura o una instalación artística.

Además, el anime se destaca por su capacidad para abordar temas filosóficos, sociales y psicológicos complejos. Producciones como Neon Genesis Evangelion exploran el existencialismo y los traumas humanos desde una perspectiva simbólica; Monster plantea debates éticos sobre la justicia, el mal y la moral; mientras que A Silent Voice se adentra en el bullying, la discapacidad y el perdón. Estos contenidos, lejos de ser banales, demandan una lectura crítica por parte del espectador y contribuyen a discusiones relevantes en el mundo actual.

Sin embargo, aún existe cierta resistencia desde algunos sectores académicos y artísticos a considerar el anime como “arte”. Esta postura se basa muchas veces en prejuicios respecto a la animación como medio, o en una visión occidentalista del arte que excluye expresiones nacidas fuera del canon europeo tradicional. No se trata solo de un problema de reconocimiento estético, sino de una cuestión de legitimación cultural: ¿por qué ciertas formas de arte gozan de prestigio mientras otras, igual de significativas, son consideradas menores?

Frente a esto, reivindicar el valor artístico del anime es también ampliar la definición misma de arte. No todo arte debe ser elitista o distante del público joven. El arte puede ser masivo, accesible, narrativo y aún así tener profundidad. El anime, con su diversidad de géneros, su innovación técnica y su diálogo constante con la sociedad, se convierte en un espejo del mundo contemporáneo y un vehículo potente de reflexión estética.

En definitiva, el anime no debería medirse únicamente por su popularidad o formato. Su valor como arte radica en su capacidad de emocionar, provocar, hacer pensar y representar realidades desde perspectivas originales. Reconocerlo como parte del arte contemporáneo no solo es necesario, sino justo en un mundo donde las fronteras entre lo “culto” y lo “popular” se vuelven cada vez más difusas.`,
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
    "El texto inicia afirmando que el anime siempre ha sido reconocido internacionalmente por su capacidad de trascender el entretenimiento popular, aunque a menudo se lo asocie con nichos específicos.",
    "Se establece explícitamente que la percepción sobre el anime ha comenzado a cambiar debido a su creciente alcance global, la riqueza de su propuesta visual y narrativa, y su habilidad para abordar temas universales desde una perspectiva culturalmente distintiva.",
    "La lectura detalla cómo el anime, a pesar de sus virtudes estéticas, se ha mantenido mayormente como un medio exclusivo para el público infantil, incapaz de explorar tramas que demanden una lectura crítica de temas complejos.",
    "El texto presenta a 'Neon Genesis Evangelion' como un ejemplo de serie de anime que, a pesar de su popularidad, ha sido objeto de críticas por su superficialidad filosófica y su énfasis excesivo en el espectáculo visual.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Se establece explícitamente que la percepción sobre el anime ha comenzado a cambiar debido a su creciente alcance global, la riqueza de su propuesta visual y narrativa, y su habilidad para abordar temas universales desde una perspectiva culturalmente distintiva.",
    }))
  );

  // === Pregunta 2 ===
  const [preguntaSeleccion2] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 1,
      enunciado:
        "¿Cuál de estas opciones aporta información complementaria que amplía lo expuesto en el texto, funcionando como una continuación lógica de su argumento final sobre el reconocimiento del anime como arte?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Fácil",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas2 = [
    "El desarrollo de nuevas técnicas de animación digital en 3D está impulsando una ola de producciones anime con calidad cinematográfica, atrayendo a una audiencia global cada vez más diversa.",
    "La inclusión del anime en retrospectivas de museos de arte moderno y en el currículo de prestigiosas escuelas de cine valida su estatus artístico y su influencia en la cultura visual contemporánea.",
    "La creciente popularidad de las convenciones de anime y manga a nivel mundial demuestra el enorme impacto económico y social de la cultura otaku, más allá de consideraciones puramente estéticas.",
    "A pesar de su reconocimiento creciente, el anime aún enfrenta desafíos significativos en la industria, como la precarización laboral de los animadores y la excesiva dependencia de los comités de producción.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        "La inclusión del anime en retrospectivas de museos de arte moderno y en el currículo de prestigiosas escuelas de cine valida su estatus artístico y su influencia en la cultura visual contemporánea.",
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
    "Un análisis de la evolución histórica del anime, desde sus orígenes hasta las tendencias actuales de producción y su impacto en el mercado global.",
    "La argumentación sobre la legitimidad del anime como una forma de arte contemporáneo, destacando sus cualidades estéticas y narrativas frente a los prejuicios existentes.",
    "La exploración de la influencia cultural del anime y su capacidad para generar comunidades de fans globales, reflejando nuevas formas de consumo de entretenimiento.",
    "Un debate sobre las diferencias técnicas y narrativas entre el anime y la animación occidental, evaluando cuál de los dos posee mayor complejidad artística.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "La argumentación sobre la legitimidad del anime como una forma de arte contemporáneo, destacando sus cualidades estéticas y narrativas frente a los prejuicios existentes.",
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
    "El impacto económico y la creciente globalización de la industria del anime, lo que ha llevado a un aumento significativo en la inversión extranjera y en la diversificación de sus géneros.",
    "El detallado contraste entre las técnicas de animación tradicionales japonesas y los métodos modernos de producción digital que potencian la expresividad visual del anime.",
    "La influencia recíproca entre el anime y los videojuegos contemporáneos, evidenciando cómo ambos medios adoptan recursos narrativos y estéticos para ampliar sus audiencias.",
    "La capacidad del anime para explorar profundamente dilemas existenciales, sociales y psicológicos complejos, ilustrando cómo estas narrativas invitan a una lectura crítica y a la reflexión del público.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "La capacidad del anime para explorar profundamente dilemas existenciales, sociales y psicológicos complejos, ilustrando cómo estas narrativas invitan a una lectura crítica y a la reflexión del público.",
    }))
  );

  // === Pregunta 5 ===
  const [preguntaSeleccion5] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        "A partir de la argumentación del texto sobre el lenguaje visual propio del anime y su capacidad de conmover, ¿qué se puede deducir sobre la relación entre la estética particular del anime y su universalidad temática?",
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas5 = [
    "El texto implica que la estética única del anime, al ser tan específica de la cultura japonesa, limita su capacidad para que sus temas universales sean comprendidos por audiencias globales sin un conocimiento previo.",
    "Se deduce que la particularidad estilística del anime, lejos de ser una barrera, es un vehículo eficaz que potencia la expresión de temas universales, permitiendo que estos resuenen emocionalmente más allá de las fronteras culturales.",
    "La lectura sugiere que la universalidad de los temas tratados en el anime es independiente de su estilo visual; por lo tanto, la estética es un factor secundario en su impacto emocional y mensaje.",
    "El texto establece que, para lograr conmover con temas universales, el anime debe adoptar progresivamente estilos visuales más occidentales, sacrificando su estética propia en aras de la comprensión global.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que la particularidad estilística del anime, lejos de ser una barrera, es un vehículo eficaz que potencia la expresión de temas universales, permitiendo que estos resuenen emocionalmente más allá de las fronteras culturales.",
    }))
  );

  // === Pregunta 6 ===
  const [preguntaSeleccion6] = await db
    .insert(schema.pregunta)
    .values({
      lecturaId,
      desempenoId: 3,
      enunciado:
        'Considerando la resistencia académica y artística a reconocer el anime como arte, y el argumento del texto sobre "ampliar la definición misma de arte", ¿qué se puede deducir sobre la postura del autor respecto a los criterios tradicionales del arte?',
      tipo: "seleccion",
      tipoCorreccion: "objetivo",
      nivelDificultad: "Media",
    })
    .returning({ id: schema.pregunta.id });

  const alternativas6 = [
    "El autor sugiere que el reconocimiento del anime implica el abandono de todos los criterios estéticos tradicionales, defendiendo un arte puramente subjetivo y sin cánones preestablecidos.",
    "El texto implica que la resistencia al anime como arte proviene de una falta de comprensión de su técnica, y que la solución es educar a los académicos sobre los métodos de producción específicos de la animación japonesa.",
    "Se deduce que la postura del texto es que los criterios tradicionales del arte son insuficientes o demasiado restrictivos para abarcar la diversidad de expresiones contemporáneas como el anime, abogando por una definición más inclusiva y flexible.",
    "La lectura infiere que el anime, para ser aceptado como arte, debe primero demostrar su adherencia a los cánones estéticos occidentales, superando así los prejuicios culturales arraigados en la academia.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "Se deduce que la postura del texto es que los criterios tradicionales del arte son insuficientes o demasiado restrictivos para abarcar la diversidad de expresiones contemporáneas como el anime, abogando por una definición más inclusiva y flexible.",
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
    "El texto sostiene que, a pesar de su innegable atractivo y vasta popularidad global, el anime se mantiene fundamentalmente como un producto de entretenimiento masivo, incapaz de alcanzar la profundidad estética y la trascendencia emocional propias del arte tradicional.",
    "La lectura concluye que, si bien una minoría de obras de anime exhiben cualidades artísticas notables, la gran mayoría de la producción no cumple con los rigurosos estándares estéticos requeridos para ser considerada arte, principalmente debido a su orientación comercial y a las limitaciones técnicas inherentes a la animación.",
    "El punto de vista central del texto es que la discusión sobre si el anime es arte es inherentemente subjetiva, dependiendo más de la afinidad generacional y el gusto personal que de criterios objetivos o comparables a los empleados para evaluar otras expresiones artísticas.",
    "Se argumenta que el anime, superando las percepciones iniciales y objeciones convencionales, ha demostrado su validez artística al integrar una propuesta visual y narrativa sofisticada con la capacidad de explorar temas universales y provocar emociones complejas, equiparándolo a otras formas de arte.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "Se argumenta que el anime, superando las percepciones iniciales y objeciones convencionales, ha demostrado su validez artística al integrar una propuesta visual y narrativa sofisticada con la capacidad de explorar temas universales y provocar emociones complejas, equiparándolo a otras formas de arte.",
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
      resumenTexto: `El anime merece ser reconocido como una forma de arte contemporáneo a pesar de haber sido relegado históricamente a mero entretenimiento. El autor defiende esta postura destacando la riqueza visual y narrativa del anime, su capacidad para abordar temas universales complejos y su potencial para conmover y transformar la mirada del espectador. Se señala que la resistencia a este reconocimiento se basa en prejuicios y una visión tradicional y occidentalista del arte, y se concluye que aceptar el anime como arte significa ampliar la definición misma de arte, haciendo justicia a una expresión cultural masiva y profunda en el mundo actual.

`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 2, // Asumimos que 2 es idea principal
      ideaPrincipal: `El anime debe ser reconocido como una forma legítima de arte contemporáneo debido a su rica propuesta estética y narrativa y su capacidad para explorar temas profundos y universales, lo que requiere superar prejuicios y expandir la definición tradicional de arte.`,
    },
    {
      lecturaId: lecturaId,
      tipoComodinId: 3, // Asumimos que 3 es palabras clave
      palabrasClave: [
        "anime",
        "arte contemporáneo",
        "legitimidad",
        "estética",
        "narrativa",
        "temas universales",
        "prejuicios",
        "reconocimiento cultural",
        "definición de arte",
        "popularidad",
      ],
    },
  ]);

  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
