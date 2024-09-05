"use client";

import useFetch from "@/hooks/use-fetch";
import { Samarbeidspartner } from "@/schemas/samarbeidspartner";
import { Hovedstyret } from "@prisma/client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Footer: FC = () => {
  const [logos, setLogos] = useState<Samarbeidspartner[]>([]);
  const { data, loading, error } = useFetch<{
    samarbeidspartnere: Samarbeidspartner[];
  }>("/api/samarbeidspartner");
  const [styret, setStyret] = useState<Hovedstyret[]>([]); // Ensure correct typing

  // Fetch and set data
  const fetchAndSetData = async () => {
    const styretData = await fetch("/api/styret").then((response) =>
      response.json(),
    );
    return { styretData };
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const { styretData } = await fetchAndSetData();
        setStyret(styretData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initData();

    if (data) {
      setLogos(data.samarbeidspartnere);
    }
  }, [data]);

  // Find the member with role "Kongsknekt leder"
  const leder = styret.find((item) => item.rolle === "Kongsknekt leder");

  return (
    <footer>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between bg-[#001D21] text-white px-10 font-bold py-5">
        {/* Emil section */}
        <div className="flex flex-col lg:w-[20%] md:w-[20%] pt-6">
          <div className="flex justify-left">
            <div>Emil</div>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-left font-light text-[10px] space-y-1">
            <p>
              Foreningen for Studentene ved Energi og Miljø, OS. Bragstads plass
              2, 7034 Trondheim. Org.nr. 991 212 736
            </p>
            <p className="mt-4">Foreningen for Studentene ved Emil © 2024</p>
          </div>
        </div>

        {/* Kontakt section */}
        <div className="flex flex-col pt-6 md:w-[20%] lg:w-[20%]">
          <div className="flex">
            <span>Kontakt</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-left font-light text-[10px] space-y-1">
            {/* Render the name and phone number if available */}
            <p>
              Leder: {leder?.text || "Utilgjengelig"}, +47{" "}
              {leder?.userID || "Utilgjengelig"}, styret@emilweb.no
            </p>
            <p>
              Bedriftskontakt Emil-Link: Markus Eliassen, link-styret@emilweb.no
            </p>
            <p>NTNU GLØSHAUGEN, Elektrobygget, 7491, Trondheim</p>
          </div>
        </div>

        {/* Lenker section */}
        <div className="flex flex-col pt-6 lg:w-[20%] md:w-[20%]">
          <div className="flex">
            <span>Lenker</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <ul className="text-[10px] font-light space-y-1 object-cover">
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
                href="/for_studenten/varsle_oss"
                className="text-underscore"
              >
                Varsle oss?
              </Link>
            </li>
          </ul>
        </div>

        {/* Samarbeidspartnere section */}
        <div className="flex flex-col pt-6 lg:w-[20%] md:w-[20%]">
          <div className="flex overflow-hidden">
            Våre samarbeidspartnere
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-[10px] space-y-1 font-light">
            {!loading && !error && logos.length > 0 ? (
              logos.map((partner) => (
                <p key={partner.id} className="text-underscore">
                  <a
                    href={partner.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {partner.navn}
                  </a>
                </p>
              ))
            ) : loading ? (
              <div>Loading data...</div>
            ) : (
              <div>No available data</div>
            )}
          </div>
        </div>
      </div>

      {/* Social media links */}
      <div className="bg-[#001D21] color-white py-4">
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.instagram.com/emilelgen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/svg/instagram.svg"
              alt="Instagram"
              className="h-6 invert w-6"
            />
          </a>
          <a
            href="https://x.com/ntnuemil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/svg/twitter.svg"
              alt="Instagram"
              className="h-6 invert w-6"
            />
          </a>
          <a
            href="https://www.facebook.com/emilface/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/svg/facebook.svg"
              alt="Instagram"
              className="h-6 invert w-6"
            />
          </a>
          <a
            href="https://www.linkedin.com/groups/4090658/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/svg/linkedin.svg"
              alt="LinkedIn"
              className="h-6 invert w-6"
            />
          </a>
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
