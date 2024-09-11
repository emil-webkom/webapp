"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogIn, LogOut, Settings } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getUserByEmail } from "@/data/user";
import { useEffect, useState } from "react";
import { UserPrisma } from "@/schemas/user";

const UserButton = () => {
  const user = useCurrentUser();
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const [userFull, setuserFull] = useState<UserPrisma | null>();

  const setFullUser = async () => {
    if (user?.email) {
      const userFull = await getUserByEmail(user.email);
      setuserFull(userFull);
    }
  };
  useEffect(() => {
    setFullUser();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userFull?.image || ""} className="object-cover" />
          <AvatarFallback className="background-dark">
            <FaUser size={12} className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {isLoggedIn ? (
          <>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Innstillinger
              </DropdownMenuItem>
            </Link>
            <LogoutButton>
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Logg ut
              </DropdownMenuItem>
            </LogoutButton>
          </>
        ) : (
          <Link href="/auth/login">
            <DropdownMenuItem>
              <LogIn className="w-4 h-4 mr-2" />
              Logg inn
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
