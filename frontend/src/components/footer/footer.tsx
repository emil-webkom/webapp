"use client";

import useFetch from "@/hooks/use-fetch";
import { Samarbeidspartner } from "@/schemas/samarbeidspartner";
import { Hovedstyret } from "@/schemas/hovedstyret";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Clover } from "lucide-react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface dataProps {
  message: string;
  data: Samarbeidspartner[];
}

const Footer: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [logos, setLogos] = useState<Samarbeidspartner[]>([]);
  const { data, loading, error } = useFetch<dataProps | null>(
    "/api/samarbeidspartner",
  );

  const [styret, setStyret] = useState<Hovedstyret[]>([]);
  const [leder, setLeder] = useState<Hovedstyret | undefined>();

  // Fetch and set Hovedstyret data
  const fetchStyretData = async () => {
    try {
      const response = await fetch("/api/styret");
      const result = await response.json();
      if (response.ok) {
        setStyret(result.data); // Assuming the API returns { data: hovedstyret[] }
      } else {
        console.error("Error fetching styret data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching styret data:", error);
    }
  };

  useEffect(() => {
    fetchStyretData();

    if (data) {
      setLogos(data?.data);
    }
  }, [data]);

  useEffect(() => {
    // Find and set the leader (Kongsknekt leder)
    const foundLeder = styret.find((item) => item.rolle === "Kongsknekt leder");
    setLeder(foundLeder);
  }, [styret]);

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const firkloever = (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-y-4 p-4 rounded-md border-2">
        {/* Heading with centered text */}
        <p className="w-[90%] text-center text-lg sm:text-base">
          Til Emil med kjærlighet:
        </p>
        {/* Responsive list of names with flex-wrap for smaller screens */}
        <p className="border-b-2 border-primary w-[90%] text-center"></p>
        <p className="flex flex-wrap w-full justify-center gap-2 sm:gap-x-4 text-center">
          <span>Nicolai Faye</span>
          <span>|</span>
          <span>Maria Wembstad</span>
          <span>|</span>
          <span>Emil Lunde Bakke</span>
          <span>|</span>
          <span>Mauritz Skogøy</span>
        </p>
        {/* Button with margin for spacing */}
        <div className="mt-4">
          <Button onClick={toggleModal}>Lukk</Button>
        </div>
      </div>
    </>
  );

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
            <p className="text-[11px]">
              Ved bugs ta kontakt med: trubadur@emilweb.no
            </p>
          </div>
        </div>

        {/* Kontakt section */}
        <div className="flex flex-col pt-6 md:w-[20%] lg:w-[20%]">
          <div className="flex">
            <span>Kontakt</span>
            <img src="/svg/arrow-up-right.svg" alt="Link" className="h-6 w-6" />
          </div>
          <div className="text-left font-light text-[10px] space-y-1">
            <p>
              Leder: {leder?.User.name || "Utilgjengelig"}, +47{" "}
              {leder?.User.nummer || "Utilgjengelig"}, styret@emilweb.no
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

      <div className="flex max-w-screen items-center justify-center bg-[#001D21] p-2">
        <Clover
          onClick={toggleModal}
          className="text-white clover-hover w-4 h-4 cursor-pointer"
        />
        {openModal ? <Modal isOpen={openModal} children={firkloever} /> : null}
      </div>
    </footer>
  );
};

export default Footer;
