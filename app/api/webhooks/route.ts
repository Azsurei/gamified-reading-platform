// app/api/webhooks/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { usuario, desafio, progresoDesafio } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`✅ Webhook recibido: ID ${id}, tipo: ${eventType}`);
    console.log("📦 Payload:", evt.data);

    if (evt.type === "user.created") {
      const user = evt.data;

      const nuevoUsuario = {
        id: user.id,
        nombre: `${user.first_name} ${user.last_name}`.trim(),
        correo: user.email_addresses[0]?.email_address ?? "",
        imagen: user.image_url ?? null,
        fechaCreacion: new Date(user.created_at),
      };

      await db.insert(usuario).values(nuevoUsuario);

      console.log("🆕 Usuario insertado en DB:", nuevoUsuario);

      // Obtener desafíos existentes
      const desafios = await db.select().from(desafio);

      // Crear progreso inicial para cada desafío
      const progresosIniciales = desafios.map((d) => ({
        usuarioId: user.id,
        desafioId: d.id,
        progreso: 0,
      }));

      if (progresosIniciales.length > 0) {
        await db.insert(progresoDesafio).values(progresosIniciales);
        console.log(
          `🎯 Progresos iniciales insertados para ${progresosIniciales.length} desafíos`
        );
      }
    } else if (eventType === "user.deleted") {
      await db.delete(usuario).where(eq(usuario.id, id));
      console.log(`🗑️ Usuario eliminado de DB: ${id}`);
    }

    return new Response("Webhook recibido", { status: 200 });
  } catch (err) {
    console.error("❌ Error verificando webhook:", err);
    return new Response("Error verificando webhook", { status: 400 });
  }
}
