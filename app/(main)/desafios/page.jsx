"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@heroui/react";

const DesafiosPage = () => {
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const res = await fetch("/api/desafios");
        const data = await res.json();
        setDesafios(data);
      } catch (error) {
        console.error("Error al cargar desafíos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesafios();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium">
        Cargando desafíos...
      </div>
    );
  }

  return (
    <div className="max-w-[1050px] mx-auto px-8 pb-12">
      <div className="flex flex-col items-center mb-6 gap-4">
        <img
          src="/challenge.svg"
          alt="Desafíos"
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
            desafio.meta === 0
              ? 0
              : (desafio.progreso / desafio.meta) * 100;

          return (
            <div
              key={desafio.id}
              className="flex justify-between items-center border rounded-lg p-4 shadow-sm border-gris"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-negro mb-1">
                    {desafio.descripcion}
                  </p>
                  <span className="text-sm text-negro font-semibold">
                    {desafio.progreso}/{desafio.meta}
                  </span>
                </div>
                <Progress
                  aria-label={`Progreso de ${desafio.descripcion}`}
                  value={progreso}
                  className="max-w-full"
                />
              </div>

              <img
                src={desafio.imagenInsignia}
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
