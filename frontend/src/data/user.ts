"use server";
import { db } from "@/lib/db";

/**
 * Retrieves a user by their email address.
 * @param email - The email address of the user.
 * @returns A Promise that resolves to the user object if found, or null if not found or an error occurred.
 */
export const getUserByEmail = async (emailstring: string) => {
  try {
    const user = await db.user.findUnique({ where: { email: emailstring } });
    return user;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found or an error occurs.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};
