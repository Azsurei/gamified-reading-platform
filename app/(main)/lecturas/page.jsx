"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

const categories = [
  { id: "all", label: "Todas" },
  { id: "literatura", label: "Literatura clásica" },
  { id: "historia", label: "Historia" },
  { id: "ciencia", label: "Ciencia" },
  { id: "entretenimiento", label: "Entretenimiento" },
  { id: "arte", label: "Arte" },
];

const allLectures = [
  {
    title: "El horizonte de eventos: la frontera que marca el destino",
    description:
      "Breve texto científico sobre el horizonte de eventos de un agujero negro. ",
    image: "/agujero-negro.svg",
    category: "ciencia",
  },
  {
    title: "La era de los videojuegos",
    description:
      "Breve historia del nacimiento y evolución de los videojuegos.",
    image: "/videojuegos.svg",
    category: "entretenimiento",
  },
  {
    title: "Ícaro: el hombre que voló cerca al sol",
    description: "Breve historia de Ícaro.",
    image: "/icaro.svg",
    category: "historia",
  },
  {
    title: "El hilo de Ariadna",
    description: "Breve historia del hilo de Ariadna.",
    image: "/ariadna.svg",
    category: "literatura",
  },
  {
    title: "El horizonte de eventos: la frontera que marca el destino",
    description:
      "Breve texto científico sobre el horizonte de eventos de un agujero negro.",
    image: "/agujero-negro.svg",
    category: "ciencia",
  },
  {
    title: "La era de los videojuegos",
    description:
      "Breve historia del nacimiento y evolución de los videojuegos.",
    image: "/videojuegos.svg",
    category: "entretenimiento",
  },
  {
    title: "Ícaro: el hombre que voló cerca al sol",
    description: "Breve historia de Ícaro.",
    image: "/icaro.svg",
    category: "historia",
  },
  {
    title: "El hilo de Ariadna",
    description: "Breve historia del hilo de Ariadna.",
    image: "/ariadna.svg",
    category: "literatura",
  },
  {
    title: "El horizonte de eventos: la frontera que marca el destino",
    description:
      "Breve texto científico sobre el horizonte de eventos de un agujero negro.",
    image: "/agujero-negro.svg",
    category: "ciencia",
  },
  {
    title: "La era de los videojuegos",
    description:
      "Breve historia del nacimiento y evolución de los videojuegos.",
    image: "/videojuegos.svg",
    category: "entretenimiento",
  },
  {
    title: "Ícaro: el hombre que voló cerca al sol",
    description: "Breve historia de Ícaro.",
    image: "/icaro.svg",
    category: "historia",
  },
  {
    title: "El hilo de Ariadna",
    description: "Breve historia del hilo de Ariadna.",
    image: "/ariadna.svg",
    category: "literatura",
  },
];

const LearnPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterLectures = (categoryId) => {
    const filtered =
      categoryId === "all"
        ? allLectures
        : allLectures.filter((lec) => lec.category === categoryId);
    return filtered.filter((lec) =>
      lec.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="w-full px-8">
      {/* Búsqueda */}
      <div className="w-full border-b border-gray-200 pb-4 ">
        <Input
          placeholder="Buscar una lectura"
          className="w-full max-w-lg "
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
      </div>

      {/* Contenedor desplazable solo para los botones de Tabs */}
      <div className="w-full overflow-x-auto mt-6">
        <div className="inline-flex gap-2 min-w-max">
          {categories.map((item) => (
            <Button
              key={item.id}
              onPress={() => setSelectedCategory(item.id)}
              className={`px-4 py-2 font-semibold whitespace-nowrap rounded-[10px] border text-md ${
                selectedCategory === item.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gris"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Contenido de la pestaña actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filterLectures(selectedCategory).length > 0 ? (
          filterLectures(selectedCategory).map((lecture, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl border border-gris hover:shadow-sm transition"
            >
              <img
                src={lecture.image}
                alt={lecture.title}
                className="w-[96px] h-[96px] rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{lecture.title}</h3>
                <p className="text-sm text-gray-600">{lecture.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No se encontraron lecturas.</p>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
