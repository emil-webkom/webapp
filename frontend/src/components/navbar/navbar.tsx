"use client";

import Link from "next/link";
import { FC, useState } from "react";

const NavBar: FC = () => {
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="max-w-screen items-center lg:border-b border-slate-200">
      <div className="flex mx-[7%] py-4 justify-between items-center">
        <div className="flex space-x-10">
          <a href="/">
            <img src="/svg/leaf.svg" alt="Logo" className="icon-hover" />
          </a>
          <div className="hidden md:flex gap-[4vw]">
            <Link
              href="/om_emil"
              className={`text-zinc-400 link-hover-effect ${
                activeLink === "omEmil" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("omEmil")}
            >
              Om linjeforeningen
            </Link>
            <Link
              href="/for_studenten"
              className={`text-zinc-400 link-hover-effect ${
                activeLink === "forStudenten" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("forStudenten")}
            >
              For studenten
            </Link>
            <Link
              href="/naeringsliv"
              className={`text-zinc-400 link-hover-effect ${
                activeLink === "næringsliv" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("næringsliv")}
            >
              Næringsliv
            </Link>
          </div>
        </div>
        <div className="hidden md:inline-flex space-x-12">
          <a href="/auth/login">
            <img src="/svg/Avatar.svg" alt="LOGIN" className="icon-hover" />
          </a>
          <a href="/displayboards">
            <img src="/svg/sun.svg" alt="DARKMODE" className="icon-hover" />
          </a>
        </div>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-zinc-400 border-zinc-400"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex gap-4 px-4 py-2 border-b border-slate-200"> {/* Added text-left class */}
          <div className="flex flex-col text-right ml-auto">
          <Link
            href="/om_emil"
            className={`text-zinc-400 link-hover-effect ${
              activeLink === "omEmil" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("omEmil")}
              >
            Om linjeforeningen
          </Link>
          <Link
            href="/for_studenten"
            className={`text-zinc-400 link-hover-effect ${
              activeLink === "forStudenten" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("forStudenten")}
              >
            For studenten
          </Link>
          <Link
            href="/naeringsliv"
            className={`text-zinc-400 link-hover-effect ${
              activeLink === "næringsliv" ? "selected-state" : ""
              }`}
              onClick={() => handleSetSelectedLink("næringsliv")}
              >
            Næringsliv
          </Link>
          <a href="/auth/login" className="text-zinc-400 link-hover-effect">
            Login
          </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
