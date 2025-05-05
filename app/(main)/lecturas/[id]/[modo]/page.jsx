"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const lecturaMock = {
  id: "horizonte-de-eventos",
  titulo: "El horizonte de eventos: la frontera que marca el destino",
  contenido: `
    Un agujero negro es un objeto astronómico con una gravedad tan intensa que nada puede escapar de su interior, ni siquiera la luz. 
Se forma cuando una estrella muy masiva agota su energía y colapsa sobre sí misma, concentrando toda su masa en un punto extremadamente denso llamado singularidad. Alrededor de este punto se encuentra una región invisible, lo que conocemos como agujero negro. No podemos observarlo directamente porque ni la luz puede salir de él, pero los científicos pueden inferir su presencia observando el comportamiento de la materia y la luz en su entorno, como estrellas que giran de forma extraña o gases que se calientan al acercarse.

Uno de los conceptos más fascinantes y desafiantes al estudiar los agujeros negros es el llamado horizonte de eventos. Esta es la “frontera” que marca el punto sin retorno: una vez que algo lo cruza, ya no hay manera de volver atrás. Se le llama así porque más allá de ese límite ya no es posible recibir información o eventos desde dentro del agujero negro. No se trata de una barrera física, sino de un límite matemático definido por la velocidad de escape: para poder salir, un objeto tendría que moverse más rápido que la luz, lo cual, según la teoría de la relatividad de Einstein, es imposible. Por eso, el horizonte de eventos es una línea invisible, pero crítica, en la estructura del universo.

El estudio del horizonte de eventos ha llevado a grandes debates entre los científicos, especialmente cuando se mezcla con la mecánica cuántica. Uno de los más conocidos es la llamada paradoja de la información: si todo lo que entra en un agujero negro desaparece, ¿qué sucede con la información que contenía? ¿Se destruye para siempre? Esto desafía las leyes de la física, que afirman que la información no puede perderse. Además, los físicos han descubierto que cuando la materia se acerca al horizonte de eventos, experimenta fenómenos extremos: el tiempo se desacelera desde el punto de vista de un observador externo, y la materia puede alcanzar temperaturas muy altas. Todo esto hace que el horizonte de eventos no solo sea una frontera física, sino también una frontera del conocimiento humano, donde las leyes conocidas de la ciencia comienzan a encontrarse con sus propios límites.
  `,
  imagen: "/agujero-negro.svg",
};

const ModoPage = () => {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con imagen, título y botón de regreso */}
      <div className="flex p-4 items-center justify-between">
        <div className="flex items-center">
          <img
            src={lecturaMock.imagen}
            alt={lecturaMock.titulo}
            className="w-[76px] h-[76px] object-cover"
          />
          <div className="px-4 py-2 rounded">
            <h1 className="hidden sm:block text-sm lg:text-lg font-semibold">{lecturaMock.titulo}</h1>
          </div>
        </div>
        <Link href={"/lecturas"}>
          <Button
            className=" bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            ←
          </Button>
        </Link>
      </div>

      {/* Contenido de la lectura */}
      <div className="flex-1 px-6 py-6 max-w-3xl mx-auto">
        <h2 className="text-base lg:text-2xl font-bold text-negro mb-4">
          {lecturaMock.titulo}
        </h2>
        <p className="text-xs lg:text-base leading-relaxed whitespace-pre-line font-semibold text-justify">
          {lecturaMock.contenido}
        </p>
      </div>

      {/* Botón de responder */}
      <div className="px-6 pb-8 mx-auto">
        <Button
          className=" hover:bg-verdeClaro text-white font-semibold py-3 rounded-lg transition w-[222px] h-[52px] text-sm lg:text-lg"
          onPress={() => alert("Redirigir a preguntas...")}
          color="primary"
        >
          Responder
        </Button>
      </div>
    </div>
  );
};

export default ModoPage;
