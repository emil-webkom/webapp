"use client";

import Link from "next/link";
import { FC, useState } from "react";

const NavBar: FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
    <nav className="w-[100%] mx-auto items-center border-b border-slate-200">
      <div className="flex mx-[7%] py-4 justify-between">
        <div className="flex gap-[4vw]">
          <a href="/">
            <img src="/svg/leaf.svg" alt="Logo" className="icon-hover" />
          </a>
          <Link
            href="/om_emil"
            className={`text-zinc-400 link-hover-effect ${activeLink === "omEmil" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("omEmil")}
          >
            Om Emil
          </Link>
          <Link
            href="/for_studenten/ny_student"
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
        </div>
        {/* <div className="w-[10vw] "></div> */}
        <div className="inline-flex space-x-12">
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
