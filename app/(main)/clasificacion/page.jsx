"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";

const users = [
  {
    key: "1",
    name: "Bruce Estrada Melgarejo",
    xp: 333,
    avatar: "/avatar1.svg",
  },
  { key: "2", name: "Kurisu Makise", xp: 295, avatar: "/avatar2.svg" },
  { key: "3", name: "Friend", xp: 256, avatar: "/avatar3.svg" },
  { key: "4", name: "Brandom", xp: 234, initials: "B" },
  { key: "5", name: "Astrid", xp: 178, initials: "A" },
  { key: "6", name: "Carlos Rodriguez", xp: 143, initials: "C" },
  { key: "7", name: "Esteban Alejo", xp: 98, initials: "E" },
  { key: "8", name: "Diana Carrillo", xp: 45, initials: "D" },
  { key: "9", name: "Kurisu Makise", xp: 43, avatar: "/avatar2.svg" },
  { key: "10", name: "Friend", xp: 40, avatar: "/avatar3.svg" },
  { key: "11", name: "Brandom", xp: 36, initials: "B" },
  { key: "12", name: "Astrid", xp: 20, initials: "A" },
  { key: "13", name: "Carlos Rodriguez", xp: 5, initials: "C" },
  { key: "14", name: "Esteban Alejo", xp: 4, initials: "E" },
  { key: "15", name: "Diana Carrillo", xp: 4, initials: "D" },
];

export default function ClasificationTable() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const pages = Math.ceil(users.length / rowsPerPage);

  const getMedal = (rank) => {
    if (rank === 1)
      return <img src="/gold.svg" alt="Gold Medal" className="w-6 h-6" />;
    if (rank === 2)
      return <img src="/silver.svg" alt="Silver Medal" className="w-6 h-6" />;
    if (rank === 3)
      return <img src="/bronze.svg" alt="Bronze Medal" className="w-6 h-6" />;
    return <div className="w-6 h-6 flex justify-center items-center"><span className="text-verde font-semibold text-sm lg:text-lg mr-1">{rank}</span></div>;
  };

  return (
    <div className="max-w-[1050px] mx-auto px-8">
      <div className="flex flex-col items-center mb-6 gap-4">
        <img
          src={"/trophy.svg"}
          alt={"Trophy"}
          className="w-[90px] h-[90px] rounded-lg object-cover"
        />
        <h1 className="lg:text-[40px] font-bold text-negro text-center text-2xl md:text-[30px]">
          Tabla de Clasificación
        </h1>
        <p className="text-md text-gray-500 font-semibold">Se reinicia en 1 semana</p>
      </div>

      <Table
        aria-label="Tabla de clasificación con paginación"
        hideHeader 
        removeWrapper 
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn className="text-sm">#</TableColumn>
          <TableColumn className="text-sm">NOMBRE</TableColumn>
          <TableColumn className="text-right text-sm">XP</TableColumn>
        </TableHeader>

        <TableBody>
          {users
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((item, index) => {
              const rank = (page - 1) * rowsPerPage + index + 1;
              return (
                <TableRow key={item.key} className="hover:bg-gray-100 transition h-[64px]">
                  <TableCell>{getMedal(rank)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-verde flex items-center justify-center text-sm font-semibold text-white">
                          {item.initials}
                        </div>
                      )}
                      <span className="text-sm lg:text-lg font-semibold text-negro">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-sm lg:text-lg "><span className="text-negro">{item.xp} XP</span></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
