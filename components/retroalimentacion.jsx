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

export default function Retroalimentacion({
  puntajes,
  respuestas,
  lecturaId,
  lecturaCategoria,
  puntajeMaximo,
}) {
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

  // Calculamos incremento XP real (igual que en finalizarLectura)
  const incrementoXP =
    puntajeMaximo !== null && puntajeMaximo < XP_OBTENIDA
      ? XP_OBTENIDA - puntajeMaximo
      : puntajeMaximo === null
      ? XP_OBTENIDA
      : 0;

  const desempenosBajos = rows
    .filter((row) => parseFloat(row.efectividad) <= 50)
    .map((row) => row.key)
    .join(", ");

  // Mensaje adaptado con incrementoXP y condición de puntajeMaximo
  const mensajeDesempenos =
  puntajeMaximo === null
    ? desempenosBajos.length > 0
      ? `¡Buen trabajo! Ganaste ${incrementoXP} puntos de experiencia esta vez. Practica más los desempeños ${desempenosBajos} para mejorar aún más.`
      : `¡Excelente trabajo! Ganaste ${incrementoXP} puntos de experiencia esta vez y todos los desempeños están en buen nivel.`
    : incrementoXP === 0
    ? desempenosBajos.length > 0
      ? `¡Buen trabajo! Esta vez no ganaste puntos de experiencia porque ya habías conseguido un puntaje mayor en un intento anterior. Practica más los desempeños ${desempenosBajos} para mejorar aún más.`
      : `¡Buen intento! Esta vez no ganaste puntos de experiencia porque ya habías alcanzado o superado este puntaje en un intento previo, pero todos los desempeños están en buen nivel.`
    : desempenosBajos.length > 0
    ? `¡Súper! Ganaste ${incrementoXP} puntos de experiencia adicionales por mejorar tu puntaje. Aún puedes reforzar los desempeños ${desempenosBajos} para hacerlo perfecto.`
    : `¡Increíble! Ganaste ${incrementoXP} puntos de experiencia adicionales por mejorar tu puntaje y todos los desempeños están en excelente nivel.`;


  async function finalizarLectura() {
    try {
      // 1. Guardar respuestas
      await fetch("/api/respuestas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuestas),
      });

      // 2. Registrar lectura completada
      await fetch("/api/lectura-completada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lecturaId, xpGanado: XP_OBTENIDA }),
      });

      // 3. Actualizar XP del usuario solo si hay incremento
      if (incrementoXP > 0) {
        await fetch("/api/usuario/xp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ xpGanado: incrementoXP }),
        });
      }

      // 4. Procesar desafíos desde el frontend
      // Desafío de lectura perfecta
      if (XP_OBTENIDA === XP_TOTAL) {
        await fetch("/api/desafios/progreso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipoObjetivo: "lecturas_perfectas",
            lecturaId,
          }),
        });
      }

      // Desafíos por categoría
      await fetch("/api/desafios/progreso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoObjetivo: "categoria",
          lecturaId,
          categoria: lecturaCategoria,
        }),
      });

      // Desafíos por desempeño (verificamos cuáles fueron perfectos)
      for (const [clave, [xpObtenido, xpTotal]] of Object.entries(puntajes)) {
        if (xpObtenido === xpTotal && xpTotal > 0) {
          await fetch("/api/desafios/progreso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tipoObjetivo: "desempeno_perfecto",
              lecturaId,
              desempenoId: parseInt(clave),
            }),
          });
        }
      }

      router.push("/lecturas");
    } catch (error) {
      console.error("Error al finalizar la lectura:", error);
    }
  }

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
          onPress={finalizarLectura}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
