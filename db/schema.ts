import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usuario = pgTable("usuario", {
  id: text("id").primaryKey(), // Este es el ID que viene desde Clerk
  nombre: text("nombre").notNull(),
  correo: text("correo").notNull(),
  fechaCreacion: timestamp("fecha_creacion", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export const lectura = pgTable("lectura", {
  id: serial("id").primaryKey(),
  titulo: varchar("titulo", { length: 200 }).notNull(),
  descripcion: text("descripcion").notNull(),
  contenido: text("contenido").notNull(),
  imagen: varchar("imagen", { length: 255 }).notNull(),
  tipoTexto: varchar("tipo_texto", { length: 100 }).notNull(),
  categoria: varchar("categoria", { length: 100 }),
  nivelDificultad: varchar("nivel_dificultad", { length: 50 }),
});

export const desempeno = pgTable("desempeno", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion"),
});

export const desafio = pgTable("desafio", {
  id: serial("id").primaryKey(),
  descripcion: text("descripcion").notNull(),
  tipoObjetivo: varchar("tipo_objetivo", { length: 100 }),
  meta: integer("meta"),
  categoria: varchar("categoria", { length: 100 }),
  tipoTexto: varchar("tipo_texto", { length: 100 }),
  desempenoId: integer("desempeno_id").references(() => desempeno.id),
  imagenInsignia: varchar("imagen_insignia", { length: 255 }),
});

export const pregunta = pgTable("pregunta", {
  id: serial("id").primaryKey(),
  lecturaId: integer("lectura_id").references(() => lectura.id, {
    onDelete: "cascade",
  }),
  desempenoId: integer("desempeno_id").references(() => desempeno.id, {
    onDelete: "set null",
  }),
  enunciado: text("enunciado").notNull(),
  tipo: varchar("tipo", { length: 50 }),
});

export const alternativa = pgTable("alternativa", {
  id: serial("id").primaryKey(),
  preguntaId: integer("pregunta_id").references(() => pregunta.id, {
    onDelete: "cascade",
  }),
  texto: text("texto").notNull(),
  esCorrecta: boolean("es_correcta").notNull(),
});

export const respuesta = pgTable("respuesta", {
  id: serial("id").primaryKey(),
  preguntaId: integer("pregunta_id").references(() => pregunta.id, {
    onDelete: "cascade",
  }),
  usuarioId: varchar("usuario_id", { length: 255 }).references(
    () => usuario.id
  ),
  contenidoRespuesta: text("contenido_respuesta"),
  alternativaId: integer("alternativa_id").references(() => alternativa.id, {
    onDelete: "set null",
  }),
  retroalimentacion: text("retroalimentacion"),
  tipoCorreccion: varchar("tipo_correccion", { length: 100 }),
  resultado: varchar("resultado", { length: 100 }),
  puntajeObtenido: integer("puntaje_obtenido"),
  fechaRespuesta: timestamp("fecha_respuesta").defaultNow(),
  numeroReintento: integer("numero_reintento").default(0),
});

export const progresoDesafio = pgTable("progreso_desafio", {
  id: serial("id").primaryKey(),
  usuarioId: varchar("usuario_id", { length: 255 }).references(
    () => usuario.id
  ),
  desafioId: integer("desafio_id").references(() => desafio.id, {
    onDelete: "cascade",
  }),
  progreso: integer("progreso"),
  completado: boolean("completado").default(false),
  fechaLogro: timestamp("fecha_logro"),
});

// RELATIONS

export const usuarioRelations = relations(usuario, ({ many }) => ({
  respuestas: many(respuesta),
  progresoDesafios: many(progresoDesafio),
}));

export const lecturaRelations = relations(lectura, ({ many }) => ({
  preguntas: many(pregunta),
}));

export const desempenoRelations = relations(desempeno, ({ many }) => ({
  preguntas: many(pregunta),
  desafios: many(desafio),
}));

export const desafioRelations = relations(desafio, ({ one, many }) => ({
  desempeno: one(desempeno, {
    fields: [desafio.desempenoId],
    references: [desempeno.id],
  }),
  progresoDesafios: many(progresoDesafio),
}));

export const preguntaRelations = relations(pregunta, ({ one, many }) => ({
  lectura: one(lectura, {
    fields: [pregunta.lecturaId],
    references: [lectura.id],
  }),
  desempeno: one(desempeno, {
    fields: [pregunta.desempenoId],
    references: [desempeno.id],
  }),
  alternativas: many(alternativa),
  respuestas: many(respuesta),
}));

export const alternativaRelations = relations(alternativa, ({ one, many }) => ({
  pregunta: one(pregunta, {
    fields: [alternativa.preguntaId],
    references: [pregunta.id],
  }),
  respuestas: many(respuesta),
}));

export const respuestaRelations = relations(respuesta, ({ one }) => ({
  pregunta: one(pregunta, {
    fields: [respuesta.preguntaId],
    references: [pregunta.id],
  }),
  usuario: one(usuario, {
    fields: [respuesta.usuarioId],
    references: [usuario.id],
  }),
  alternativa: one(alternativa, {
    fields: [respuesta.alternativaId],
    references: [alternativa.id],
  }),
}));

export const progresoDesafioRelations = relations(
  progresoDesafio,
  ({ one }) => ({
    usuario: one(usuario, {
      fields: [progresoDesafio.usuarioId],
      references: [usuario.id],
    }),
    desafio: one(desafio, {
      fields: [progresoDesafio.desafioId],
      references: [desafio.id],
    }),
  })
);
