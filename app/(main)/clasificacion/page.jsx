"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";

export default function ClasificationTable() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const rowsPerPage = 8;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clasificacion");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    }

    fetchUsers();
  }, []);

  const pages = Math.ceil(users.length / rowsPerPage);

  const getMedal = (rank) => {
    if (rank === 1)
      return <img src="/gold.svg" alt="Gold Medal" className="w-6 h-6" />;
    if (rank === 2)
      return <img src="/silver.svg" alt="Silver Medal" className="w-6 h-6" />;
    if (rank === 3)
      return <img src="/bronze.svg" alt="Bronze Medal" className="w-6 h-6" />;
    return (
      <div className="w-6 h-6 flex justify-center items-center">
        <span className="text-verde font-semibold text-sm lg:text-lg mr-1">
          {rank}
        </span>
      </div>
    );
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
        <p className="text-md text-gray-500 font-semibold">
          Se reinicia en 1 semana
        </p>
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
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 transition h-[64px]"
                >
                  <TableCell>{getMedal(rank)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.imagen ? (
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-verde flex items-center justify-center text-sm font-semibold text-white">
                          {item.iniciales}
                        </div>
                      )}
                      <span className="text-sm lg:text-lg font-semibold text-negro">
                        {item.nombre}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-sm lg:text-lg ">
                    <span className="text-negro">{item.xp} XP</span>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
