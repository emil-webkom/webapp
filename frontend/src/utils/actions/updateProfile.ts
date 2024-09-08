// app/actions/update-user.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
  userId: string,
  data: { phoneNumber?: string; imageUrl?: string },
) {
  try {
    const updateData: { nummer?: number; image?: string } = {};

    if (data.phoneNumber) {
      updateData.nummer = Number(data.phoneNumber);
    }

    if (data.imageUrl) {
      updateData.image = data.imageUrl;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    console.log("User profile updated successfully:", updatedUser);

    // revalidatePath("/settings");
    // revalidatePath("/");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}
