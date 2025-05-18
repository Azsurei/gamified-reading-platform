import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

const letras = ["A", "B", "C", "D"];

export const PreguntaSeleccion = ({
  pregunta,
  seleccion,
  setRespuesta,
  onContinuar,
  volverALectura,
  registrarPuntaje,
}) => {
  const [verificado, setVerificado] = useState(false);
  const [esCorrecta, setEsCorrecta] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null); // nuevo estado local

  useEffect(() => {
    // Reiniciar estados cuando cambia la pregunta
    setVerificado(false);
    setEsCorrecta(false);
    setRespuestaSeleccionada(null);
  }, [pregunta.id]);

  const handleVerificar = () => {
    if (!respuestaSeleccionada) return;

    const correcta = respuestaSeleccionada.alternativaId === pregunta.respuestaCorrecta;
    setEsCorrecta(correcta);
    setVerificado(true);

    const puntaje = correcta ? 10 : 0;
    registrarPuntaje(pregunta.desempenoId, puntaje, 10);

    setRespuesta({
      preguntaId: pregunta.id,
      contenidoRespuesta: respuestaSeleccionada.contenidoRespuesta,
      alternativaId: respuestaSeleccionada.alternativaId,
      resultado: correcta ? "correcto" : "incorrecto",
      puntajeObtenido: puntaje,
    });
  };

  return (
    <div className="flex flex-col justify-between flex-1 text-xs lg:text-base">
      <h2 className="text-lg lg:text-2xl font-normal mb-5 lg:mb-10 text-center">
        {pregunta.contenido}
      </h2>

      <div className="space-y-4 mb-8">
        {pregunta.alternativas.map((alt, idx) => (
          <button
            key={alt.id}
            onClick={() => {
              if (!verificado) {
                setRespuestaSeleccionada({
                  contenidoRespuesta: alt.texto,
                  alternativaId: alt.id,
                });
              }
            }}
            className={`w-full flex items-start p-4 border rounded-xl text-left transition ${
              respuestaSeleccionada?.alternativaId === alt.id
                ? "border-verde bg-verdeClaro text-white"
                : "border-gris"
            } ${
              verificado && respuestaSeleccionada?.alternativaId !== alt.id
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={verificado}
          >
            <div className="flex items-center gap-2.5">
              <div className="font-normal border w-[30px] h-[30px] rounded-xl flex justify-center items-center border-gris">
                {letras[idx]}
              </div>
              <div className="flex-1">{alt.texto}</div>
            </div>
          </button>
        ))}
      </div>

      {verificado && (
        <div
          className={`border-2 rounded-xl px-4 py-3 mb-6 text-center text-sm font-medium ${
            esCorrecta ? "border-verde text-verde" : "border-rojo text-rojo"
          } bg-white`}
        >
          {esCorrecta ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
        </div>
      )}

      <div className={`flex ${verificado ? "justify-end" : "justify-between"}`}>
        {!verificado && (
          <Button
            variant="ghost"
            onPress={volverALectura}
            className="font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] text-gris border-gris hover:bg-grisClaro lg:w-[222px] lg:h-[52px]"
          >
            Volver a la lectura
          </Button>
        )}
        <Button
          onPress={verificado ? onContinuar : handleVerificar}
          className="font-semibold px-6 py-3 rounded-lg text-xs lg:text-lg w-[150px] h-[44px] lg:w-[222px] lg:h-[52px] text-white bg-verde hover:bg-verdeClaro"
        >
          {verificado ? "Continuar" : "Verificar"}
        </Button>
      </div>
    </div>
  );
};
