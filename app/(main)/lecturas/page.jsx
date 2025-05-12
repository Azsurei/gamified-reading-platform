"use client";

import { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";

const categories = [
  { id: "all", label: "Todas" },
  { id: "literatura", label: "Literatura clásica" },
  { id: "historia", label: "Historia" },
  { id: "ciencia", label: "Ciencia" },
  { id: "entretenimiento", label: "Entretenimiento" },
  { id: "arte", label: "Arte" },
];

const LearnPage = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch de lecturas desde la API
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch("/api/lecturas");
        const data = await res.json();
        setLectures(data);
      } catch (error) {
        console.error("Error al obtener lecturas:", error);
      }
    };

    fetchLectures();
  }, []);

  const filterLectures = (categoryId) => {
    const filtered =
      categoryId === "all"
        ? lectures
        : lectures.filter((lec) => lec.categoria === categoryId);
    return filtered.filter((lec) =>
      lec.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="w-full px-8 pb-12">
      {/* Búsqueda */}
      <div className="w-full border-b border-gray-200 pb-4">
        <Input
          placeholder="Buscar una lectura"
          className="w-full max-w-lg"
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto mt-6">
        <div className="inline-flex gap-2 min-w-max">
          {categories.map((item) => (
            <Button
              key={item.id}
              onPress={() => setSelectedCategory(item.id)}
              className={`px-4 py-2 font-semibold whitespace-nowrap rounded-[10px] border text-md ${
                selectedCategory === item.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-negro border-gris"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de lecturas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filterLectures(selectedCategory).length > 0 ? (
          filterLectures(selectedCategory).map((lecture) => (
            <Link href={`/lecturas/${lecture.id}`} key={lecture.id}>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gris hover:shadow-sm transition cursor-pointer hover:bg-secondary/20">
                <img
                  src={lecture.imagen}
                  alt={lecture.titulo}
                  className="w-[96px] h-[96px] rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-negro">
                    {lecture.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 text-justify">
                    {lecture.descripcion}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No se encontraron lecturas.</p>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
