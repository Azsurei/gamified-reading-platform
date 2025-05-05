"use client";

import { useRouter, useParams } from "next/navigation";

const ModoSeleccion = () => {
  const router = useRouter();
  const { id } = useParams(); // capturamos el [id] de la ruta

  const handleSelect = (modo) => {
    router.push(`/lecturas/${id}/${modo}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl lg:text-[40px] font-bold mb-10">Selecciona un modo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div
            className="bg-verde hover:bg-verdeClaro text-white rounded-xl p-6 cursor-pointer transition"
            onClick={() => handleSelect("aprendizaje")}
          >
            <h2 className="text-xl lg:text-[32px] font-semibold mb-2">Modo de aprendizaje</h2>
            <p className="text-sm lg:text-lg text-justify">
              En este modo podrás leer a tu ritmo con el apoyo de herramientas
              que te ayudarán a comprender mejor el texto. Este modo está
              pensado para explorar el contenido, identificar estructuras y
              mejorar tu comprensión sin presión. Ideal para practicar, aprender
              estrategias de lectura y reforzar tu análisis antes de enfrentarte
              a preguntas.
            </p>
          </div>
          <div
            className="bg-rojo hover:bg-rojoClaro text-white rounded-xl p-6 cursor-pointer transition"
            onClick={() => handleSelect("examen")}
          >
            <h2 className="text-xl lg:text-[32px] font-semibold mb-2">Modo examen</h2>
            <p className="text-sm lg:text-lg text-justify">
              Este modo simula una evaluación real. No podrás usar comodines ni
              recibir ayudas visuales durante la lectura. Es un entorno de
              desafío en el que deberás poner a prueba tus habilidades de
              comprensión lectora y resolver las preguntas solo con tu
              interpretación del texto. Perfecto para entrenar bajo condiciones
              similares a un examen y medir tu progreso con mayor precisión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModoSeleccion;
