import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { lectura, pregunta } from "@/db/schema";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const lecturaResult = await db
    .select()
    .from(lectura)
    .where(eq(lectura.id, parseInt(params.id)))
    .limit(1);

  const preguntasResult = await db
    .select()
    .from(pregunta)
    .where(eq(pregunta.lecturaId, parseInt(params.id)));

  return Response.json({
    lectura: lecturaResult[0],
    preguntas: preguntasResult,
  });
}
