import { z } from "zod";

export const lavTerskelArrangementSchema = z.object({
    id: z.string(),
    navn: z.string(),
    sted: z.string(),
    dato: z.date(),
    type: z.string(),
    beskrivelse: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string(),
  });
  
  export type lavTerskelArrangement = z.infer<typeof lavTerskelArrangementSchema>;
