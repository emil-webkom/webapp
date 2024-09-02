"use client";

import { FC } from "react";
import { useState } from "react";
import Link from "next/link";
import { HandCoins, FileText } from "lucide-react";

const Banner: FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetSelectedLink = (linkName: string) => {
    setActiveLink(linkName);
  };
  return (
    <nav className="flex justify-center">
      <div className="w-[80%] lg:w-[30%]">
        <div className="justify-center space-x-2 py-3 grid grid-cols-4 gap-6 ">
          <Link
            href="/for_studenten/ny_student"
            className={`text-zinc-400 link-hover-effect ${activeLink === "ny_student" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("ny_student")}
          >
            <div className="flex flex-col items-center justify-center py-1 flex-shrink-0">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M12.5 6.5C13.0523 6.5 13.5 6.05228 13.5 5.5C13.5 4.94772 13.0523 4.5 12.5 4.5C11.9477 4.5 11.5 4.94772 11.5 5.5C11.5 6.05228 11.9477 6.5 12.5 6.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M9.5 20.5L12.5 14.5L15.5 20.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M6.5 8.5L12.5 10.5L18.5 8.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M12.5 10.5V14.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs text-center">Ny student</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/arrangement"
            className={`text-zinc-400 link-hover-effect ${activeLink === "arrangement" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("arrangement")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon/ticket">
                  <path
                    id="Vector"
                    d="M3.5 7.5V9.5C4.29565 9.5 5.05871 9.81607 5.62132 10.3787C6.18393 10.9413 6.5 11.7044 6.5 12.5C6.5 13.2956 6.18393 14.0587 5.62132 14.6213C5.05871 15.1839 4.29565 15.5 3.5 15.5V17.5C3.5 18.6 4.4 19.5 5.5 19.5H19.5C20.0304 19.5 20.5391 19.2893 20.9142 18.9142C21.2893 18.5391 21.5 18.0304 21.5 17.5V15.5C20.7044 15.5 19.9413 15.1839 19.3787 14.6213C18.8161 14.0587 18.5 13.2956 18.5 12.5C18.5 11.7044 18.8161 10.9413 19.3787 10.3787C19.9413 9.81607 20.7044 9.5 21.5 9.5V7.5C21.5 6.96957 21.2893 6.46086 20.9142 6.08579C20.5391 5.71071 20.0304 5.5 19.5 5.5H5.5C4.96957 5.5 4.46086 5.71071 4.08579 6.08579C3.71071 6.46086 3.5 6.96957 3.5 7.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M13.5 5.5V7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M13.5 17.5V19.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M13.5 11.5V13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs">Arrangementer</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/oekonomi"
            className={`text-zinc-400 link-hover-effect ${activeLink === "oekonomi" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("oekonomi")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M12.5 2.5V22.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M17.5 5.5H10C9.07174 5.5 8.1815 5.86875 7.52513 6.52513C6.86875 7.1815 6.5 8.07174 6.5 9C6.5 9.92826 6.86875 10.8185 7.52513 11.4749C8.1815 12.1313 9.07174 12.5 10 12.5H15C15.9283 12.5 16.8185 12.8687 17.4749 13.5251C18.1313 14.1815 18.5 15.0717 18.5 16C18.5 16.9283 18.1313 17.8185 17.4749 18.4749C16.8185 19.1313 15.9283 19.5 15 19.5H6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs ">Økonomi</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/arkiv"
            className={`text-zinc-400 link-hover-effect ${activeLink === "arkiv" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("arkiv")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <FileText size={25} />
              <p className="text-xs ">Arkiv</p>
            </div>
          </Link>

          <Link
            href="/for_studenten/komiteer"
            className={`text-zinc-400 link-hover-effect ${activeLink === "komiteer" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("komiteer")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M16.5 21.5V19.5C16.5 18.4391 16.0786 17.4217 15.3284 16.6716C14.5783 15.9214 13.5609 15.5 12.5 15.5H6.5C5.43913 15.5 4.42172 15.9214 3.67157 16.6716C2.92143 17.4217 2.5 18.4391 2.5 19.5V21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M9.5 11.5C11.7091 11.5 13.5 9.70914 13.5 7.5C13.5 5.29086 11.7091 3.5 9.5 3.5C7.29086 3.5 5.5 5.29086 5.5 7.5C5.5 9.70914 7.29086 11.5 9.5 11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M22.5 21.5V19.5C22.4993 18.6137 22.2044 17.7528 21.6614 17.0523C21.1184 16.3519 20.3581 15.8516 19.5 15.63"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M16.5 3.63C17.3604 3.8503 18.123 4.3507 18.6676 5.05231C19.2122 5.75392 19.5078 6.61683 19.5078 7.505C19.5078 8.39317 19.2122 9.25608 18.6676 9.95769C18.123 10.6593 17.3604 11.1597 16.5 11.38"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs ">Komiteer</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/soeknader"
            className={`text-zinc-400 link-hover-effect ${activeLink === "soeknader" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("soeknader")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <HandCoins size={25} />
              <p className="text-xs ">Søknader</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/booking"
            className={`text-zinc-400 link-hover-effect ${activeLink === "booking" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("booking")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M22.5 13V6.5C22.5 5.96957 22.2893 5.46086 21.9142 5.08579C21.5391 4.71071 21.0304 4.5 20.5 4.5H4.5C3.96957 4.5 3.46086 4.71071 3.08579 5.08579C2.71071 5.46086 2.5 5.96957 2.5 6.5V18.5C2.5 19.6 3.4 20.5 4.5 20.5H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M22.5 7.5L13.53 13.2C13.2213 13.3934 12.8643 13.496 12.5 13.496C12.1357 13.496 11.7787 13.3934 11.47 13.2L2.5 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M18.5 21.5C19.2956 21.5 20.0587 21.1839 20.6213 20.6213C21.1839 20.0587 21.5 19.2956 21.5 18.5C21.5 17.7044 21.1839 16.9413 20.6213 16.3787C20.0587 15.8161 19.2956 15.5 18.5 15.5C17.7044 15.5 16.9413 15.8161 16.3787 16.3787C15.8161 16.9413 15.5 17.7044 15.5 18.5C15.5 19.2956 15.8161 20.0587 16.3787 20.6213C16.9413 21.1839 17.7044 21.5 18.5 21.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M18.5 21.5C20.1569 21.5 21.5 20.1569 21.5 18.5C21.5 16.8431 20.1569 15.5 18.5 15.5C16.8431 15.5 15.5 16.8431 15.5 18.5C15.5 20.1569 16.8431 21.5 18.5 21.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_5"
                    d="M22.5 22.5L21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs ">Booking</p>
            </div>
          </Link>
          <Link
            href="/for_studenten/varsle_oss"
            className={`text-zinc-400 link-hover-effect ${activeLink === "varsle_oss" ? "selected-state" : ""}`}
            onClick={() => handleSetSelectedLink("varsle_oss")}
          >
            <div className="flex flex-col items-center justify-center py-1 ">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M20.5 13.5C20.5 18.5 17 21 12.84 22.45C12.6222 22.5238 12.3855 22.5203 12.17 22.44C8 21 4.5 18.5 4.5 13.5V6.5C4.5 6.23478 4.60536 5.98043 4.79289 5.79289C4.98043 5.60536 5.23478 5.5 5.5 5.5C7.5 5.5 10 4.3 11.74 2.78C11.9519 2.599 12.2214 2.49955 12.5 2.49955C12.7786 2.49955 13.0481 2.599 13.26 2.78C15.01 4.31 17.5 5.5 19.5 5.5C19.7652 5.5 20.0196 5.60536 20.2071 5.79289C20.3946 5.98043 20.5 6.23478 20.5 6.5V13.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M12.5 8.5V12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M12.5 16.5H12.51"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <p className="text-xs text-center">Varsle oss</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Banner;
