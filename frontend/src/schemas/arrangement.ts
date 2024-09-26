import { z } from "zod";

export const ArrangementPaameldingSchema = z.object({
  id: z.string(),
  userID: z.string(),
  arrangementID: z.string(),
});

export type ArrangementPaamelding = z.infer<typeof ArrangementPaameldingSchema>;

export const ArrangementSchema = z.object({
  id: z.string(),
  navn: z.string().min(1, "Navn er påkrevd"),
  sted: z.string().min(1, "Sted er påkrevd"),
  dato: z.date({
    required_error: "Dato er påkrevd",
    invalid_type_error: "Ugyldig datoformat",
  }),
  bilde: z.string().optional(),
  kapasitet: z
    .number()
    .int()
    .positive("Kapasitet må være et positivt heltall")
    .optional()
    .nullable(),
  beskrivelse: z.string().min(1, "Beskrivelse er påkrevd"),
  trinn: z.array(z.number()).default([]),
  arrangorID: z.string().optional(),
  paameldinger: z.array(ArrangementPaameldingSchema).default([]),
});

export type Arrangement = z.infer<typeof ArrangementSchema>;

export const createArrangementSchema = ArrangementSchema.omit({
  id: true,
  paameldinger: true,
}).extend({
  navn: z.string().min(1, "Navn er påkrevd"),
  sted: z.string().min(1, "Sted er påkrevd"),
  beskrivelse: z.string().min(1, "Beskrivelse er påkrevd"),
  trinn: z.array(z.number().int().min(1).max(5)).default([]),
});

export const updateArrangementSchema = ArrangementSchema.partial();

export const deleteArrangementSchema = z.object({
  id: z.string(),
});
