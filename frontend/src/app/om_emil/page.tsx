"use client";

import Hero2 from "@/components/hero/hero2";
import { Button } from "@/components/ui/button";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import React from "react";
import RetningCard from "@/components/cards/retningCard";

const omEmilPage = () => {
  // Function to scroll to the target section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col ">
        <Hero2
          title="Energi og miljøstudentenes linjeforening"
          undertitle="Her finner du informasjon om linjeforeningen Emil"
        />
        <div
          className="flex justify-center pt-10 items-center space-x-24"
          style={{ height: "35vh" }}
        >
          <div style={{ width: "30vw" }} className="tracking-tighter">
            Energi og miljø-studiet er et sivilingeniørstudie (Master of
            technology) ved Norges teknisk-naturvitenskapelige universitet,
            NTNU. Studiet ble først introdusert våren 1998 og med et engasjert
            første kull ble linjeforeningen{" "}
            <span className="font-bold">Emil</span> stiftet den 28. september
            1998 kort tid etter første immatrikulering.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => scrollToSection("om_studiet")}>
              Om studiet
            </Button>
            <Button onClick={() => scrollToSection("historie")}>
              Historie
            </Button>
            <Button onClick={() => scrollToSection("hovedstyret")}>
              Hovedstyret
            </Button>
            <Button onClick={() => scrollToSection("kontak_oss")}>
              Kontakt oss{" "}
            </Button>
          </div>
        </div>
        <TransissionIn />
        <div
          id="om_studiet"
          style={{ height: "125vh" }}
          className="background-dark text-white flex flex-col items-center tracking-tighter"
        ><div className="flex flex-col w-[65%] py-10 space-y-5">
          <div id="Top" className="font-semibold text-2xl">Studiet er et fem-årig sivilingeniørstudie ved NTNU i Trondheim. Det kombinerer <span className="text-[#579783]">energi- og prosessteknikk</span> med <span className="text-[#579783]">elkraftteknikk</span> som gjør at du får en unik forståelse av energisystemet som helhet.</div>
          <div id="Bottom" className="font-extralight text-l">Man får kunnskap til å ta del i den utviklingen som skjer i energisektoren. Fagene er tekniske og de første årene av studiet bygger på matematikk og tekniske grunnfag. Utover i studiet velger man retning og etterhvert fag selv. Retningene man kan velge mellom er:</div>
        </div>
        <div className="flex space-x-10">
              <RetningCard name="Elektrisk energiteknikk og smarte nett" subname="Elkraft" text="Handler om hvordan elektrisk energi brukes for å redusere CO2 utslipp for en effektiv og pålitelig energiforsyning." link="https://www.ntnu.no/studier/mtenerg/mtenerees"/>
              <RetningCard name="Energiplanlegging og miljøanalyse" subname="Midtlinja" text="Handler om å kunne planlegge og velge energiløsninger basert på en samlet vurdering av øknonomi, teknologi og miljøpåvirkninger" link="https://www.ntnu.no/studier/mtenerg/mtenergeg"/>
              <RetningCard name="Energi og prosessteknikk" subname="Prosess" text="Handler om hvordan man kan produsere nok energi og bruke den på en bærekraftig måte med tanke på klimaendringe og tilgjengelige energiressurser" link="https://www.ntnu.no/studier/mtenerg/mtenerees"/>
        </div>
        </div >
      </div>
      <TransissionOut />
      <div id="historie" style={{ height: "100vh" }} className=""></div>
      <TransissionIn />
      <div
        id="hovedstyret"
        style={{ height: "100vh" }}
        className="background-dark"
      ></div>
      <TransissionOut />
      <div id="kontak_oss" style={{ height: "100vh" }} className=""></div>
      <TransissionIn />
    </div>
  );
};

export default omEmilPage;
