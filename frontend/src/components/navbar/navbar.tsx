"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import UserButton from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Sun, Leaf } from "lucide-react";
import { User } from "../auth/auth-provider";

const NavBar: FC = () => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setUser(currentUser || null);
    setIsAdmin(currentUser?.role === "ADMIN");
  }, [currentUser]);

  return (
    <nav className="max-w-screen items-center lg:border-b border-slate-200">
      <div className="flex mx-[7%] py-4 justify-between items-center">
        <div className="flex gap-x-6">
          <div className="flex space-x-10">
            <a href="/">
              <Leaf size={24} strokeWidth={1.8} className="stroke-[#003A42]" />
            </a>
          </div>
          {!menuOpen && ( // Render the normal navbar only when the menu is not open
            <div className="hidden md:flex space-x-10">
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
          )}
        </div>
        {!menuOpen && (
          <div className="hidden md:flex space-x-12">
            <UserButton />
          </div>
        )}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-zinc-400 border-zinc-400"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>
      {menuOpen && ( // Render the mobile menu only when it's open
        <div className="md:hidden flex gap-4 px-4 py-2 border-b border-slate-200">
          <div className="flex flex-col text-right ml-auto">
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
            {user ? ( // If user is logged in, show the Settings link
              <div className="flex justify-end">
                <UserButton/>
              </div>
            ) : ( // If user is not logged in, show the Login link
              <Link href="/auth/login" className="text-zinc-400 link-hover-effect">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
