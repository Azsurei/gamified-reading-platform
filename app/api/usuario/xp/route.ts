// app/api/usuario/xp/route.ts
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { usuario } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("No autorizado", { status: 401 });
  }

  try {
    const { xpGanado } = await req.json();

    if (typeof xpGanado !== "number" || xpGanado <= 0) {
      return new Response("xpGanadoEnLectura inválido", { status: 400 });
    }

    // Actualiza xpGanado y xpGanadoTotal
    await db
      .update(usuario)
      .set({
        xpGanado: sql`${usuario.xpGanado} + ${xpGanado}`,
        xpGanadoTotal: sql`${usuario.xpGanadoTotal} + ${xpGanado}`,
      })
      .where(eq(usuario.id, userId));

    return new Response("XP actualizado correctamente", { status: 200 });
  } catch (error) {
    console.error("❌ Error actualizando XP:", error);
    return new Response("Error del servidor", { status: 500 });
  }
}
