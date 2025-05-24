"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

const comodines = [
  {
    id: 1,
    titulo: "Resumir lectura",
    descripcion:
      "Condensa el texto completo en un resumen, aporta un panorama detallado y global.",
    icono: "/estrella.svg",
    costo: 50,
  },
  {
    id: 2,
    titulo: "Mostrar idea principal",
    descripcion: "Destacar la idea principal del texto.",
    icono: "/idea.svg",
    costo: 30,
  },
  {
    id: 3,
    titulo: "Resaltar palabras claves destacadas",
    descripcion: "Resalta palabras clave importantes en el texto.",
    icono: "/estructura.svg",
    costo: 15,
  },
];

const TiendaPage = () => {
  const [xpTotal, setXpTotal] = useState(null);
  const [comodinSeleccionado, setComodinSeleccionado] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchXP = async () => {
    try {
      const res = await fetch("/api/tienda");
      if (!res.ok) throw new Error("Error al obtener los puntos");
      const data = await res.json();
      setXpTotal(data.xpGanadoTotal);
    } catch (error) {
      console.error("Error al obtener XP:", error);
      setXpTotal(0);
    }
  };

  useEffect(() => {
    fetchXP();
  }, []);

  const handleComprar = (comodin) => {
    setComodinSeleccionado(comodin);
    onOpen();
  };

  const confirmarCompra = async () => {
    if (!comodinSeleccionado) return;
    try {
      const res = await fetch("/api/tienda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          costo: comodinSeleccionado.costo,
          xpDisponible: xpTotal,
          tipoComodinId: comodinSeleccionado.id,
        }),
      });
      setXpTotal((prev) => prev - comodinSeleccionado.costo);

      if (!res.ok) throw new Error("Error al realizar la compra");
      await fetchXP();
    } catch (err) {
      console.error("Error al comprar comodín:", err);
    }
  };

  return (
    <>
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
            {xpTotal !== null ? `${xpTotal} XP` : "Cargando..."}
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
                  <p className="font-semibold text-negro text-sm lg:text-lg">
                    {item.titulo}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {item.descripcion}
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                onPress={() => handleComprar(item)}
                isDisabled={xpTotal !== null && xpTotal < item.costo}
              >
                {item.costo} XP
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar compra
              </ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de que deseas gastar{" "}
                  <strong>{comodinSeleccionado?.costo} XP</strong> en{" "}
                  <strong>{comodinSeleccionado?.titulo}</strong>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await confirmarCompra();
                    onClose();
                  }}
                >
                  Sí, confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TiendaPage;
