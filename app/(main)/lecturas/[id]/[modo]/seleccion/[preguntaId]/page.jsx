"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Progress } from "@heroui/react";
import { usePathname } from "next/navigation";

const preguntaMock = {
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
};

const PreguntaSeleccion = () => {
  const pathname = usePathname();
  const [seleccion, setSeleccion] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [esCorrecta, setEsCorrecta] = useState(false);
  const letras = ["A", "B", "C", "D"];

  const pathParts = pathname.split("/");
  const id = pathParts[2];
  const modo = pathParts[3];

  const progreso = 33; // Simulado

  const handleVerificar = () => {
    if (!seleccion) return;
    setEsCorrecta(seleccion === preguntaMock.respuestaCorrecta);
    setVerificado(true);
  };

  return (
    <div className="px-6 py-4 lg:py-8 max-w-3xl mx-auto h-full flex flex-col">
      {/* Progreso */}
      <div className="mb-5 lg:mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-normal text-negro">
            Dificultad: <span>{preguntaMock.dificultad}</span>
          </span>
          <p className="text-right text-sm font-normal text-negro">1/3</p>
        </div>
        <Progress value={progreso} max={100} className="mt-2" color="success" />
      </div>

      {/* Pregunta */}
      <h2 className="text-lg lg:text-2xl font-normal mb-5 lg:mb-10 text-center">
        {preguntaMock.contenido}
      </h2>

      <div className="flex flex-col justify-between flex-1 text-xs lg:text-base">
        {/* Alternativas */}
        <div className="space-y-4 mb-8">
          {preguntaMock.alternativas.map((alt, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!verificado) setSeleccion(alt);
              }}
              className={`w-full flex items-start p-4 border rounded-xl text-left transition ${
                seleccion === alt
                  ? "border-verde bg-verdeClaro text-white"
                  : "border-gris"
              } ${verificado && seleccion !== alt ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={verificado}
            >
              <div className="flex items-center gap-2.5">
                <div className="font-normal border w-[30px] h-[30px] rounded-xl flex justify-center items-center border-gris">
                  {letras[idx]}
                </div>
                <div className="flex-1">{alt}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Resultado */}
        {verificado && (
          <div
            className={`border-2 rounded-xl px-4 py-3 mb-6 text-center text-sm font-medium ${
              esCorrecta
                ? "border-verde text-verde bg-white"
                : "border-red-500 text-red-500 bg-white"
            }`}
          >
            {esCorrecta ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
          </div>
        )}

        {/* Botones */}
        <div className={`flex verificado ${verificado ? "justify-end" : "justify-between"}`}> 
          {!verificado && (
            <Link href={`/lecturas/${id}/${modo}`}>
              <Button
                variant="ghost"
                className="font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] text-gris border-gris hover:bg-grisClaro lg:w-[222px] lg:h-[52px]"
              >
                Volver a la lectura
              </Button>
            </Link>
          )}

          <Button
            onPress={verificado ? () => console.log("Continuar...") : handleVerificar}
            
            className={`font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] lg:w-[222px] lg:h-[52px] text-white bg-verde hover:bg-verdeClaro`}
          >
            {verificado ? "Continuar" : "Verificar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreguntaSeleccion;
