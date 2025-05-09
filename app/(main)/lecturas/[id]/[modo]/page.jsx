"use client";

import { useState } from "react";
import { Button, Progress } from "@heroui/react";
import { PreguntaSeleccion } from "@/components/pregunta-seleccion";
import { PreguntaCompletar } from "@/components/pregunta-completar";
import Retroalimentacion from "@/components/retroalimentacion";
import Link from "next/link";
import { useParams } from "next/navigation";

// Simulación de contenido
const lecturaMock = {
  id: "lect1",
  titulo: "El horizonte de eventos: la frontera que marca el destino",
  imagen: "/agujero-negro.svg",
  contenido: `
    Un agujero negro es un objeto astronómico con una gravedad tan intensa que nada puede escapar de su interior, ni siquiera la luz. 
Se forma cuando una estrella muy masiva agota su energía y colapsa sobre sí misma, concentrando toda su masa en un punto extremadamente denso llamado singularidad. Alrededor de este punto se encuentra una región invisible, lo que conocemos como agujero negro. No podemos observarlo directamente porque ni la luz puede salir de él, pero los científicos pueden inferir su presencia observando el comportamiento de la materia y la luz en su entorno, como estrellas que giran de forma extraña o gases que se calientan al acercarse.

Uno de los conceptos más fascinantes y desafiantes al estudiar los agujeros negros es el llamado horizonte de eventos. Esta es la “frontera” que marca el punto sin retorno: una vez que algo lo cruza, ya no hay manera de volver atrás. Se le llama así porque más allá de ese límite ya no es posible recibir información o eventos desde dentro del agujero negro. No se trata de una barrera física, sino de un límite matemático definido por la velocidad de escape: para poder salir, un objeto tendría que moverse más rápido que la luz, lo cual, según la teoría de la relatividad de Einstein, es imposible. Por eso, el horizonte de eventos es una línea invisible, pero crítica, en la estructura del universo.

El estudio del horizonte de eventos ha llevado a grandes debates entre los científicos, especialmente cuando se mezcla con la mecánica cuántica. Uno de los más conocidos es la llamada paradoja de la información: si todo lo que entra en un agujero negro desaparece, ¿qué sucede con la información que contenía? ¿Se destruye para siempre? Esto desafía las leyes de la física, que afirman que la información no puede perderse. Además, los físicos han descubierto que cuando la materia se acerca al horizonte de eventos, experimenta fenómenos extremos: el tiempo se desacelera desde el punto de vista de un observador externo, y la materia puede alcanzar temperaturas muy altas. Todo esto hace que el horizonte de eventos no solo sea una frontera física, sino también una frontera del conocimiento humano, donde las leyes conocidas de la ciencia comienzan a encontrarse con sus propios límites.
  `,
};

const preguntasMock = [
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
    dificultad: "Fácil",
  },
  {
    id: "p2",
    tipo: "completar",
    contenido:
      "¿Consideras que el autor logró organizar bien las ideas para explicar un tema tan complejo? ¿Por qué?",
    dificultad: "Media",
  },
];

const ModoPage = () => {
  const { modo } = useParams(); // Detecta si el modo es 'aprendizaje'
  const [pasoActual, setPasoActual] = useState(0);
  const [pasoAntesDeLectura, setPasoAntesDeLectura] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] =
    useState(false);
  const totalPasos = preguntasMock.length + 1; // +1 por la lectura

  const avanzarPaso = () => {
    if (pasoActual === totalPasos - 1) {
      setMostrarRetroalimentacion(true);
    } else {
      setPasoActual((prev) => Math.min(prev + 1, totalPasos - 1));
    }
  };

  const retrocederPaso = () => setPasoActual((prev) => Math.max(prev - 1, 0)); //esto se hace para que no se pase del minimo de pasos
  const irALectura = () => {
    if (pasoActual !== 0) {
      setPasoAntesDeLectura(pasoActual);
      setPasoActual(0);
    }
  };
  const volverAPreguntaPendiente = () => {
    if (pasoAntesDeLectura !== null) {
      setPasoActual(pasoAntesDeLectura);
      setPasoAntesDeLectura(null); // una vez vuelto, lo limpio
    }
  };

  if (mostrarRetroalimentacion) {
    return <Retroalimentacion />;
  }

  // Layout lectura
  if (pasoActual === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header fijo */}
        <div className="flex p-4 items-center justify-between h-24 fixed top-0 w-full bg-white z-10 shadow">
          <div className="flex items-center">
            <img
              src={lecturaMock.imagen}
              alt={lecturaMock.titulo}
              className="w-[76px] h-[76px] object-cover"
            />
            <div className="px-4 py-2 rounded">
              <h1 className="hidden sm:block text-sm lg:text-lg font-normal">
                {lecturaMock.titulo}
              </h1>
            </div>
          </div>
          {/* Iconos de comodines solo si el modo es aprendizaje */}
          {modo === "aprendizaje" && pasoActual === 0 ? (
            <div className="flex gap-8">
              <img src="/estructura.svg" alt="Lapiz" className="w-12 h-12" />
              <img src="/idea.svg" alt="Bombilla" className="w-12 h-12" />
              <img src="/estrella.svg" alt="Estrella" className="w-12 h-12" />
              <Link href="/lecturas">
                <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                  ←
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/lecturas">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                ←
              </Button>
            </Link>
          )}
        </div>

        {/* Contenido debajo del header */}
        <div className="mt-24 flex-1">
          {/* Contenido */}
          <div className="flex-1 px-6 py-4 lg:py-8 max-w-3xl mx-auto overflow-y-auto">
            <h2 className="text-base lg:text-2xl font-normal text-negro text-center">
              {lecturaMock.titulo}
            </h2>
            <p className="text-xs lg:text-base leading-relaxed whitespace-pre-line font-normal text-justify py-6">
              {lecturaMock.contenido}
            </p>
            {/* Botón de responder */}
            <div className="mx-auto flex justify-center">
              <Button
                onPress={
                  pasoAntesDeLectura !== null
                    ? volverAPreguntaPendiente
                    : avanzarPaso
                }
                className={`font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] lg:w-[222px] lg:h-[52px] transition text-white bg-verde hover:bg-verdeClar`}
              >
                {pasoAntesDeLectura !== null
                  ? "Volver a la pregunta"
                  : "Responder"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout pregunta
  const pregunta = preguntasMock[pasoActual - 1];
  const progreso = Math.round((pasoActual / (totalPasos - 1)) * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Header fijo */}
      <div className="flex p-4 items-center justify-between h-24 fixed top-0 w-full bg-white z-10 shadow">
        <div className="flex items-center">
          <img
            src={lecturaMock.imagen}
            alt={lecturaMock.titulo}
            className="w-[76px] h-[76px] object-cover"
          />
          <div className="px-4 py-2 rounded">
            <h1 className="hidden sm:block text-sm lg:text-lg font-normal">
              {lecturaMock.titulo}
            </h1>
          </div>
        </div>
        {/* Iconos de comodines solo si el modo es aprendizaje */}
        {modo === "aprendizaje" && pasoActual === 0 ? 
         (
          <div className="flex gap-8">
            <img src="/estructura.svg" alt="Lapiz" className="w-12 h-12" />
            <img src="/idea.svg" alt="Bombilla" className="w-12 h-12" />
            <img src="/estrella.svg" alt="Estrella" className="w-12 h-12" />
            <Link href="/lecturas">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                ←
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/lecturas">
            <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              ←
            </Button>
          </Link>
        )}
      </div>

      {/* Contenido debajo del header */}
      <div className="mt-24 flex-1">
        <div className="px-6 py-4 lg:py-8 max-w-3xl mx-auto h-full flex flex-col">
          {/* Progreso */}
          <div className="mb-5 lg:mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-normal text-negro">
                Dificultad: <span>{pregunta.dificultad}</span>
              </span>
              <p className="text-right text-sm font-normal text-negro">
                {pasoActual}/{totalPasos - 1}
              </p>
            </div>
            <Progress
              value={progreso}
              max={100}
              color={
                pregunta.dificultad === "Fácil"
                  ? "primary"
                  : pregunta.dificultad === "Media"
                  ? "warning"
                  : "danger"
              }
            />
          </div>

          {/* Tipo de pregunta */}
          {pregunta.tipo === "seleccion" ? (
            <PreguntaSeleccion
              pregunta={pregunta}
              seleccion={respuestas[pregunta.id]}
              setRespuesta={(valor) =>
                setRespuestas((prev) => ({ ...prev, [pregunta.id]: valor }))
              }
              onContinuar={avanzarPaso}
              volverALectura={irALectura}
            />
          ) : (
            <PreguntaCompletar
              pregunta={pregunta}
              seleccion={respuestas[pregunta.id]}
              setRespuesta={(valor) =>
                setRespuestas((prev) => ({ ...prev, [pregunta.id]: valor }))
              }
              onContinuar={avanzarPaso}
              volverALectura={irALectura}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModoPage;
