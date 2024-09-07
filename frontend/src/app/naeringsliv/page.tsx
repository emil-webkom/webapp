"use client";

import NaeringslivCard from "@/components/cards/naeringsliv_cards";
import EmilLink from "@/components/EmilLink/EmilLink";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import LogoSection from "@/components/logosection/logosection";
import useFetch from "@/hooks/use-fetch";
import { Hovedsamarbeidspartner } from "@/schemas/hovedsamarbeidspartner";
import { useEffect, useState } from "react";

interface HSPprops{
  message: string,
  data: Hovedsamarbeidspartner[],
}

const NaeringslivPage = () => {
  const [hovedsamarbeidspartnere, setHovedsamarbeidspartnere] = useState<
    Hovedsamarbeidspartner[]
  >([]);
  const { data, loading, error } = useFetch<HSPprops>("/api/hovedsamarbeidspartner");

  useEffect(() => {
    if (data) {
      setHovedsamarbeidspartnere(data.data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%] lg:w-[65%] flex flex-col items-center justify-center gap-y-6">
        <div>
          <Hero2
            title="Næringsliv"
            undertitle="Her finner du alt du trenger å vite om Emil og næringslivet"
          />
        </div>
        <p className="font-extralight text-sm lg:text-base">
          Energi- og miljøstudiet har utviklet et godt kontaktnett med
          energibransjen og næringslivet. Energikontakten fungerer som et
          bindeledd mellom studentene på linjen, faglærere og næringslivet.
        </p>
        <p className="font-extralight text-sm lg:text-base">
          Nedenfor finner du en oversikt over EMIL sine samarbeidspartnere.
        </p>
      </div>
      <TransissionIn />

      <div className="bg-[#001D21] w-full flex flex-col items-center justify-center lg:space-x-24 py-6 lg:py-16">
        <div className="flex flex-col items-center w-[90%] lg:w-[65%] gap-y-3">
          <div className="flex flex-col gap-y-6 w-full lg:flex-row lg:justify-between">
            {loading ? (
              <div>Loading</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              hovedsamarbeidspartnere.map((partner) => (
                <div key={partner.id}>
                  <NaeringslivCard
                    titleImageSrc={partner.logo}
                    imageLinkHref={partner.hjemmeside}
                    subtitle={partner.navn}
                    description={partner.beskrivelse}
                    linkText={` Mer om ${partner.navn} her`}
                    buttonText="Jobbannonser"
                    linkHref={partner.hjemmeside}
                    buttonLinkHref={partner.annonseside}
                  />
                </div>
              ))
            )}
          </div>

          <div className="lg:pt-12"></div>
        </div>
      </div>
      <TransissionOut />
      <div className="w-[90%] pt-12">
        <EmilLink />
        <LogoSection />
      </div>
      <TransissionIn />
    </div>
  );
};

export default NaeringslivPage;
