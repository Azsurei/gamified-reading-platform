"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

const lecturaMock = {
  id: "0",
  titulo: "El horizonte de eventos: la frontera que marca el destino",
  contenido: `
    Un agujero negro es un objeto astronómico con una gravedad tan intensa que nada puede escapar de su interior, ni siquiera la luz. 
Se forma cuando una estrella muy masiva agota su energía y colapsa sobre sí misma, concentrando toda su masa en un punto extremadamente denso llamado singularidad. Alrededor de este punto se encuentra una región invisible, lo que conocemos como agujero negro. No podemos observarlo directamente porque ni la luz puede salir de él, pero los científicos pueden inferir su presencia observando el comportamiento de la materia y la luz en su entorno, como estrellas que giran de forma extraña o gases que se calientan al acercarse.

Uno de los conceptos más fascinantes y desafiantes al estudiar los agujeros negros es el llamado horizonte de eventos. Esta es la “frontera” que marca el punto sin retorno: una vez que algo lo cruza, ya no hay manera de volver atrás. Se le llama así porque más allá de ese límite ya no es posible recibir información o eventos desde dentro del agujero negro. No se trata de una barrera física, sino de un límite matemático definido por la velocidad de escape: para poder salir, un objeto tendría que moverse más rápido que la luz, lo cual, según la teoría de la relatividad de Einstein, es imposible. Por eso, el horizonte de eventos es una línea invisible, pero crítica, en la estructura del universo.

El estudio del horizonte de eventos ha llevado a grandes debates entre los científicos, especialmente cuando se mezcla con la mecánica cuántica. Uno de los más conocidos es la llamada paradoja de la información: si todo lo que entra en un agujero negro desaparece, ¿qué sucede con la información que contenía? ¿Se destruye para siempre? Esto desafía las leyes de la física, que afirman que la información no puede perderse. Además, los físicos han descubierto que cuando la materia se acerca al horizonte de eventos, experimenta fenómenos extremos: el tiempo se desacelera desde el punto de vista de un observador externo, y la materia puede alcanzar temperaturas muy altas. Todo esto hace que el horizonte de eventos no solo sea una frontera física, sino también una frontera del conocimiento humano, donde las leyes conocidas de la ciencia comienzan a encontrarse con sus propios límites.
  `,
  imagen: "/agujero-negro.svg",
  preguntas: [
    {
      id: "p1",
      tipo: "seleccion",
      contenido: "¿Qué es un agujero negro?",
      alternativas: [
        "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar.",
        "Una estrella que brilla intensamente en el cielo nocturno.",
        "Una galaxia con una gran cantidad de estrellas.",
        "Un tipo de planeta en el borde de un sistema solar.",
      ],
      respuestaCorrecta:
        "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar.",
    },
    {
      id: "p2",
      tipo: "completar",
      contenido:
        "¿Consideras que el autor logró organizar bien las ideas para explicar un tema tan complejo? ¿Por qué?",
    },
    {
      id: "p3",
      tipo: "completar",
      contenido:
        "¿Recomendarías esta lectura a otros estudiantes? Justifica tu respuesta considerando el contenido, el estilo del autor y lo que más te llamó la atención del texto.",
    },
  ],
};

const ModoPage = () => {
  const router = useRouter();

  const handleResponder = () => {
    const primeraPregunta = lecturaMock.preguntas[0];

    if (!primeraPregunta) return;

    const { tipo, id: preguntaId } = primeraPregunta;
    const modo = "aprendizaje";


    router.push(`/lecturas/${lecturaMock.id}/${modo}/${tipo}/${preguntaId}`);
  };

  return (
    <>
      {/* Contenido */}
      <div className="flex-1 px-6 py-6 max-w-3xl mx-auto overflow-y-auto">
        <h2 className="text-base lg:text-2xl font-bold text-negro mb-4">
          {lecturaMock.titulo}
        </h2>
        <p className="text-xs lg:text-base leading-relaxed whitespace-pre-line font-semibold text-justify">
          {lecturaMock.contenido}
        </p>
      </div>

      {/* Botón de responder */}
      <div className="px-6 pb-8 mx-auto flex justify-center">
        <Button
          className="hover:bg-verdeClaro text-white font-semibold py-3 rounded-lg transition w-[222px] h-[52px] text-sm lg:text-lg"
          onPress={handleResponder}
          color="primary"
        >
          Responder
        </Button>
      </div>
    </>
  );
};

export default ModoPage;
