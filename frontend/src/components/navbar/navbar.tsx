"use client";

import Link from "next/link";
import { FC, useState } from "react";

const NavBar: FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
    <nav className="flex justify-between items-center inline-flex ">
      <div className="flex items-center space-x-12 border-b border-slate-200 w-screen px-24 py-4">
        <a href="/">
          <img src="/svg/leaf.svg" alt="Logo" className="icon-hover" />
        </a>
        <Link
          href="/om emil"
          className={`text-zinc-400 link-hover-effect ${activeLink === "omEmil" ? "selected-state" : ""}`}
          onClick={() => handleSetSelectedLink("omEmil")}
        >
          Om Emil
        </Link>
        <Link
          href="/for studenten"
          className={`text-zinc-400 link-hover-effect ${activeLink === "forStudenten" ? "selected-state" : ""}`}
          onClick={() => handleSetSelectedLink("forStudenten")}
        >
          For Studenten
        </Link>
        <Link
          href="/næringsliv"
          className={`text-zinc-400 link-hover-effect ${activeLink === "næringsliv" ? "selected-state" : ""}`}
          onClick={() => handleSetSelectedLink("næringsliv")}
        >
          Næringsliv
        </Link>
        <div className="w-80 relative"></div>
        <div className="inline-flex space-x-12 pl-40">
          <a href="/auth/login">
            <img src="/svg/Avatar.svg" alt="LOGIN" className="icon-hover" />
          </a>
          <a href="/displayboards">
            <img src="/svg/sun.svg" alt="DARKMODE" className="icon-hover" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
