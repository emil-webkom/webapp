import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  nummer: z.number(),
});

export const HovedstyretSchema = z.object({
  rolle: z.string().min(1),
  text: z.string().optional(),
  bilde: z.string().url().min(1),
  user: UserSchema,
});
