// app/actions/update-user.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
  userEmail: string,
  data: { phoneNumber?: string; imageUrl?: string; username?: string },
) {
  try {
    const updateData: { nummer?: number; image?: string; username?: string } =
      {};

    if (data.phoneNumber) {
      updateData.nummer = Number(data.phoneNumber);
    }
    if (data.imageUrl) {
      updateData.image = data.imageUrl;
    }

    if (data.username) {
      updateData.username = data.username;
    }

    // Perform the user update in the database
    const updatedUser = await db.user.update({
      where: { email: userEmail },
      data: updateData,
    });

    console.log("User profile updated successfully:", updatedUser);

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}
