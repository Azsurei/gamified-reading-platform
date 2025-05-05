"use client";

import React from "react";
import { Progress } from "@heroui/react";

const desafios = [
  {
    id: 1,
    titulo: "Completa 5 lecturas",
    progresoActual: 1,
    progresoTotal: 5,
    insignia: "/book-badge.svg",
  },
  {
    id: 2,
    titulo: "Completa 1 lectura con puntaje perfecto",
    progresoActual: 0,
    progresoTotal: 1,
    insignia: "/score-badge.svg",
  },
  {
    id: 3,
    titulo: "Lee 3 libros de la sección Literatura Clásica",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/classics-badge.svg",
  },
  {
    id: 4,
    titulo: "Lee 3 libros de la sección Historia",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/history-badge.svg",
  },
  {
    id: 5,
    titulo: "Lee 3 libros de la sección Ciencia",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/science-badge.svg",
  },
  {
    id: 6,
    titulo: "Completa 5 lecturas",
    progresoActual: 1,
    progresoTotal: 5,
    insignia: "/book-badge.svg",
  },
  {
    id: 7,
    titulo: "Completa 1 lectura con puntaje perfecto",
    progresoActual: 0,
    progresoTotal: 1,
    insignia: "/score-badge.svg",
  },
  {
    id: 8,
    titulo: "Lee 3 libros de la sección Literatura Clásica",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/classics-badge.svg",
  },
  {
    id: 9,
    titulo: "Lee 3 libros de la sección Historia",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/history-badge.svg",
  },
  {
    id: 10,
    titulo: "Lee 3 libros de la sección Ciencia",
    progresoActual: 1,
    progresoTotal: 3,
    insignia: "/science-badge.svg",
  },
];

const DesafiosPage = () => {
  return (
    <div className="max-w-[1050px] mx-auto px-8 pb-12">
      <div className="flex flex-col items-center mb-6 gap-4">
        <img
          src={"/challenge.svg"}
          alt={"Desafíos"}
          className="w-[90px] h-[90px] rounded-lg object-cover"
        />
        <h1 className="lg:text-[40px] font-bold text-negro text-center text-2xl md:text-[30px]">
          Desafíos
        </h1>
        <p className="text-md text-gray-500 font-semibold text-center">
          Completa los desafíos para ganar insignias exclusivas
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {desafios.map((desafio) => {
          const progreso =
            (desafio.progresoActual / desafio.progresoTotal) * 100;

          return (
            <div
              key={desafio.id}
              className="flex justify-between items-center border rounded-lg p-4 shadow-sm border-gris"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-negro mb-1">
                    {desafio.titulo}
                  </p>
                  <span className="text-sm text-negro font-semibold">
                    {desafio.progresoActual}/{desafio.progresoTotal}
                  </span>
                </div>
                <Progress
                  aria-label={`Progreso de ${desafio.titulo}`}
                  value={progreso}
                  className="max-w-full"
                />
              </div>

              <img
                src={desafio.insignia}
                alt="Insignia"
                className="w-10 h-10 object-contain ml-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesafiosPage;
