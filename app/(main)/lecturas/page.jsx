"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";

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
    description: "Breve texto científico sobre el horizonte de eventos de un agujero negro.",
    image: "/lecturas/agujero-negro.jpg",
    category: "ciencia",
  },
  {
    title: "La era de los videojuegos",
    description: "Breve historia del nacimiento y evolución de los videojuegos.",
    image: "/lecturas/videojuegos.jpg",
    category: "entretenimiento",
  },
  {
    title: "Ícaro: el hombre que voló cerca al sol",
    description: "Breve historia de Ícaro.",
    image: "/lecturas/icaro.jpg",
    category: "historia",
  },
  {
    title: "El hilo de Ariadna",
    description: "Breve historia del hilo de Ariadna.",
    image: "/lecturas/ariadna.jpg",
    category: "literatura",
  },
];

const Learnpage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full px-8">
      {/* Búsqueda */}
      <div className="w-full border-b border-gray-200 py-4">
        <Input
          placeholder="Buscar una lectura"
          className="w-full max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs de categorías */}
      <Tabs aria-label="Categorías" items={categories} className="mt-6">
        {(item) => {
          const filteredLectures =
            item.id === "all"
              ? allLectures
              : allLectures.filter((lec) => lec.category === item.id);

          const searchFilteredLectures = filteredLectures.filter((lec) =>
            lec.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <Tab key={item.id} title={item.label}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {searchFilteredLectures.map((lecture, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-sm transition"
                  >
                    <img
                      src={lecture.image}
                      alt={lecture.title}
                      className="w-[96px] h-[96px] rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-md font-semibold">{lecture.title}</h3>
                      <p className="text-sm text-gray-600">{lecture.description}</p>
                    </div>
                  </div>
                ))}
                {searchFilteredLectures.length === 0 && (
                  <p className="text-gray-500 mt-4">No se encontraron lecturas.</p>
                )}
              </div>
            </Tab>
          );
        }}
      </Tabs>
    </div>
  );
};

export default Learnpage;
