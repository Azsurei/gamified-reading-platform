import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { usuario, comodinUsuario } from "@/db/schema"; // ajusta la ruta si es diferente
import { eq, and, sql } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db
      .select({
        xpGanadoTotal: usuario.xpGanadoTotal,
        xpGastado: usuario.xpGastado,
      })
      .from(usuario)
      .where(eq(usuario.id, userId))
      .limit(1);

    if (!result.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      xpGanadoTotal: result[0].xpGanadoTotal - result[0].xpGastado,
    });
  } catch (error) {
    console.error("Error fetching user XP:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tipoComodinId, costo, xpDisponible } = body;

    if (!tipoComodinId || typeof costo !== "number") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    if (xpDisponible < costo) {
      return NextResponse.json({ error: "XP insuficiente" }, { status: 400 });
    }

    // Actualizar xpGastado del usuario
    await db
      .update(usuario)
      .set({ xpGastado: sql`${usuario.xpGastado} + ${costo}` })
      .where(eq(usuario.id, userId));

    // Buscar si ya tiene ese comodín
    const comodinExistente = await db
      .select()
      .from(comodinUsuario)
      .where(
        and(
          eq(comodinUsuario.usuarioId, userId),
          eq(comodinUsuario.tipoComodinId, tipoComodinId)
        )
      )
      .limit(1);

    if (comodinExistente.length) {
      // Incrementar cantidad
      await db
        .update(comodinUsuario)
        .set({ cantidad: comodinExistente[0].cantidad + 1 })
        .where(eq(comodinUsuario.id, comodinExistente[0].id));
    } else {
      // Insertar nuevo registro
      await db.insert(comodinUsuario).values({
        usuarioId: userId,
        tipoComodinId,
        cantidad: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al procesar la compra de comodín:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
