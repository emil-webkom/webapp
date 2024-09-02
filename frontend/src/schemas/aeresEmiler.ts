import { z } from "zod";

const aeresEmilerTypeEnum = z.enum(["AERESEMILER", "FORTJENESTEMEDALJE"]);

const aeresEmilerSchema = z.object({
  id: z.string().cuid(),
  type: aeresEmilerTypeEnum,
  navn: z.string().min(1, "Navn is required"),
  aar: z.number().int().min(0, "Aar must be a positive integer"), 
});

export type AeresEmiler = z.infer<typeof aeresEmilerSchema>;