"use server";

import { db } from "@/lib/db";

async function getUser(email: string) {
  const userRecord = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  return userRecord;
}
async function storeData(
  rolle: string,
  text: string,
  userEmail: string,
  downloadURL: string,
): Promise<boolean> {
  const userRecord = await getUser(userEmail);
  if (!userRecord) {
    throw new Error("No user found.");
  }
  const userID = userRecord.id;
  const active = true;
  const image = downloadURL;

  try {
    await db.hovedstyret.create({
      data: {
        rolle,
        text,
        active,
        image,
        userID,
        updatedAt: new Date(), // Automatically set to current date and time
      },
    });
    await db.$disconnect();
    return true;
  } catch (error) {
    console.error("Error storing data:", error);
    await db.$disconnect();
    return false;
  }
}

export default storeData;
