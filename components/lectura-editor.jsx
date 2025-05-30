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

  // 1. Cargar selecciones desde localStorage SOLO si están vacías
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (selections.length === 0 && saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelections(parsed); // ✅ Solo cargamos si hay algo válido
        }
      } catch (e) {
        console.error("Error al cargar las selecciones guardadas:", e);
      }
    }
  }, [storageKey, setSelections, selections.length]);

  // 2. Guardar selecciones en localStorage cuando cambien
  useEffect(() => {
    if (selections.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(selections));
    }
  }, [selections, storageKey]);

  return (
    <Highlighter
      htmlString={htmlSeguro}
      className="whitespace-pre-wrap break-words leading-relaxed p-4 min-h-[200px] bg-white text-justify z-0"
    />
  );
}
