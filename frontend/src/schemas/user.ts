import { z } from "zod";

// Define the `UserRole` enum schema
const UserRole = z.enum(["USER", "ADMIN", "SUPER_USER"]); // Modify the roles based on your actual enum
const Kontigent = z.enum(["UBETALT", "BETALT", "AVVENTER_BEKREFTELSE"]); // Modify the roles based on your actual enum

// Zod schema for the `User` model
export const userPrismaSchema = z.object({
  id: z.string().cuid(), // cuid for id
  name: z.string().nullable().optional(), // Nullable and optional string
  email: z.string().email(), // Unique email
  emailVerified: z.date().nullable().optional(), // Nullable and optional Date
  image: z.string().url().nullable().optional(), // Nullable and optional URL for image
  password: z.string().min(6).nullable().optional(), // Nullable and optional password with minimum length
  role: UserRole.default("USER"), // User role with a default of USER
  nummer: z.number().nullable().optional(), // Nullable and optional number for nummer
  isActive: z.boolean().default(true), // Boolean with default true
  kontigent: Kontigent.default("UBETALT"),
  username: z.string().nullable().optional(), // Nullable and optional username (should be unique)
  accounts: z.array(z.any()).optional(), // Relationship field - handle according to use case
  paameldinger: z.array(z.any()).optional(), // Relationship field
  bookings: z.array(z.any()).optional(), // Relationship field
  Hovedstyret: z.any().optional(), // Optional relationship field
  lavterskelArrangements: z.array(z.any()).optional(), // Relationship field
});

export type UserPrisma = z.infer<typeof userPrismaSchema>;

export default userPrismaSchema;
