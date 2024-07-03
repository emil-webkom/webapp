"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import React from "react";
import RetningCard from "@/components/cards/retningCard";
import HSCard from "@/components/cards/styretCard";

const OmEmilPage = () => {
  const styret = [
    {
      rolle: "Kongsknekt - Leder",
      name: "Henriette Strømsvaag",
      text: "Kongsknekten er linjeforeningens øverste leder og har kontroll på aktiviteten i EMIL i tillegg til å opprettholde godt samarbeid internt og eksternt",
      mail: "henriette.stromsvaag@gmail.com",
      nummer: 46760243,
      bilde: "image/Komiteer/HS/leder.jpg",
    },
    {
      rolle: "Viseknekt - Nestleder",
      name: "Sander Næss",
      text: "Viseknekten er kongsknektens høyre hånd, og har ansvar for samarbeidet EMIL-styret har med næringsliv og andre bedriftsrelaterte institusjoner på NTNU",
      mail: "sanderhn@stud.ntnu.no",
      nummer: 91857070,
      bilde: "image/Komiteer/HS/nestleder.jpg",
    },
    {
      rolle: "Fut - Økonomiansvarlig",
      name: "Eirik Haugsdal",
      text: "Futen har til enhver tid oversikt over penger som flyter ut, inn og som blir værende i organisasjonen, samt organisasjonens økonomi totalt sett",
      mail: "haugsdaleirik21@gmail.com",
      nummer: 95484594,
      bilde: "image/Komiteer/HS/fut.jpg",
    },
    {
      rolle: "Hyrd - Fadderansvarlig",
      name: "Vegard Jensen",
      text: "Hyrden sørger for at 1. klasse får den best tenkelige starten på energi- og miljøstudiet, og NTNU forøvrig, i tillegg til å være en sosial og omgjengelig person",
      mail: "vegard734@gmail.com",
      nummer: 47687685,
      bilde: "image/Komiteer/HS/hyrd.jpg",
    },
    {
      rolle: "Trubadur - PR og webansvarlig",
      name: "Dea Elizabeth Kåss",
      text: "Trubaduren har ansvaret for EMILs kommunikasjon, både internt og eksternt. Dette innebærer blant annet drift organisasjonens sosiale medier og utarbeidelse av kommunikasjons- og blesteplaner",
      mail: "deaek@stud.ntnu.no",
      nummer: 91891307,
      bilde: "image/Komiteer/HS/trubadur.jpg",
    },
    {
      rolle: "Lovn - Arrangementansvarlig",
      name: "Felix Linus Dahl",
      text: "Lovnen er styrets arrangementsansvarlig og har ansvaret for å planlegge og gjennomføre EMILs velkjente arrangementer",
      mail: "felixlinusdahl@gmail.com",
      nummer: 92403716,
      bilde: "image/Komiteer/HS/lovn.jpg",
    },
    {
      rolle: "Gjøgler - Komiteansvarlig",
      name: "Kamilla Engaas",
      text: "Gjøgleren har ansvaret for å holde liv i komitéene og sørger for god informasjonsflyt og samarbeid mellom komitéene og styret",
      mail: "kamilla.engaas@gmail.com",
      nummer: 90414860,
      bilde: "image/Komiteer/HS/gjøgler.jpg",
    },
  ];

  // Function to scroll to the target section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

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
            <Button onClick={() => scrollToSection("studiemiljøet")}>
              Studiemiljøet
            </Button>
          </div>
        </div>
        <TransissionIn />
        <div
          id="om_studiet"
          style={{ height: "45rem" }}
          className="background-dark max-w-screen text-white flex flex-col justify-between items-center tracking-tighter space-y-10"
        >
          <div className="flex flex-col w-[65%] pt-20 space-y-5">
            <div id="Top" className="font-semibold text-2xl">
              Studiet er et fem-årig sivilingeniørstudie ved NTNU i Trondheim.
              Det kombinerer{" "}
              <span className="text-[#579783]">energi- og prosessteknikk</span>{" "}
              med <span className="text-[#579783]">elkraftteknikk</span> som
              gjør at du får en unik forståelse av energisystemet som helhet.
            </div>
            <div id="Bottom" className="font-extralight text-l">
              Man får kunnskap til å ta del i den utviklingen som skjer i
              energisektoren. Fagene er tekniske og de første årene av studiet
              bygger på matematikk og tekniske grunnfag. Utover i studiet velger
              man retning og etterhvert fag selv. Retningene man kan velge
              mellom er:
            </div>
          </div>
          <div className="flex space-x-10 w-[65%]">
            <RetningCard
              name="Elektrisk energiteknikk og smarte nett"
              subname="Elkraft"
              text="Handler om hvordan elektrisk energi brukes for å redusere CO2 utslipp for en effektiv og pålitelig energiforsyning."
              link="https://www.ntnu.no/studier/mtenerg/mtenerees"
            />
            <RetningCard
              name="Energiplanlegging og miljøanalyse"
              subname="Midtlinja"
              text="Handler om å kunne planlegge og velge energiløsninger basert på en samlet vurdering av øknonomi, teknologi og miljøpåvirkninger"
              link="https://www.ntnu.no/studier/mtenerg/mtenergeg"
            />
            <RetningCard
              name="Energi og prosessteknikk"
              subname="Prosess"
              text="Handler om hvordan man kan produsere nok energi og bruke den på en bærekraftig måte med tanke på klimaendringe og tilgjengelige energiressurser"
              link="https://www.ntnu.no/studier/mtenerg/mtenerves"
            />
          </div>
          <div className="p-10">
            <Button
              onClick={() =>
                window.open("https://www.ntnu.no/studier/mtenerg", "_blank")
              }
              className="text-xl font-bold bg-white text-primary hover:bg-zinc-400 hover:border-primary"
            >
              Les mer om energi og miljø her
            </Button>
          </div>
        </div>
      </div>
      <TransissionOut />
      <div
        id="historie"
        style={{ height: "fit" }}
        className="flex justify-center"
      >
        <div className="flex flex-col w-[65%]">
          <div className="flex justify-center text-2xl font-bold">Historie</div>
          <div className="flex justify-between space-x-10">
            <div id="Text" className="flex flex-col py-10 space-y-4 ">
              <p className="font-semibold text-xl">Elektrisk start...</p>
              <p className="text-l font-extralight">
                Ved linjeforeningens stiftelse ble de første vedtektene skrevet,
                emils grunnlag ble fastsatt. Med årene har ikke engasjementet
                blant studentene på linjen blitt noe mindre og i dag består EMIL
                av over tjue offisielle komiteer og er en av Gløshaugens mest
                aktive linjeforeninger.
              </p>
              <p className="text-l font-extralight">
                Særegent for EMIL er at alle de ulike komitéene er svært
                lavterskel. Her kan man bli med i alt fra EMIL sin turkomité,
                festkomité, idrettskomité til linjeavisen og det er noe for
                enhver å delta i her.
              </p>
              <p className="text-l font-extralight">
                Etter hvert har også linjeforeningen utviklet et sterkt nettverk
                til energibransjen og dette håndteres av Emil-Link. Mer
                informasjon om dem her.
              </p>
            </div>
            <div id="Vedtekt" className="text-white flex items-center">
              <div className="bg-[#003A42] flex flex-col items-center py-10 rounded-md px-10 justify-top space-y-10 ">
                <p className="text-xl font-semibold">Fra vedtektene</p>
                <p className="text-l font-normal">
                  § 1-2 Hensikt EMIL søker å styrke de sosiale forbindelsene
                  mellom EMILs medlemmer, samt forholdet til de forskjellige
                  fakulteter, linjer og linjeforeninger, og gjennom dette
                  forbedre forholdene for studentene. EMIL er først og fremst en
                  sosial organisasjon.
                </p>
                <Link href={"for_studenten/rapporter"}>
                  <Button>Les mer om vedtektene her</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransissionIn />
      <div
        id="hovedstyret"
        style={{ height: "" }}
        className="background-dark max-w-screen flex justify-center"
      >
        <div className="flex flex-col w-[65%] text-white py-10 space-y-10">
          <div>
            <p className="flex justify-center text-2xl font-bold">
              Hovedstyret
            </p>
            <div className="flex justify-between py-10 space-x-10">
              <div
                className="flex items-center justify-center"
                style={{ overflow: "hidden" }}
              >
                <img
                  src="image/komiteer/HS/HSfelles.jpg"
                  alt="Hovedstyret fellesbilde"
                  className="rounded-md object-cover w-[100rem] h-[19rem]"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <p className="font-semibold text-l tracking-tighter">
                  er linjeforeningens øverste organ og har ansvaret for driften
                  og ledelsen av organisasjonen i det daglige. Styret består av
                  syv faste medlemmer med ansvarsområder innenfor alt fra
                  arrangement og fadderuker, til økonomi og næringsliv.
                </p>
                <p className="font-extralight text-sm">
                  Alle styremedlemmene fungerer på lik linje, med alle de
                  rettigheter og plikter som dette innebærer. Som medlem i
                  styret tilegner du deg fort nye kunnskaper og ferdigheter,
                  ikke bare innen ditt eget ansvarsområde, men også om EMIL som
                  helhet, NTNU og hele studentfrivilligheten i Trondheim.
                </p>
                <p className="font-extralight text-sm">
                  Etter generalforsamling konstituerer styret seg selv, noe som
                  betyr at det nyvalgte styret selv avgjør hvem som skal ha
                  hvilken stilling i styret. Unntaket til regelen er
                  kongsknekten, som velges først.
                </p>
              </div>
            </div>
          </div>
          <HSCard data={styret} />
        </div>
      </div>
      <TransissionOut />
      <div
        id="studiemiljøet"
        style={{ height: "100vh" }}
        className="text-primary"
      >
        <div>studiemiljøet</div>
      </div>
      <TransissionIn />
    </div>
  );
};

export default OmEmilPage;
