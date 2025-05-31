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
      titulo: "El laberinto, el hilo y la promesa: el mito de Ariadna",
      descripcion:
        "Texto sobre el mito de Ariadna y su relevancia en la literatura.",
      imagen: "/ariadna.svg",
      categoria: "Literatura clásica",
      tipoTexto: "narrativo",
      contenido: `En los tiempos antiguos, cuando los dioses aún intervenían en los asuntos humanos, Creta era una potencia insular gobernada por el rey Minos. Según los relatos, este soberano había recibido como ofrenda divina un magnífico toro blanco, símbolo de poder y legitimidad. Sin embargo, al desobedecer las órdenes del dios Poseidón y no sacrificar al animal, Minos desató la ira divina. Como castigo, su esposa Pasífae fue embrujada para enamorarse del toro, y de esa unión antinatural nació una criatura aterradora: el Minotauro, mitad hombre y mitad bestia.

Incapaz de matarlo, pero avergonzado de su existencia, Minos ordenó construir un intrincado laberinto bajo el palacio de Cnosos. Encargó la tarea a Dédalo, el más hábil de los artesanos, quien diseñó una estructura tan compleja que nadie que entrara podía salir. Allí fue encerrado el Minotauro, y cada nueve años, como castigo por la muerte de uno de sus hijos a manos atenienses, Minos exigía un tributo de siete jóvenes y siete doncellas de Atenas para alimentar a la bestia.

En una de esas ocasiones, el joven príncipe Teseo, hijo del rey Egeo, se ofreció voluntario para formar parte del tributo. Su propósito no era sacrificarse, sino acabar con el Minotauro y liberar a su ciudad de la humillación. Al llegar a Creta, Teseo conoció a Ariadna, hija de Minos, quien quedó profundamente conmovida por su valentía. Temiendo por su vida, Ariadna ideó un plan para salvarlo. Le entregó un ovillo de hilo mágico que debía atar a la entrada del laberinto y desenrollar a medida que avanzara. Así, si lograba derrotar al Minotauro, podría seguir el hilo de regreso y escapar.

Teseo cumplió con su misión. Con astucia y coraje, dio muerte al monstruo y, gracias al hilo de Ariadna, halló la salida. Luego, huyó de Creta con la joven princesa. Pero la historia no terminó ahí. En una decisión que ha generado múltiples interpretaciones, Teseo abandonó a Ariadna mientras dormía en la isla de Naxos. Algunas versiones dicen que lo hizo por órdenes de los dioses; otras, que fue simplemente cobardía o ingratitud. Sea como fuere, Ariadna quedó sola hasta que el dios Dionisio la encontró y la convirtió en su esposa, otorgándole la inmortalidad.

Este mito, aunque breve en apariencia, ha sido una fuente inagotable de reflexiones para la literatura y la filosofía a lo largo de los siglos. El hilo de Ariadna no es solo un recurso práctico para salir de un laberinto: es un símbolo de guía, de razón frente al caos, de amor que ilumina el camino, y también de traición. Representa cómo los problemas más complejos requieren soluciones simples pero brillantes. Del mismo modo, el laberinto puede interpretarse como una metáfora de la mente humana, de la vida misma, o de los dilemas morales que enfrentamos.

El abandono de Ariadna también ha sido motivo de debates. Algunos ven en ella a la heroína olvidada, la inteligencia femenina que permite el triunfo masculino pero es luego descartada. Otros prefieren destacar su destino final, en el que se transforma en una figura celestial, elevada por Dionisio a los cielos, donde brilla como la constelación de la Corona Boreal.

Incluso en la actualidad, hablar del "hilo de Ariadna" es una forma de referirse a la solución que permite desentrañar un problema confuso o escapar de una situación enredada. Así, este antiguo mito continúa vivo, recordándonos que incluso en los laberintos más oscuros puede haber una salida, si seguimos el hilo correcto.`,
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
    "Minos, rey de Atenas, enfureció a Poseidón al negarse a sacrificar un toro blanco que le había sido ofrecido, lo que provocó el nacimiento del Minotauro y su encierro en un laberinto construido por Ícaro.",
    "Como castigo por la muerte de su hijo a manos de los cretenses, el rey Egeo de Atenas debía enviar cada nueve años un tributo de jóvenes y doncellas para alimentar al Minotauro en el laberinto de Cnosos.",
    "Ariadna, hija del rey Minos de Creta, se sintió conmovida por la valentía del príncipe Teseo y le ofreció un ovillo de hilo mágico para que pudiera encontrar la salida del laberinto tras derrotar al Minotauro.",
    "Teseo, tras asesinar al Minotauro con una espada que le proporcionó Ariadna, huyó de Creta y abandonó a la princesa en la isla de Delos por órdenes directas del dios Dionisio.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas1.map((texto) => ({
      preguntaId: preguntaSeleccion1.id,
      texto,
      esCorrecta:
        texto ===
        "Ariadna, hija del rey Minos de Creta, se sintió conmovida por la valentía del príncipe Teseo y le ofreció un ovillo de hilo mágico para que pudiera encontrar la salida del laberinto tras derrotar al Minotauro.",
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
    'De manera similar, en la psicología moderna, la "metáfora del laberinto" se utiliza para describir la complejidad de la psique humana, y el "hilo de Ariadna" representa las herramientas terapéuticas que guían al individuo hacia la comprensión de sí mismo.',
    'El texto concluye mencionando la vigencia del mito en la actualidad, donde el "hilo de Ariadna" simboliza la solución a problemas complejos.',
    "En el arte contemporáneo, la figura de Ariadna ha sido reinterpretada en diversas ocasiones, explorando temas de traición, empoderamiento femenino y el laberinto como símbolo de encierro y liberación.",
    "La constelación de la Corona Boreal, donde según el mito fue transformada Ariadna, ha sido objeto de estudio por astrónomos desde la antigüedad, quienes catalogaron sus brillantes estrellas.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas2.map((texto) => ({
      preguntaId: preguntaSeleccion2.id,
      texto,
      esCorrecta:
        texto ===
        'De manera similar, en la psicología moderna, la "metáfora del laberinto" se utiliza para describir la complejidad de la psique humana, y el "hilo de Ariadna" representa las herramientas terapéuticas que guían al individuo hacia la comprensión de sí mismo.',
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
    "La narración detallada de la construcción del laberinto de Cnosos y los desafíos arquitectónicos que enfrentó Dédalo.",
    "El trágico destino de los jóvenes atenienses ofrecidos como tributo al Minotauro y el sufrimiento de la ciudad de Atenas.",
    "El mito de Ariadna, explorando temas como la ayuda inesperada, la resolución de problemas complejos y la perdurabilidad de sus símbolos a través del tiempo.",
    "La compleja relación entre el rey Minos y el dios Poseidón, y cómo su conflicto divino desencadenó una serie de eventos trágicos en Creta.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas3.map((texto) => ({
      preguntaId: preguntaSeleccion3.id,
      texto,
      esCorrecta:
        texto ===
        "El mito de Ariadna, explorando temas como la ayuda inesperada, la resolución de problemas complejos y la perdurabilidad de sus símbolos a través del tiempo.",
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
    "La descripción detallada de la apariencia física del Minotauro y el terror que inspiraba.",
    "El papel crucial de Dédalo como el artesano ingenioso que construyó el laberinto.",
    "Las diferentes interpretaciones del abandono de Ariadna por Teseo y su significado.",
    "La importancia de Creta como una potencia insular en la antigüedad y su gobierno bajo el rey Minos.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas4.map((texto) => ({
      preguntaId: preguntaSeleccion4.id,
      texto,
      esCorrecta:
        texto ===
        "Las diferentes interpretaciones del abandono de Ariadna por Teseo y su significado.",
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
    "La desobediencia de Minos a Poseidón al no sacrificar el toro blanco causó la ira del dios, quien a su vez inspiró a Dédalo a construir el laberinto como una trampa divina.",
    "El amor antinatural de Pasífae por el toro y el nacimiento del Minotauro avergonzaron a Minos, lo que lo llevó a ordenar la construcción del laberinto para ocultar a la criatura.",
    "La muerte de uno de los hijos de Minos a manos de los atenienses generó en el rey un deseo de venganza tan profundo que lo impulsó a construir el laberinto como una prisión para sus futuros tributos.",
    "El deseo de Minos de demostrar su poder y legitimidad a través de la posesión de un toro blanco lo llevó a construir un laberinto elaborado como símbolo de su dominio sobre Creta.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas5.map((texto) => ({
      preguntaId: preguntaSeleccion5.id,
      texto,
      esCorrecta:
        texto ===
        "El amor antinatural de Pasífae por el toro y el nacimiento del Minotauro avergonzaron a Minos, lo que lo llevó a ordenar la construcción del laberinto para ocultar a la criatura.",
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
    "Ambos son objetos físicos creados por seres ingeniosos: el laberinto por Dédalo y el hilo posiblemente con magia o habilidad artesanal.",
    "El laberinto representa la confusión y la dificultad, mientras que el hilo simboliza la claridad y la solución para superar esa dificultad.",
    "El hilo es un objeto simple y directo, mientras que el laberinto es complejo y engañoso, pero ambos fueron esenciales para el destino de Teseo.",
    "Ambos elementos son regalos ofrecidos a Teseo: el laberinto como un desafío impuesto y el hilo como una ayuda ofrecida por amor.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas6.map((texto) => ({
      preguntaId: preguntaSeleccion6.id,
      texto,
      esCorrecta:
        texto ===
        "El laberinto representa la confusión y la dificultad, mientras que el hilo simboliza la claridad y la solución para superar esa dificultad.",
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
    "El abandono de Ariadna por Teseo fue un acto justificado por órdenes directas de los dioses, quienes tenían un destino diferente para la princesa.",
    "La figura de Ariadna es principalmente la de una joven ingenua que se enamoró perdidamente de Teseo y actuó impulsada por sus sentimientos.",
    "El hilo de Ariadna no es solo una herramienta práctica, sino un símbolo poderoso de la razón y la guía frente a la confusión y los desafíos de la vida.",
    "El mito del Minotauro es una alegoría sobre la brutalidad inherente en la naturaleza humana y la necesidad de la civilización para controlarla.",
  ];

  await db.insert(schema.alternativa).values(
    alternativas7.map((texto) => ({
      preguntaId: preguntaSeleccion7.id,
      texto,
      esCorrecta:
        texto ===
        "El hilo de Ariadna no es solo una herramienta práctica, sino un símbolo poderoso de la razón y la guía frente a la confusión y los desafíos de la vida.",
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
  console.log("✅ Seed ejecutado correctamente");
}

seed().catch((err) => {
  console.error("❌ Error al ejecutar seed:", err);
});
