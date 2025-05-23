"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BarChart from "@/components/bar-chart";
import BarChart1 from "@/components/bar-chart2";
import EvolucionChart from "@/components/evolution-chart";

const RadarChart = dynamic(() => import("@/components/radar-chart"), {
  ssr: false,
});

const mockEvolucionLectura = [
  {
    puntaje: 85,
    fecha: "2025-05-20",
    titulo: "El ciclo del agua",
  },
  {
    puntaje: 90,
    fecha: "2025-05-20",
    titulo: "La Revolución Francesa",
  },
  {
    puntaje: 78,
    fecha: "2025-05-20",
    titulo: "Cuentos de Poe",
  },
  {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },
    {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },
    {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },
    {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },
    {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },
    {
    puntaje: 92,
    fecha: "2025-05-20",
    titulo: "Arte del Renacimiento",
  },
  {
    puntaje: 88,
    fecha: "2025-05-20",
    titulo: "El sistema solar",
  },
  {
    puntaje: 95,
    fecha: "2025-05-21",
    titulo: "Mitología griega",
  },
  {
    puntaje: 80,
    fecha: "2025-05-21",
    titulo: "Fábulas clásicas",
  },

];


const PerfilPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/perfil`);
        const data = await res.json();
        console.log("Data del perfil:", data);
        setUserData({
          username: data.username,
          registeredDate: new Date(data.registeredDate).toLocaleDateString(
            "es-PE",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          ),
          avatar: data.avatarUrl,
          stats: [
            {
              icon: "/books.svg",
              value: data.stats.lecturasLeidas,
              label: "N° de lecturas leídas",
            },
            {
              icon: "/xp.svg",
              value: `${data.stats.experiencia} XP`,
              label: "Experiencia total conseguida",
            },
            {
              icon: "/trophy.svg",
              value: data.stats.vecesTop3,
              label: "N° de veces en el top 3",
            },
            {
              icon: "/streak.svg",
              value: data.stats.diasRacha,
              label: "días de racha",
            },
          ],
          badges: data.badges,
          desempeno: data.desempeno,
          categoriasLeidas: data.categoriasLeidas,
          promedioPorCategoria: data.promedioPorCategoria,
          evolucionLectura: data.evolucionLectura,
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">No se pudo cargar el perfil.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1050px] mx-auto px-8 pb-12 flex flex-col items-center gap-6 sm:gap-12">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-4 w-full">
          <img
            src={userData.avatar}
            alt="userProfile"
            className="w-[90px] h-[90px] lg:w-[160px] lg:h-[160px] rounded-lg object-cover"
          />
          <h1 className="lg:text-[40px] font-bold text-negro text-center text-2xl md:text-[30px]">
            {userData.username}
          </h1>
          <p className="text-md text-gray-500 font-semibold text-center">
            Registrado el {userData.registeredDate}
          </p>
        </div>

        {/* Estadísticas */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-300"
              >
                <img src={stat.icon} alt="icon" className="w-10 h-10" />
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insignias */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Insignias</h2>
          <div className="flex gap-8 items-center rounded-xl border border-gris overflow-auto p-4">
            {userData.badges.length > 0 ? (
              userData.badges.map((badge, index) => (
                <img
                  key={index}
                  src={badge}
                  alt={`badge-${index}`}
                  className="w-[50px] h-[50px]"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">
                Aún no has ganado insignias.
              </p>
            )}
          </div>
        </div>

        {/* Gráficos (encabezado) */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Gráficos</h2>

          {/* Radar Chart */}
          <div className="w-full bg-white p-4 border rounded-xl">
            <RadarChart data={userData.desempeno} />
          </div>
          <div className="w-full bg-white p-4 border rounded-xl">
            <BarChart data={userData.categoriasLeidas} />
          </div>
          <div className="w-full bg-white p-4 border rounded-xl">
            <BarChart1 data={userData.promedioPorCategoria} />
          </div>
          <div className="w-full bg-white p-4 border rounded-xl">
            <EvolucionChart data={userData.evolucionLectura} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
