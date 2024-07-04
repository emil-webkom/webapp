import Link from "next/link";
import { FC } from "react";

// The information displayed in the footer such as name of "Leder" and "kontaktinfo" should,
// be made object oriented to allow automatic updates to be made.

const Footer: FC = () => {
  return (
    <footer>
      <div className="max-w-screen flex justify-between bg-[#001D21] text-white px-10 font-bold py-5">
        <div className="flex flex-col w-[20%]">
          <div className="flex justify-left">
            <span>Emil</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-left mt-6 font-light text-[10px]">
            <p>
              Foreningen for Studentene ved Energi og Miljø, OS. Bragstads plass
              2, 7034 Trondheim. Org.nr. 994 778 463
            </p>
            <p className="mt-4">Foreningen for Studentene ved Emil © 2024</p>
          </div>
        </div>
        <div className="flex flex-col w-[20%]">
          <div className="flex">
            <span>Kontakt</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-left font-light text-[10px] mt-6">
            <p>Leder: Henriette Strømsness, +47 467 60 243</p>
            <p>
              Bedriftskontakt Emil-Link: Markus Eliassen, link-styret@emilweb.no
            </p>
            <p>NTNU GLØSHAUGEN, Elektrobygget, 7491, Trondheim</p>
          </div>
        </div>
        <div className="flex flex-col w-[20%]">
          <div className="flex">
            <span>Lenker</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <ul className="text-[10px] font-light mt-6 space-y-1 object-cover">
            <li>
              <Link href="/om_emil" className="text-underscore">
                Om Emil
              </Link>
            </li>
            <li>
              <Link href="/for_studenten" className="text-underscore">
                For studenten
              </Link>
            </li>
            <li>
              <Link href="/naeringsliv" className="text-underscore">
                Næringsliv
              </Link>
            </li>
            <li>
              <Link
                href="/for_studenten/varsle oss"
                className="text-underscore"
              >
                Varsle oss?
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-[20%]">
          <div className="flex">
            Våre samarbeidspartnere
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-[10px] font-light mt-6">
            <p>Multiconsult</p>
            <p>Statkraft</p>
            <p>Equinor</p>
            <p>GK</p>
            <p>Lockhead Martin</p>
            <p>Kongsberg ammunisjon</p>
          </div>
        </div>
      </div>

      <div className="flex max-w-screen items-center justify-center bg-[#001D21] py-2">
        <img
          src="/svg/Three clover.svg"
          alt="Trekløver"
          className="h-4 w-4 icon-hover"
        />
      </div>
    </footer>
  );
};

export default Footer;
