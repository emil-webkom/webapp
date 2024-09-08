"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // DO SOME SERVER SIDE LOGIC FIRST
  await signOut();
};
