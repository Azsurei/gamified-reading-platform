"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@heroui/react";
import { PreguntaSeleccion } from "@/components/pregunta-seleccion";
import { PreguntaCompletar } from "@/components/pregunta-completar";
import Retroalimentacion from "@/components/retroalimentacion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ResaltadorTexto } from "@/components/lectura-editor";

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
  const [comodines, setComodines] = useState([]);
  const [comodinActivo, setComodinActivo] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();
  const [inventarioComodin1, setInventarioComodin1] = useState(null);
  const [inventarioComodin2, setInventarioComodin2] = useState(null);
  const [inventarioComodin3, setInventarioComodin3] = useState(null);
  const [comodinesUsados, setComodinesUsados] = useState([]);
  const [comodinPendiente, setComodinPendiente] = useState(null);
  const [comodinesYaComprados, setComodinesYaComprados] = useState([]);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const res = await fetch(`/api/lecturas/${id}`);
        if (!res.ok) throw new Error("Lectura no encontrada");
        const data = await res.json();
        setLectura(data.lectura);
        setPreguntas(data.preguntas);
        setPuntajeMaximo(data.puntajeMaximo);
        setNumeroReintento(data.ultimoReintento);

        // Si es modo aprendizaje, trae también los comodines
        if (modo === "aprendizaje") {
          const comodinesRes = await fetch(`/api/lecturas/${id}/comodines`);
          if (comodinesRes.ok) {
            const comodinesData = await comodinesRes.json();
            setComodines(comodinesData.comodines);
            setInventarioComodin1(comodinesData.inventarioComodin1);
            setInventarioComodin2(comodinesData.inventarioComodin2);
            setInventarioComodin3(comodinesData.inventarioComodin3);
            setComodinesYaComprados(comodinesData.comodinesComprados);
            console.log("Comodines obtenidos:", comodinesData);
          } else {
            console.warn("No se pudieron obtener los comodines");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLectura();
  }, [id, modo]);

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

  const abrirComodin = (tipo) => {
    const encontrado = comodines.find((c) => c.tipoComodinId === tipo);
    if (comodinesYaComprados.includes(tipo)) {
      // ✅ si ya fue comprado, se omite el modal de compra)
      setComodinActivo(encontrado);
      onOpen();
    }

    let disponible = false;
    if (tipo === 1 && inventarioComodin1 > 0) disponible = true;
    if (tipo === 2 && inventarioComodin2 > 0) disponible = true;
    if (tipo === 3 && inventarioComodin3 > 0) disponible = true;

    if (!encontrado || !disponible) return;

    setComodinActivo(encontrado);

    if (comodinesUsados.includes(tipo)) {
      // Ya fue usado, se abre directamente el modal del comodín
      onOpen();
    } else {
      // Aún no ha sido usado, se abre el modal de confirmación
      setComodinPendiente(tipo);
      onOpen1();
    }
  };

  const confirmarUso = async () => {
    if (comodinPendiente !== null) {
      // Optimismo UI: se actualiza la interfaz inmediatamente
      setComodinesUsados((prev) => [...prev, comodinPendiente]);
      onOpen();
      setComodinPendiente(null);

      // Hacer el POST en segundo plano
      try {
        const res = await fetch("/api/comodin/usar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lecturaId: lectura.id,
            tipoComodinId: comodinPendiente,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error al usar comodín:", data.error);
          // Aquí podrías revertir el estado si es crítico
          // o simplemente mostrar un toast de error
        }
      } catch (err) {
        console.error("Error de red al usar comodín:", err);
        // Igual: podrías notificar al usuario o intentar reintentar
      }
    }
  };

  const comodinObtenido = (tipoComodinId) => {
    return (
      comodinesYaComprados.includes(tipoComodinId) ||
      comodinesUsados.includes(tipoComodinId)
    );
  };

  if (loading || !lectura) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (mostrarRetroalimentacion) {
    console.log("Respuestas: ", respuestas);
    return (
      <Retroalimentacion
        puntajes={puntajes}
        respuestas={respuestas}
        lecturaId={lectura.id}
        lecturaCategoria={lectura.categoria}
        puntajeMaximo={puntajeMaximo}
        numeroReintento={numeroReintento}
      />
    );
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
              {[1, 2, 3].map((id) => {
                const icon =
                  id === 1
                    ? "/estrella.svg"
                    : id === 2
                    ? "/idea.svg"
                    : "/estructura.svg";
                const inventario =
                  id === 1
                    ? inventarioComodin1
                    : id === 2
                    ? inventarioComodin2
                    : inventarioComodin3;

                return (
                  <div className="relative" key={id}>
                    <img
                      src={icon}
                      alt={`Comodín ${id}`}
                      className="w-12 h-12 cursor-pointer"
                      onClick={() => abrirComodin(id)}
                    />
                    <div className="absolute top-0 -right-1">
                      <span className="text-xs text-white bg-green-500 rounded-full px-1">
                        {comodinObtenido(id) ? "✔" : inventario ?? 0}
                      </span>
                    </div>
                  </div>
                );
              })}

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
          <div className="flex-1 px-6 py-4 lg:py-8 max-w-3xl mx-auto overflow-y-auto z-0">
            <h2 className="text-base lg:text-2xl font-normal text-negro text-center">
              {lectura.titulo}
            </h2>
            <ResaltadorTexto lectura={lectura} />

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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {comodinActivo?.tipoComodinId === 1
                    ? "Resumen"
                    : comodinActivo?.tipoComodinId === 2
                    ? "Idea Principal"
                    : "Palabras Clave"}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm whitespace-pre-line">
                    {comodinActivo?.tipoComodinId === 1
                      ? comodinActivo?.resumenTexto
                      : comodinActivo?.tipoComodinId === 2
                      ? comodinActivo?.ideaPrincipal
                      : comodinActivo?.palabrasClave.join(", ") ||
                        "Contenido no disponible"}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Cerrar</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpen1} onOpenChange={onOpenChange1}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>¿Usar comodín?</ModalHeader>
                <ModalBody>
                  <p>
                    ¿Estás seguro de que quieres usar este comodín? Solo podrás
                    usarlo una vez.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      setComodinPendiente(null);
                      onClose();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      confirmarUso();
                      onClose();
                    }}
                  >
                    Sí, usar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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

        <Link href="/lecturas">
          <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            ←
          </Button>
        </Link>
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
