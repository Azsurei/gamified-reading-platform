"use client";

import { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { Spinner } from "@heroui/spinner"; // Importa el spinner
import { useRouter } from "next/navigation";

const categories = [
  { id: "all", label: "Todas" },
  { id: "Literatura Clásica", label: "Literatura clásica" },
  { id: "Historia", label: "Historia" },
  { id: "Ciencia", label: "Ciencia" },
  { id: "Entretenimiento", label: "Entretenimiento" },
  { id: "Arte", label: "Arte" },
];

const LearnPage = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true); // Estado loading
  const router = useRouter();
  const irALectura = (lectura) => {
    router.push(`/lecturas/${lectura.id}`);
  };

  // Fetch de lecturas desde la API
  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true); // Empieza loading
      try {
        const res = await fetch("/api/lecturas");
        const data = await res.json();
        setLectures(data);
      } catch (error) {
        console.error("Error al obtener lecturas:", error);
      } finally {
        setLoading(false); // Termina loading siempre
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
    <div className="w-full px-8 pb-12 h-full">
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

      {/* Lista de lecturas o Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 h-full">
        {loading ? (
          <div className="flex justify-center items-center w-full col-span-full">
            <Spinner size="lg" /> {/* Spinner mientras carga */}
          </div>
        ) : filterLectures(selectedCategory).length > 0 ? (
          filterLectures(selectedCategory).map((lecture) => (
            <div
              onClick={() => irALectura(lecture)}
              className="flex items-center gap-4 p-4 rounded-xl border border-gris hover:shadow-sm transition cursor-pointer hover:bg-secondary/20 h-[130px]"
              key={lecture.id}
            >
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
          ))
        ) : (
          <p className="text-gray-500 mt-4">No se encontraron lecturas.</p>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
