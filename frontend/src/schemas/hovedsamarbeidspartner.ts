import {z} from "zod";

export const HovedsamarbeidspartnerSchema = z.object({
  id: z.string().optional(),
  navn: z.string().min(1),
  beskrivelse: z.string(),
  active: z.boolean(),
  logo: z.string(),
  hjemmeside: z.string(),
  annonseside: z.string(),
});

export type Hovedsamarbeidspartner = z.infer<typeof HovedsamarbeidspartnerSchema>;
