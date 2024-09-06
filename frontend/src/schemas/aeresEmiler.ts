import { z } from "zod";

// Enum for type
export const aeresEmilerTypeEnum = z.enum(["AERESEMILER", "FORTJENESTEMEDALJE"]);

// Schema for creating new ÆresEmiler without requiring an ID
export const createAeresEmilerSchema = z.object({
  type: aeresEmilerTypeEnum,
  navn: z.string().min(1, "Navn is required"),
  aar: z.number().int().min(0, "Aar must be a positive integer"),
});

// Schema for deleting an existing ÆresEmiler using only the ID
export const deleteAeresEmilerSchema = z.object({
  id: z.string().cuid(),
});

// Full ÆresEmiler schema for both reading and handling database entities (with ID)
export const aeresEmilerSchema = z.object({
  id: z.string().cuid(), // ID required for database entries
  type: aeresEmilerTypeEnum,
  navn: z.string().min(1, "Navn is required"),
  aar: z.number().int().min(0, "Aar must be a positive integer"),
});

export type AeresEmiler = z.infer<typeof aeresEmilerSchema>;
export type CreateAeresEmiler = z.infer<typeof createAeresEmilerSchema>;
export type DeleteAeresEmiler = z.infer<typeof deleteAeresEmilerSchema>;
