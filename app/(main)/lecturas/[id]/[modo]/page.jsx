"use client";

import { useEffect, useState } from "react";
import { Button, Progress } from "@heroui/react";
import { PreguntaSeleccion } from "@/components/pregunta-seleccion";
import { PreguntaCompletar } from "@/components/pregunta-completar";
import Retroalimentacion from "@/components/retroalimentacion";
import Link from "next/link";
import { useParams } from "next/navigation";

const ModoPage = () => {
  const { modo, id } = useParams(); // Detecta si el modo es 'aprendizaje'
  const [lectura, setLectura] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [puntajes, setPuntajes] = useState({}); // Guardar puntajes por desempeño
  const [loading, setLoading] = useState(true);
  const [pasoActual, setPasoActual] = useState(0);
  const [pasoAntesDeLectura, setPasoAntesDeLectura] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] =
    useState(false);
  const totalPasos = preguntas.length + 1; // +1 por la lectura
  //ñconsole.log("El total de pasos es: ", totalPasos);
  const [puntajeMaximo, setPuntajeMaximo] = useState(null);
  const [numeroReintento, setNumeroReintento] = useState(0);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const res = await fetch(`/api/lecturas/${id}`);
        if (!res.ok) throw new Error("Lectura no encontrada");
        const data = await res.json();
        console.log("La data es: ", data);
        setLectura(data.lectura);
        setPreguntas(data.preguntas);
        setPuntajeMaximo(data.puntajeMaximo);
        setNumeroReintento(data.ultimoReintento);
        console.log("El ultimo reintento es: ", data.ultimoReintento);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLectura();
  }, [id]);

  const avanzarPaso = () => {
    if (pasoActual === totalPasos - 1) {
      setMostrarRetroalimentacion(true);
    } else {
      setPasoActual((prev) => Math.min(prev + 1, totalPasos - 1));
    }
  };

  const retrocederPaso = () => setPasoActual((prev) => Math.max(prev - 1, 0)); //esto se hace para que no se pase del minimo de pasos
  const irALectura = () => {
    if (pasoActual !== 0) {
      setPasoAntesDeLectura(pasoActual);
      setPasoActual(0);
    }
  };
  const volverAPreguntaPendiente = () => {
    if (pasoAntesDeLectura !== null) {
      setPasoActual(pasoAntesDeLectura);
      setPasoAntesDeLectura(null); // una vez vuelto, lo limpio
    }
  };

  const registrarPuntaje = (desempeno, valor, totalPosible) => {
  setPuntajes((prev) => {
    const [prevObtenido = 0, prevTotal = 0] = prev[desempeno] || [];
    return {
      ...prev,
      [desempeno]: [prevObtenido + valor, prevTotal + totalPosible],
    };
  });
};


  if (loading || !lectura) return <p className="p-6">Cargando lectura...</p>;

  if (mostrarRetroalimentacion) {
    console.log("Respuestas: ", respuestas);
    return <Retroalimentacion puntajes={puntajes} respuestas={respuestas} lecturaId={lectura.id} lecturaCategoria={lectura.categoria} puntajeMaximo={puntajeMaximo} numeroReintento={numeroReintento} />;
  }

  // Layout lectura
  if (pasoActual === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header fijo */}
        <div className="flex p-4 items-center justify-between h-24 fixed top-0 w-full bg-white z-10 shadow">
          <div className="flex items-center">
            <img
              src={lectura.imagen}
              alt={lectura.titulo}
              className="w-[76px] h-[76px] object-cover"
            />
            <div className="px-4 py-2 rounded">
              <h1 className="hidden sm:block text-sm lg:text-lg font-normal">
                {lectura.titulo}
              </h1>
            </div>
          </div>
          {/* Iconos de comodines solo si el modo es aprendizaje */}
          {modo === "aprendizaje" && pasoActual === 0 ? (
            <div className="flex gap-8">
              <img src="/estructura.svg" alt="Lapiz" className="w-12 h-12" />
              <img src="/idea.svg" alt="Bombilla" className="w-12 h-12" />
              <img src="/estrella.svg" alt="Estrella" className="w-12 h-12" />
              <Link href="/lecturas">
                <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                  ←
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/lecturas">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                ←
              </Button>
            </Link>
          )}
        </div>

        {/* Contenido debajo del header */}
        <div className="mt-24 flex-1">
          {/* Contenido */}
          <div className="flex-1 px-6 py-4 lg:py-8 max-w-3xl mx-auto overflow-y-auto">
            <h2 className="text-base lg:text-2xl font-normal text-negro text-center">
              {lectura.titulo}
            </h2>
            <p className="text-xs lg:text-base leading-relaxed whitespace-pre-line font-normal text-justify py-6">
              {lectura.contenido}
            </p>
            {/* Botón de responder */}
            <div className="mx-auto flex justify-center">
              <Button
                onPress={
                  pasoAntesDeLectura !== null
                    ? volverAPreguntaPendiente
                    : avanzarPaso
                }
                className={`font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] lg:w-[222px] lg:h-[52px] transition text-white bg-verde hover:bg-verdeClar`}
              >
                {pasoAntesDeLectura !== null
                  ? "Volver a la pregunta"
                  : "Responder"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout pregunta
  const pregunta = preguntas[pasoActual - 1];
  const progreso = Math.round((pasoActual / (totalPasos - 1)) * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Header fijo */}
      <div className="flex p-4 items-center justify-between h-24 fixed top-0 w-full bg-white z-10 shadow">
        <div className="flex items-center">
          <img
            src={lectura.imagen}
            alt={lectura.titulo}
            className="w-[76px] h-[76px] object-cover"
          />
          <div className="px-4 py-2 rounded">
            <h1 className="hidden sm:block text-sm lg:text-lg font-normal">
              {lectura.titulo}
            </h1>
          </div>
        </div>
        {/* Iconos de comodines solo si el modo es aprendizaje */}
        {modo === "aprendizaje" && pasoActual === 0 ? (
          <div className="flex gap-8">
            <img src="/estructura.svg" alt="Lapiz" className="w-12 h-12" />
            <img src="/idea.svg" alt="Bombilla" className="w-12 h-12" />
            <img src="/estrella.svg" alt="Estrella" className="w-12 h-12" />
            <Link href="/lecturas">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                ←
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/lecturas">
            <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              ←
            </Button>
          </Link>
        )}
      </div>

      {/* Contenido debajo del header */}
      <div className="mt-24 flex-1">
        <div className="px-6 py-4 lg:py-8 max-w-3xl mx-auto h-full flex flex-col">
          {/* Progreso */}
          <div className="mb-5 lg:mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-normal text-negro">
                Dificultad: <span>{pregunta.dificultad}</span>
              </span>
              <p className="text-right text-sm font-normal text-negro">
                {pasoActual}/{totalPasos - 1}
              </p>
            </div>
            <Progress
              value={progreso}
              max={100}
              aria-label="Progreso de lectura"
              color={
                pregunta.dificultad === "Fácil"
                  ? "primary"
                  : pregunta.dificultad === "Media"
                  ? "warning"
                  : "danger"
              }
            />
          </div>

          {/* Tipo de pregunta */}
          {pregunta.tipo === "seleccion" ? (
            <PreguntaSeleccion
              pregunta={pregunta}
              setRespuesta={(valor) =>
                setRespuestas((prev) => ({ ...prev, [pregunta.id]: valor }))
              }
              onContinuar={avanzarPaso}
              volverALectura={irALectura}
              registrarPuntaje={registrarPuntaje}
              numeroReintento={numeroReintento}
            />
          ) : (
            <PreguntaCompletar
              pregunta={pregunta}
              setRespuesta={(valor) =>
                setRespuestas((prev) => ({ ...prev, [pregunta.id]: valor }))
              }
              onContinuar={avanzarPaso}
              volverALectura={irALectura}
              lecturaContenido={lectura.contenido}
              registrarPuntaje={registrarPuntaje}
              numeroReintento={numeroReintento}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModoPage;
