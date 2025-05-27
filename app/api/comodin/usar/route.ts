// /app/api/comodin/usar/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { comodinUsuario, comodinLecturaUsuario } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { lecturaId, tipoComodinId } = await req.json();
  console.log("Datos recibidos:", { lecturaId, tipoComodinId });
  const { userId } = await auth(); // Clerk en server-side

  // 1. Verificar si el usuario tiene ese comodín disponible
  const [registroComodin] = await db
    .select()
    .from(comodinUsuario)
    .where(
      and(
        eq(comodinUsuario.usuarioId, userId),
        eq(comodinUsuario.tipoComodinId, tipoComodinId)
      )
    );

  if (!registroComodin || registroComodin.cantidad <= 0) {
    return NextResponse.json(
      { error: "No tienes comodines disponibles de este tipo" },
      { status: 400 }
    );
  }

  // 2. Verificar si ya se usó ese comodín para esta lectura
  const yaUsado = await db
    .select()
    .from(comodinLecturaUsuario)
    .where(
      and(
        eq(comodinLecturaUsuario.usuarioId, userId),
        eq(comodinLecturaUsuario.lecturaId, lecturaId),
        eq(comodinLecturaUsuario.tipoComodinId, tipoComodinId)
      )
    );

  if (yaUsado.length > 0) {
    return NextResponse.json(
      { error: "Ya usaste este comodín para esta lectura" },
      { status: 400 }
    );
  }

  // 3. Registrar el uso del comodín
  await db.insert(comodinLecturaUsuario).values({
    usuarioId: userId,
    lecturaId,
    tipoComodinId,
  });

  // 4. Actualizar la cantidad en comodinUsuario
  await db
    .update(comodinUsuario)
    .set({ cantidad: registroComodin.cantidad - 1 })
    .where(eq(comodinUsuario.id, registroComodin.id));

  return NextResponse.json({ mensaje: "Comodín usado exitosamente" });
}
