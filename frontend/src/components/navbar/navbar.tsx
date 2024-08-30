"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import UserButton from "@/components/auth/user-button";
import LogoutButton from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Leaf, X } from "lucide-react";
import { User } from "../auth/auth-provider";

const NavBar: FC = () => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
    closeMenu();
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
            <Link href="/" onClick={() => handleSetSelectedLink("")}>
              <Leaf size={24} strokeWidth={1.8} className="stroke-[#003A42]" />
            </Link>
          </div>
          {!menuOpen && (
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
          className="md:hidden flex items-center justify-center w-8 h-8 border rounded text-zinc-400 border-zinc-400"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <X className="w-5 h-5 transition-transform duration-300 ease-in-out" />
          ) : (
            <svg className="fill-current h-3 w-3 transition-transform duration-300 ease-in-out" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`md:hidden flex flex-col gap-4 px-4 py-2 border-b border-slate-200 transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden", transition: "max-height 0.3s ease, opacity 0.3s ease" }}
      >
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
          {user ? (
            <div className="flex flex-col text-right ml-auto">
              <div className="justify-end hidden lg:block">
                <UserButton />
              </div>
              <Link
                href="/settings"
                className={`text-zinc-400 link-hover-effect ${activeLink === "settings" ? "selected-state" : ""}`}
                onClick={() => handleSetSelectedLink("settings")}
              >
                Profil
              </Link>
              <div className="text-zinc-400">
                <LogoutButton>Logg ut</LogoutButton>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={`text-zinc-400 link-hover-effect ${activeLink === "Logg inn" ? "selected-state" : ""}`}
              onClick={() => handleSetSelectedLink("Logg inn")}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
