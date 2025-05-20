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
  imagen: text("imagen"),
  fechaCreacion: timestamp("fecha_creacion", { mode: "date" })
    .defaultNow()
    .notNull(),
  xpGanadoTotal: integer("xp_ganado_total").default(0),
  xpGanado: integer("xp_ganado").default(0), // solo lo ganado por actividades
  xpGastado: integer("xp_gastado").default(0), // lo gastado en la tienda
  numeroTop3: integer("numero_top3").default(0),
});

export const lectura = pgTable("lectura", {
  id: serial("id").primaryKey(),
  titulo: varchar("titulo", { length: 200 }).notNull(),
  descripcion: text("descripcion").notNull(),
  contenido: text("contenido").notNull(),
  imagen: varchar("imagen", { length: 255 }).notNull(),
  tipoTexto: varchar("tipo_texto", { length: 100 }).notNull(),
  categoria: varchar("categoria", { length: 100 }),
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
  desempenoId: integer("desempeno_id").references(() => desempeno.id),
  imagenInsignia: varchar("imagen_insignia", { length: 255 }),
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

export const pregunta = pgTable("pregunta", {
  id: serial("id").primaryKey(),
  lecturaId: integer("lectura_id").references(() => lectura.id, {
    onDelete: "cascade",
  }),
  desempenoId: integer("desempeno_id").references(() => desempeno.id, {
    onDelete: "set null",
  }),
  enunciado: text("enunciado").notNull(),
  tipoCorreccion: varchar("tipo_correccion", { length: 100 }),
  tipo: varchar("tipo", { length: 50 }),
  nivelDificultad: varchar("nivel_dificultad", { length: 50 }),
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

  resultado: varchar("resultado", { length: 100 }),
  puntajeObtenido: integer("puntaje_obtenido"),
  fechaRespuesta: timestamp("fecha_respuesta").defaultNow(),
  numeroReintento: integer("numero_reintento").default(0),
});

export const tipoComodin = pgTable("tipo_comodin", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion").notNull(),
  costoXp: integer("costo_xp").notNull(),
  imagen: varchar("imagen", { length: 255 }),
});

export const comodinLectura = pgTable("comodin_lectura", {
  id: serial("id").primaryKey(),
  lecturaId: integer("lectura_id").references(() => lectura.id, {
    onDelete: "cascade",
  }),
  tipoComodinId: integer("tipo_comodin_id").references(() => tipoComodin.id, {
    onDelete: "cascade",
  }),
  estructuraTexto: text("estructura_texto"), // Ej. JSON o delimitado
  ideaPrincipal: text("idea_principal"),
  palabrasClave: text("palabras_clave"), // Ej. palabras separadas por coma
});

export const comodinUsuario = pgTable("comodin_usuario", {
  id: serial("id").primaryKey(),
  usuarioId: varchar("usuario_id", { length: 255 }).references(() => usuario.id),
  tipoComodinId: integer("tipo_comodin_id").references(() => tipoComodin.id),
  cantidad: integer("cantidad").default(0),
});

export const lecturaCompletada = pgTable("lectura_completada", {
  id: serial("id").primaryKey(),
  usuarioId: varchar("usuario_id", { length: 255 }).references(() => usuario.id),
  lecturaId: integer("lectura_id").references(() => lectura.id),
  fechaCompletado: timestamp("fecha_completado").defaultNow(),
  puntaje: integer("puntaje").default(0),
});

export const lecturaDesafioLog = pgTable("lectura_desafio_log", {
  id: serial("id").primaryKey(),
  usuarioId: varchar("usuario_id", { length: 255 }).references(() => usuario.id),
  desafioId: integer("desafio_id").references(() => desafio.id),
  lecturaId: integer("lectura_id").references(() => lectura.id),
  fechaRegistrada: timestamp("fecha_registrada").defaultNow(),
});

// RELATIONS

export const usuarioRelations = relations(usuario, ({ many }) => ({
  respuestas: many(respuesta),
  progresoDesafios: many(progresoDesafio),
  lecturasCompletadas: many(lecturaCompletada),
  comodinesUsuario: many(comodinUsuario),
  lecturaDesafioLog: many(lecturaDesafioLog),
}));

export const lecturaRelations = relations(lectura, ({ many }) => ({
  preguntas: many(pregunta),
  lecturasCompletadas: many(lecturaCompletada),
  comodinesLectura: many(comodinLectura),
  lecturaDesafioLog: many(lecturaDesafioLog),
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
  lecturaDesafioLog: many(lecturaDesafioLog),
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

export const tipoComodinRelations = relations(tipoComodin, ({ many }) => ({
  comodinesLectura: many(comodinLectura),
  comodinesUsuario: many(comodinUsuario),
}));

export const comodinLecturaRelations = relations(comodinLectura, ({ one }) => ({
  lectura: one(lectura, {
    fields: [comodinLectura.lecturaId],
    references: [lectura.id],
  }),
  tipoComodin: one(tipoComodin, {
    fields: [comodinLectura.tipoComodinId],
    references: [tipoComodin.id],
  }),
}));

export const comodinUsuarioRelations = relations(comodinUsuario, ({ one }) => ({
  usuario: one(usuario, {
    fields: [comodinUsuario.usuarioId],
    references: [usuario.id],
  }),
  tipoComodin: one(tipoComodin, {
    fields: [comodinUsuario.tipoComodinId],
    references: [tipoComodin.id],
  }),
}));

export const lecturaCompletadaRelations = relations(lecturaCompletada, ({ one }) => ({
  usuario: one(usuario, {
    fields: [lecturaCompletada.usuarioId],
    references: [usuario.id],
  }),
  lectura: one(lectura, {
    fields: [lecturaCompletada.lecturaId],
    references: [lectura.id],
  }),
}));

export const lecturaDesafioLogRelations = relations(lecturaDesafioLog, ({ one }) => ({
  usuario: one(usuario, {
    fields: [lecturaDesafioLog.usuarioId],
    references: [usuario.id],
  }),
  desafio: one(desafio, {
    fields: [lecturaDesafioLog.desafioId],
    references: [desafio.id],
  }),
  lectura: one(lectura, {
    fields: [lecturaDesafioLog.lecturaId],
    references: [lectura.id],
  }),
}));