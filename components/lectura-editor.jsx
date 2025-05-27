import React, { useMemo, useState } from "react";
import { Highlighter, SelectionProvider } from "react-selection-highlighter";
import "../components/styles.css";

export function ResaltadorTexto({ lectura }) {
  const htmlSeguro = useMemo(() => `<div>${lectura.contenido}</div>`, [lectura.contenido]);
  const [resaltados, setResaltados] = useState([]);

  const handleAddHighlight = (highlight) => {
    try {
      if (highlight.startIndex >= highlight.endIndex) return; // Validación
      setResaltados((prev) => [...prev, { ...highlight, color: "yellow" }]);
    } catch (error) {
      console.error("Error al resaltar:", error);
    }
  };

  return (
    <SelectionProvider>
      <Highlighter
        htmlString={htmlSeguro}
        highlights={resaltados}
        onAddHighlight={handleAddHighlight}
        className="whitespace-pre-wrap break-words leading-relaxed p-4 min-h-[200px] bg-white text-justify z-0"
      />
    </SelectionProvider>
  );
}
