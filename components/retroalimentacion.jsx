"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Racoon from "@/public/racoon.json";

// Mapeo fijo de desempeños
const desempenosTextos = {
  1: "1. Identificación de información relevante y complementaria",
  2: "2. Explicación de tema, subtemas y propósito comunicativo",
  3: "3. Deducción de relaciones lógicas",
  4: "4. Interpretación de intenciones y puntos de vista del autor",
  5: "5. Opinión crítica sobre el contenido y la organización textual",
  6: "6. Justificación de preferencias",
};

const columns = [
  {
    key: "desempeno",
    label: "Desempeño",
  },
  {
    key: "experiencia",
    label: "Experiencia",
  },
  {
    key: "efectividad",
    label: "Efectividad",
  },
];

export default function Retroalimentacion({ puntajes, respuestas }) {
  const router = useRouter();

  // Construimos filas dinámicamente desde puntajes
  const rows = Object.entries(desempenosTextos).map(([id, texto]) => {
    const [obtenido, total] = puntajes?.[id] || [0, 0];
    const efectividad =
      total > 0 ? ((obtenido / total) * 100).toFixed(1) : "0.0";

    return {
      key: id,
      desempeno: texto,
      experiencia: `${obtenido} XP de ${total}`,
      efectividad: `${efectividad}%`,
    };
  });

  // Cálculo global
  const XP_TOTAL = rows.reduce((acc, row) => {
    const match = row.experiencia.match(/de (\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  const XP_OBTENIDA = rows.reduce((acc, row) => {
    const match = row.experiencia.match(/(\d+) XP/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  const EFECTIVIDAD =
    XP_TOTAL > 0 ? ((XP_OBTENIDA / XP_TOTAL) * 100).toFixed(1) : "0.0";

  const desempenosBajos = rows
    .filter((row) => parseFloat(row.efectividad) <= 50)
    .map((row) => row.key)
    .join(", ");

  const mensajeDesempenos =
    desempenosBajos.length > 0
      ? `¡Buen trabajo! Ganaste ${XP_OBTENIDA} puntos de experiencia. Practicar más los desempeños ${desempenosBajos} para mejorar aún más.`
      : `¡Excelente trabajo! Ganaste ${XP_OBTENIDA} puntos de experiencia y todos los desempeños están en buen nivel.`;

  return (
    <div className="max-w-3xl mx-auto text-center px-6 pb-4 lg:pb-8 h-full flex flex-col justify-between">
      <div className="flex items-center justify-around gap-4">
        <Lottie
          animationData={Racoon}
          className="w-[150px] h-[150px] lg:w-[200px] lg:h-[180px]"
        />

        <span className="text-verde font-bold text-xl sm:text-4xl lg:text-[54px] border border-verde rounded-xl px-2">
          {XP_OBTENIDA} XP
          <span className="text-xs sm:text-sm lg:text-base font-normal">
            de {XP_TOTAL}
          </span>
        </span>
        <span className="text-amarillo font-bold text-xl sm:text-4xl lg:text-[54px] border border-amarillo rounded-xl px-2">
          {EFECTIVIDAD}%
        </span>
      </div>

      <Table
        isVirtualized
        aria-label="Tabla de retroalimentación de desempeños"
        maxTableHeight={440}
        rowHeight={60}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <p className="mt-6 text-[16px] text-left border border-[#3979D9] rounded-md p-3 text-[#3979D9]">
        {mensajeDesempenos}
      </p>

      <div className="flex justify-end">
        <Button
          className="mt-6 bg-verde text-white w-[222px] h-[52px] text-sm lg:text-lg "
          onPress={async () => {
            try {
              await fetch("/api/respuestas", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(respuestas), // arreglo completo
              });

              router.push("/lecturas");
            } catch (error) {
              console.error("Error al enviar respuestas:", error);
              alert(
                "Ocurrió un error al guardar tus respuestas. Intenta nuevamente."
              );
            }
          }}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
