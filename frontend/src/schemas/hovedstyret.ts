import { z } from "zod";

const hovedstyretSchema = z.object({
  rolle: z.string().min(1, "Role is required"),
  text: z.string().min(1, "Text is required"),
  image: z.string().url("Invalid image URL format"),
  updatedAt: z.date(),
  userID: z.string().min(1, "User ID is required"),
  isActive: z.boolean().optional().default(true),
  // Add relation schema for User if needed
  User: z.object({
    id: z.string(), // This should match the User model's primary key
    name: z.string().min(1, "User name is required"), // Example User fields
    email: z.string().email("Invalid email format"),
    nummer: z.number(),
  }),
});

export type Hovedstyret = z.infer<typeof hovedstyretSchema>;
