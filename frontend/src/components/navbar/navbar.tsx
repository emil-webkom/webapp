"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import UserButton from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Sun } from "lucide-react";
import ThemeButton from "../user/theme-button";

const NavBar: FC = () => {
  const { data: session } = useSession();
  // Check for admin privileges
  // const isAdmin = session?.user.role === "ADMIN";
  const user = useCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  const [activeLink, setActiveLink] = useState("");
  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
    <nav className="max-w-screen items-center border-b border-slate-200">
      <div className="flex mx-[7%] py-4 justify-between items-center">
        <div className="flex gap-[4vw]">
          <a href="/">
            <img src="/svg/leaf.svg" alt="Logo" className="icon-hover" />
          </a>
          <Link
            href="/om_emil"
            className={`text-zinc-400 link-hover-effect ${activeLink === "omEmil" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("omEmil")}
          >
            Om linjeforeningen
          </Link>
          <Link
            href="/for_studenten"
            className={`text-zinc-400 link-hover-effect ${activeLink === "forStudenten" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("forStudenten")}
          >
            For studenten
          </Link>
          <Link
            href="/naeringsliv"
            className={`text-zinc-400 link-hover-effect ${activeLink === "næringsliv" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("næringsliv")}
          >
            Næringsliv
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`text-zinc-400 link-hover-effect ${activeLink === "admin" ? "selected-state" : ""}`}
              onClick={() => handleSetSelectedLink("admin")}
            >
              Admin
            </Link>
          )}
        </div>
        {/* <div className="w-[10vw] "></div> */}
        <div className="inline-flex space-x-12">
          {/* <a href="/auth/login">
            <img src="/svg/Avatar.svg" alt="LOGIN" className="" />
          </a> */}
          <UserButton />
          {/* <a href="/displayboards">
            <img src="/svg/sun.svg" alt="DARKMODE" className="" />
          </a> */}
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
