import { z } from 'zod';

const SamarbeidspartnerSchema = z.object({
  id: z.string().cuid().optional(), 
  navn: z.string().min(1),
  active: z.boolean(),
  logo: z.string().url(), 
  homepage: z.string().url(), 
});

export type Samarbeidspartner = z.infer<typeof SamarbeidspartnerSchema>;

