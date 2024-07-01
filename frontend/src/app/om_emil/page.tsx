"use client";

import Hero2 from "@/components/hero/hero2";
import { Button } from "@/components/ui/button";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import React from "react";
import RetningCard from "@/components/cards/retningCard";
import { useRouter } from "next/navigation";

const omEmilPage = () => {
  // Function to scroll to the target section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

const router = useRouter();

  const handleClick = (link:string) =>{
  router.push(link);
}

  return (
    <div className="max-w-screen">
      <div className="flex flex-col mt-4">
        <Hero2
          title="Energi og miljøstudentenes linjeforening"
          undertitle="Her finner du informasjon om linjeforeningen Emil"
        />
        <div
          className="flex justify-center pt-10 items-center space-x-24 "
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
          style={{ height: "45rem" }}
          className="background-dark max-w-screen text-white flex flex-col justify-between items-center tracking-tighter space-y-10"
        ><div className="flex flex-col w-[65%] pt-20 space-y-5">
          <div id="Top" className="font-semibold text-2xl">Studiet er et fem-årig sivilingeniørstudie ved NTNU i Trondheim. Det kombinerer <span className="text-[#579783]">energi- og prosessteknikk</span> med <span className="text-[#579783]">elkraftteknikk</span> som gjør at du får en unik forståelse av energisystemet som helhet.</div>
          <div id="Bottom" className="font-extralight text-l">Man får kunnskap til å ta del i den utviklingen som skjer i energisektoren. Fagene er tekniske og de første årene av studiet bygger på matematikk og tekniske grunnfag. Utover i studiet velger man retning og etterhvert fag selv. Retningene man kan velge mellom er:</div>
        </div>
        <div className="flex space-x-10 w-[65%]">
              <RetningCard name="Elektrisk energiteknikk og smarte nett" subname="Elkraft" text="Handler om hvordan elektrisk energi brukes for å redusere CO2 utslipp for en effektiv og pålitelig energiforsyning." link="https://www.ntnu.no/studier/mtenerg/mtenerees"/>
              <RetningCard name="Energiplanlegging og miljøanalyse" subname="Midtlinja" text="Handler om å kunne planlegge og velge energiløsninger basert på en samlet vurdering av øknonomi, teknologi og miljøpåvirkninger" link="https://www.ntnu.no/studier/mtenerg/mtenergeg"/>
              <RetningCard name="Energi og prosessteknikk" subname="Prosess" text="Handler om hvordan man kan produsere nok energi og bruke den på en bærekraftig måte med tanke på klimaendringe og tilgjengelige energiressurser" link="https://www.ntnu.no/studier/mtenerg/mtenerves"/>
        </div>
        <div className="p-10">
          <Button onClick={() => window.open("https://www.ntnu.no/studier/mtenerg", "_blank")} className="text-xl font-bold bg-white text-primary hover:bg-zinc-400 hover:border-primary">Les mer om energi og miljø her</Button>
        </div >
        </div>
      </div>
      <TransissionOut />
      <div id="historie" style={{ height: "fit" }} className="flex justify-center">
        <div className="flex flex-col w-[65%]">
          <div className="flex justify-center text-2xl font-bold">Historie</div>
          <div className="flex justify-between space-x-10">
            <div id="Text" className="flex flex-col py-10 space-y-4 ">
              <p className="font-semibold text-xl">Elektrisk start...</p>
              <p className="text-l font-extralight">Ved linjeforeningens stiftelse ble de første vedtektene skrevet, emils grunnlag ble fastsatt. Med årene har ikke engasjementet blant studentene på linjen blitt noe mindre og i dag består EMIL av over tjue offisielle komiteer og er en av Gløshaugens mest aktive linjeforeninger.</p>
              <p className="text-l font-extralight">Særegent for EMIL er at alle de ulike komitéene er svært lavterskel. Her kan man bli med i alt fra EMIL sin turkomité, festkomité, idrettskomité til linjeavisen og det er noe for enhver å delta i her.</p>
              <p className="text-l font-extralight">Etter hvert har også linjeforeningen utviklet et sterkt nettverk til energibransjen og dette håndteres av Emil-Link. Mer informasjon om dem her.</p>
            </div>
            <div id="Vedtekt" className="text-white flex items-center">
             <div className="bg-[#003A42] flex flex-col items-center py-10 rounded-md px-10 justify-top space-y-10 ">
              <p className="text-xl font-semibold">Fra vedtektene</p>
              <p className="text-l font-normal">§ 1-2 Hensikt
              EMIL søker å styrke de sosiale forbindelsene mellom EMILs medlemmer, samt forholdet til de forskjellige fakulteter, linjer og linjeforeninger, og gjennom dette forbedre forholdene for studentene. EMIL er først og fremst en sosial organisasjon.</p>
              <Button onClick={()=>handleClick("for_studenten/rapporter")}>Les mer om vedtektene her</Button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <TransissionIn />
      <div
        id="hovedstyret"
        style={{ height: "100vh" }}
        className="background-dark max-w-screen"
      >
        <div className="flex flex-col w-[65%] text-white">Hovedstyret</div>
      </div>
      <TransissionOut />
      <div id="kontak_oss" style={{ height: "100vh" }} className=""></div>
      <TransissionIn />
    </div>
  );
};

export default omEmilPage;
