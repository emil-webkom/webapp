import { z } from "zod";

export const lavTerskelArrangementSchema = z.object({
  id: z.string().cuid().optional(),
  navn: z.string().min(1, "Navn is required"),
  sted: z.string().optional(),
  dato: z.date(),
  type: z.string().min(1, "Type is required"),
  beskrivelse: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
});

export type lavTerskelArrangement = z.infer<typeof lavTerskelArrangementSchema>;

export const createlavterskelArrangementSchema = lavTerskelArrangementSchema;

export const updatelavterskelArrangementSchema =
  lavTerskelArrangementSchema.partial();

export const deletelavterskelArrangementSchema = z.object({
  id: z.string(),
});
