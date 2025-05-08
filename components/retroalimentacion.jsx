// components/Retroalimentacion.tsx
"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,Button
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const XP_TOTAL = 140;
const XP_OBTENIDA = 76;
const EFECTIVIDAD = ((XP_OBTENIDA / XP_TOTAL) * 100).toFixed(1);

const rows = [
  {
    key: "1",
    desempeno: "1. Identificación de información relevante y complementaria",
    experiencia: "16 XP de 20",
    efectividad: "80%",
  },
  {
    key: "2",
    desempeno: "2. Explicación de tema, subtemas y propósito comunicativo",
    experiencia: "20 XP de 40",
    efectividad: "50%",
  },
  {
    key: "3",
    desempeno: "3. Deducción de relaciones lógicas",
    experiencia: "10 XP de 20",
    efectividad: "50%",
  },
  {
    key: "4",
    desempeno: "4. Interpretación de intenciones y puntos de vista del autor",
    experiencia: "10 XP de 20",
    efectividad: "50%",
  },
  {
    key: "5",
    desempeno: "5. Opinión crítica sobre el contenido y la organización textual",
    experiencia: "10 XP de 20",
    efectividad: "50%",
  },
  {
    key: "6",
    desempeno: "6. Justificación de preferencias",
    experiencia: "10 XP de 20",
    efectividad: "50%",
  },
];

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

export default function Retroalimentacion() {
  const router = useRouter();

  const desempenosBajos = rows
    .filter((row) => parseInt(row.efectividad) < 100)
    .map((row) => row.key)
    .join(", ");

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">
        El horizonte de eventos: la frontera que marca el destino
      </h2>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10 my-6">
        <Image src="/images/raccoon.png" alt="Mapache" width={80} height={80} />
        <div className="flex items-center gap-4">
          <span className="text-verde font-bold text-2xl">
            {XP_OBTENIDA} XP <span className="text-base font-normal">de {XP_TOTAL}</span>
          </span>
          <span className="text-amarillo font-bold text-2xl">{EFECTIVIDAD}%</span>
        </div>
      </div>

      <Table aria-label="Tabla de retroalimentación de desempeños">
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

      <p className="mt-6 text-sm text-left border border-[#3979D9] rounded-md p-3 text-[#3979D9]">
        ¡Buen trabajo! Ganaste {XP_OBTENIDA} puntos de experiencia. Practicar más los desempeños {desempenosBajos} para mejorar aún más.
      </p>

      <Button
        className="mt-6 bg-verde text-white w-[222px] h-[52px] text-sm lg:text-lg"
        onPress={() => router.push("/lecturas")}
      >
        Finalizar
      </Button>
    </div>
  );
}
