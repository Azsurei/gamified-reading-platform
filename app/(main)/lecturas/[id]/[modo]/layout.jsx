// app/lecturas/[id]/[modo]/layout.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@heroui/react";

const lecturaMock = {
  id: "0",
  titulo: "El horizonte de eventos: la frontera que marca el destino",
  imagen: "/agujero-negro.svg",
};


const LayoutModo = ({ children }) => {
  const { modo } = useParams(); // Detecta si el modo es 'aprendizaje'

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
        {modo === "aprendizaje" ? (
          <div className="flex gap-8">
            <img src="/estructura.svg" alt="Lapiz" className="w-12 h-12"/>
            <img src="/idea.svg" alt="Bombilla" className="w-12 h-12" />
            <img src="/estrella.svg" alt="Estrella" className="w-12 h-12" />
            <Link href="/lecturas">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                ←
              </Button>
            </Link>
          </div>
        ): (
          <Link href="/lecturas">
            <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              ←
            </Button>
          </Link>
        )}
      </div>

      {/* Contenido debajo del header */}
      <div className="mt-24 flex-1">{children}</div>
    </div>
  );
};

export default LayoutModo;
