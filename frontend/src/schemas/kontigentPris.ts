import { z } from "zod";

const kontigentPrisSchema = z.object({
  id: z.string().cuid().optional(),
  aar: z.string(),
  pris: z.number(),
});

export type kontigentPris = z.infer<typeof kontigentPrisSchema>;
