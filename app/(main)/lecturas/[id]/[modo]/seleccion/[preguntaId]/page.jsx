"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Progress } from "@heroui/react";
import { usePathname } from "next/navigation"; // Importamos useRouter

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
};

const PreguntaSeleccion = () => {
  const pathname = usePathname(); // Usamos useRouter para acceder a la URL
  console.log("El pathname es ", pathname);
  const [seleccion, setSeleccion] = useState(null);
  const letras = ["A", "B", "C", "D"];

  // Si la ruta es /lecturas/0/aprendizaje/seleccion/p, entonces sacando el id y mode sería
  const pathParts = pathname.split("/");
  const id = pathParts[2]; // Extraemos el id (0 en este caso)
  const modo = pathParts[3]; // Extraemos  el modo (aprendizaje en este caso)
  console.log("ID:", id, "Modo:", modo);

  // Progreso simulado para el ejemplo (1/3)
  const progreso = 33; // Suponiendo que estamos en el primer paso de un total de 3

  return (
    <div className="flex-1 px-6 pt-28 pb-8 max-w-3xl mx-auto">
      {/* Progreso usando HeroUI */}
      <div className="mb-6">
        <span className="text-sm font-semibold text-gray-600">
          Dificultad: <span className="text-green-600">Fácil</span>
        </span>
        <Progress value={progreso} max={100} className="mt-2" color="success" />
        <p className="text-right text-xs mt-1">1/3</p>
      </div>

      {/* Pregunta */}
      <h2 className="text-lg lg:text-2xl font-bold mb-6">
        {preguntaMock.contenido}
      </h2>

      {/* Alternativas */}
      <div className="space-y-4 mb-8">
        {preguntaMock.alternativas.map((alt, idx) => (
          <button
            key={idx}
            onClick={() => setSeleccion(alt)}
            className={`w-full flex items-start p-4 border rounded-xl text-left transition hover:bg-gray-50 ${
              seleccion === alt
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <span className="mr-4 font-bold">{letras[idx]}</span>
            <span>{alt}</span>
          </button>
        ))}
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        {/* Botón de volver a la lectura */}
        <Link href={`/lecturas/${id}/${modo}`}>
          <Button variant="outline" className="cursor-pointer">
            Volver a la lectura
          </Button>
        </Link>

        {/* Botón de verificar */}
        <Button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg"
          disabled={!seleccion}
        >
          Verificar
        </Button>
      </div>
    </div>
  );
};

export default PreguntaSeleccion;
