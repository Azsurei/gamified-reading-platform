import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

export const PreguntaCompletar = ({
  pregunta,
  setRespuesta,
  onContinuar,
  volverALectura,
  lecturaContenido,
  registrarPuntaje,
}) => {
  const [respuestaTexto, setRespuestaTexto] = useState("");
  const [verificado, setVerificado] = useState(false);
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resultadoCorreccion, setResultadoCorreccion] = useState(null);

  useEffect(() => {
    // Reiniciar estados cuando cambia la pregunta
    setVerificado(false);
    setResultadoCorreccion(null);
    setRespuestaTexto("");
    setRetroalimentacion("");
  }, [pregunta.id]);

  const handleVerificar = async () => {
    if (!respuestaTexto.trim()) return;
    setCargando(true);

    try {
      console.log("Paso aca");
      const res = await fetch("/api/analizar-respuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lecturaContenido,
          preguntaContenido: pregunta.contenido,
          preguntaTipoDeCorreccion: pregunta.tipoCorreccion, // debe ser "objetiva" o "subjetiva"
          respuestaContenido: respuestaTexto,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRetroalimentacion("Ocurrió un error al analizar la respuesta.");
        console.error(data?.detalle || data?.error);
      } else {
        const retro = data.retroalimentacion || "Respuesta registrada.";
        setRetroalimentacion(retro);

        let resultado = "";
        let puntaje = 0;

        if (pregunta.tipoCorreccion === "objetivo") {
          resultado = data.esCorrecta ? "correcto" : "incorrecto";
          puntaje = data.esCorrecta ? 10 : 0;
        } else {
          resultado = data.nivel; // "alto", "medio", "bajo"
          puntaje = resultado === "alto" ? 10 : resultado === "medio" ? 5 : 0;
        }

        setResultadoCorreccion(resultado);
        registrarPuntaje(pregunta.desempenoId, puntaje, 10);

        // Guardar la respuesta completa
        setRespuesta({
          preguntaId: pregunta.id,
          contenidoRespuesta: respuestaTexto,
          retroalimentacion: retro,
          resultado: resultado,
          puntajeObtenido: puntaje,
        });
      }
      setVerificado(true);
    } catch (error) {
      console.error(error);
      setRetroalimentacion("Error de red al verificar la respuesta.");
    } finally {
      setCargando(false);
    }
  };

  // Determinar estilos según resultadoCorreccion
  const getCorreccionStyles = () => {
    switch (resultadoCorreccion) {
      case "correcto":
      case "alto":
        return "border-verde text-verde";
      case "medio":
        return "border-amarillo text-amarillo";
      case "incorrecto":
        return "border-rojo text-rojo";
      case "bajo":
        return "border-orange-500 text-orange-500";
      default:
        return "border-verde text-verde";
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
          value={respuestaTexto}
          onChange={(e) => setRespuestaTexto(e.target.value)}
        />
      </div>

      {verificado && (
        <div
          className={`border-2 rounded-xl px-4 py-3 mb-6 text-justify text-sm font-medium bg-white ${getCorreccionStyles()}`}
        >
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
