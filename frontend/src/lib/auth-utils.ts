import { auth } from "@/lib/auth";

// USE THESE WHEN DEALING WITH SERVER COMPONENTS OR SERVERSIDE.
// IF YOU NEED THESE FOR CLIENT, CHECK THE "hooks" FOLDER

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
