import { z } from 'zod';

export const SamarbeidspartnerSchema = z.object({
  id: z.string().optional(),
  navn: z.string().min(1),
  active: z.boolean(),
  logo: z.string(),
  homepage: z.string(),
});

export type Samarbeidspartner = z.infer<typeof SamarbeidspartnerSchema>;

