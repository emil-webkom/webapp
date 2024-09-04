import {z} from "zod";

const HovedsamarbeidspartnerSchema = z.object({
  id: z.string().cuid().optional(), 
  navn: z.string().min(1),
  beskrivelse: z.string(),
  active: z.boolean(),
  logo: z.string().url(), 
  hjemmeside: z.string().url(), 
  annonseside: z.string().url(), 
});

export type Hovedsamarbeidspartner = z.infer<typeof HovedsamarbeidspartnerSchema>;
