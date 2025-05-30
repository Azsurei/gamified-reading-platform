import React, { useMemo, useEffect } from "react";
import {
  Highlighter,
  SelectionProvider,
  useSelections,
} from "react-selection-highlighter";
import "../components/styles.css";

export function ResaltadorTexto({ lectura }) {
  const htmlSeguro = useMemo(
    () => `<div>${lectura.contenido}</div>`,
    [lectura.contenido]
  );
  const storageKey = `resaltado-${lectura.id}`;

  return (
    <SelectionProvider>
      <ContenidoResaltable htmlSeguro={htmlSeguro} storageKey={storageKey} />
    </SelectionProvider>
  );
}

function ContenidoResaltable({ htmlSeguro, storageKey }) {
  const { selections, setSelections } = useSelections();

  // ✅ Flag para evitar múltiples cargas desde localStorage
  const hasLoadedRef = React.useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setSelections(parsed);
          }
        } catch (e) {
          console.error("Error al cargar las selecciones guardadas:", e);
        }
      }
      hasLoadedRef.current = true; // ✅ Marcar como ya cargado
    }
  }, [storageKey, setSelections]);

  useEffect(() => {
    console.log("Guardando selecciones:", selections);
    if (selections.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(selections));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [selections, storageKey]);

  return (
    <Highlighter
      htmlString={htmlSeguro}
      className="whitespace-pre-wrap break-words leading-relaxed p-4 min-h-[200px] bg-white text-justify z-0"
    />
  );
}
