import { useState } from "react";
import { Button } from "@heroui/react";

export const PreguntaCompletar = ({
  pregunta,
  seleccion,
  setRespuesta,
  onContinuar,
  volverALectura,
  lecturaContenido,
}) => {
  const [verificado, setVerificado] = useState(false);
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleVerificar = async () => {
    if (!seleccion || seleccion.trim() === "") return;

    setCargando(true);

    try {
      const res = await fetch("/api/analizar-respuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lecturaContenido,
          preguntaContenido: pregunta.contenido,
          preguntaTipoDeCorreccion: pregunta.tipoCorreccion, // debe ser "objetiva" o "subjetiva"
          respuestaContenido: seleccion,
        }),
      });

      const data = await res.json();
      console.log("La data de la respuesta es: ", data);

      if (!res.ok) {
        setRetroalimentacion("Ocurrió un error al analizar la respuesta.");
        console.error(data?.detalle || data?.error);
      } else {
        // Mostrar la retroalimentación del modelo
        setRetroalimentacion(data.retroalimentacion || "Respuesta registrada.");

        // También podrías guardar 'esCorrecta' o 'nivel' si lo necesitas más adelante
        // console.log(data.esCorrecta || data.nivel);
      }

      setVerificado(true);
    } catch (error) {
      console.error(error);
      setRetroalimentacion("Error de red al verificar la respuesta.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 text-xs lg:text-base">
      <h2 className="text-lg lg:text-2xl font-normal mb-5 lg:mb-10 text-center">
        {pregunta.contenido}
      </h2>

      <div className="space-y-4 mb-8 h-full">
        <textarea
          disabled={verificado}
          className="w-full h-full border border-gris rounded-lg p-2 focus:outline-none resize-none"
          placeholder="Escribe tu respuesta aquí..."
          value={seleccion || ""}
          onChange={(e) => setRespuesta(e.target.value)}
        />
      </div>

      {verificado && (
        <div className="border-2 rounded-xl px-4 py-3 mb-6 text-center text-sm font-medium border-verde text-verde bg-white">
          {retroalimentacion}
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
