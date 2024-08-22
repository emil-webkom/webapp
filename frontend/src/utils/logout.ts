"use server";

import { signOut } from "@/lib/auth";

export const logout = async () => {
  // DO SOME SERVER SIDE LOGIC FIRST
  await signOut();
};
