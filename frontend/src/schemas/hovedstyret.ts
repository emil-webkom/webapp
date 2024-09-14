import { z } from "zod";
import UserPrisma from "./user";

export const hovedstyretSchema = z.object({
  rolle: z.string().min(1, "Role is required"),
  text: z.string().min(1, "Text is required"),
  image: z.string().url("Invalid image URL format"),
  updatedAt: z.date(),
  userID: z.string().min(1, "User ID is required"),
  isActive: z.boolean().optional().default(true),
  User: UserPrisma,
});

export const hovedstyretFormSchema = z.object({
  rolle: z.string().min(1, "Role is required"),
  text: z.string().min(1, "Text is required"),
  image: z.string().url("Invalid image URL format"),
  updatedAt: z.date(),
  userID: z.string().min(1, "User ID is required"),
  isActive: z.boolean().optional().default(true),
  email: z.string(),
});

export type hovedstyretForm = z.infer<typeof hovedstyretFormSchema>;

export type Hovedstyret = z.infer<typeof hovedstyretSchema>;
