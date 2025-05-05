"use client";

import React from "react";
import { Button } from "@heroui/react";

const comodines = [
  {
    id: 1,
    titulo: "Resaltar estructuras del texto",
    descripcion:
      "Resalta las secciones de introducción, desarrollo y conclusión.",
    icono: "/estructura.svg",
    costo: 30,
  },
  {
    id: 2,
    titulo: "Resaltar idea principal",
    descripcion: "Destacar la idea principal del texto.",
    icono: "/idea.svg",
    costo: 20,
  },
  {
    id: 3,
    titulo: "Mostrar palabras claves destacadas",
    descripcion: "Marca palabras clave importantes en el texto.",
    icono: "/estrella.svg",
    costo: 20,
  },
];

const TiendaPage = () => {
  const puntosDisponibles = 250;

  return (
    <div className="max-w-[1050px] mx-auto px-8 pb-12 flex flex-col items-center gap-6 sm:gap-12">
      <div className="flex flex-col items-center gap-4 w-full">
        <img
          src={"/tienda.svg"}
          alt={"Tienda"}
          className="w-[90px] h-[90px] rounded-lg object-cover"
        />
        <h1 className="lg:text-[40px] font-bold text-negro text-center text-2xl md:text-[30px]">
          Tienda
        </h1>
        <p className="text-md text-gray-500 font-semibold text-center">
          Gasta tus puntos de experiencia en útiles comodines
        </p>
      </div>
      <div className="bg-white border border-gris rounded-lg px-6 py-3 shadow-sm">
        <p className="font-semibold text-negro text-sm lg:text-lg text-center">
          Puntos disponibles
        </p>
        <p className="text-center font-bold text-sm lg:text-lg text-negro">
          {puntosDisponibles} XP
        </p>
      </div>
      <div className="flex flex-col gap-12 w-full">
        {comodines.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border border-gris rounded-lg p-4 shadow-sm gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.icono}
                alt={item.titulo}
                className="w-[40px] h-[40px] object-contain"
              />
              <div>
                <p className="font-semibold text-negro text-sm lg:text-lg">{item.titulo}</p>
                <p className="text-xs lg:text-sm text-gray-600">{item.descripcion}</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              {item.costo} XP
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiendaPage;
