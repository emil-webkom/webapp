import { z } from "zod";

export const ArrangementSchema = z.object({
  navn: z.string(),
  sted: z.string(),
  dato: z.date(),
  bilde: z.string().optional(),
  kapasitet: z.number().optional(),
  beskrivelse: z.string(),
  trinn: z.array(z.string()).default([]),
  arrangorID: z.string(),
});

export type Arrangement = z.infer<typeof ArrangementSchema>;

export const updateArrangementSchema = ArrangementSchema.partial();

export const deleteArrangementSchema = z.object({
  id: z.string(),
});
