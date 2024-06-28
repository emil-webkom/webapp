"use server";
import bcryptjs from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

/**
 * Registers a new user with the provided credentials.
 * @param values - The user registration data.
 * @returns An object indicating the result of the registration.
 *          If successful, it contains a `success` property with the value "Account created".
 *          If unsuccessful, it contains an `error` property with the corresponding error message.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Account created" };
};
