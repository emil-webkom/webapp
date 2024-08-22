import { z } from "zod";

export const ArrangementPaameldingSchema = z.object({
  id: z.string(),
  userID: z.string(),
  arrangementID: z.string(),
});

export type ArrangementPaamelding = z.infer<typeof ArrangementPaameldingSchema>;

export const ArrangementSchema = z.object({
  id: z.string(),
  navn: z.string(),
  sted: z.string(),
  dato: z.date(),
  bilde: z.string().optional(),
  kapasitet: z.number().optional(),
  beskrivelse: z.string(),
  trinn: z.array(z.number()).default([]),
  arrangorID: z.string(),
  paameldinger: z.array(ArrangementPaameldingSchema).default([]),
});

export type Arrangement = z.infer<typeof ArrangementSchema>;

export const createArrangementSchema = ArrangementSchema;

export const updateArrangementSchema = ArrangementSchema.partial();

export const deleteArrangementSchema = z.object({
  id: z.string(),
});
