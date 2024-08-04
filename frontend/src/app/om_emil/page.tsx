"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import RetningCard from "@/components/cards/retningCard";
import HSCard from "@/components/cards/styretCard";
import Logos from "@/components/logosection/komitelogo";
import Fagkontakt from "@/components/cards/fag_kontakt";

const OmEmilPage = () => {
  const [styret, setStyret] = useState([]);
  const [logos, setLogos] = useState([]);

  const fetchAndSetData = async () => {
    const [styretData, logosData] = await Promise.all([
      fetch("api/styret").then((response) => response.json()),
      fetch("api/komite/logo").then((response) => response.json()),
    ]);
    return { styretData, logosData };
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const { styretData, logosData } = await fetchAndSetData();
        setStyret(styretData);
        setLogos(logosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initData();
  }, []);

  const fagkontakt = [
    {
      navn: "Halsten Aastebøl",
      rolle: "Faglig studieveileder",
      text: "Ansvarlig for faglige spørsmål og spørsmål rundt studieprogrammet",
      bilde: "image/fagkontakt/Halsten.jpg",
      mail: "halsten.aastebol@ntnu.no",
      nummer: 73594267,
    },
    {
      navn: "Kristoffer Halseth",
      rolle: "Student og studieveileder",
      text: "Ansvarlig for psykososiale eller generelle spørsmål",
      bilde: "image/fagkontakt/Halseth.jpg",
      mail: "kristoffer.halseth@ntnu.no",
      nummer: 73594201,
    },
  ];
  // Function to scroll to the target section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-screen">
      <div className="flex flex-col justify-center ">
        <Hero2
          title="Energi og miljøstudentenes linjeforening"
          undertitle="Her finner du informasjon om linjeforeningen Emil"
        />
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[65%]">
            <div
              className="flex justify-between pt-10 items-center space-x-10"
              style={{ height: "35vh" }}
            >
              <div className="w-[35vw] font-extralight text-l">
                Energi og miljø-studiet er et sivilingeniørstudie (Master of
                technology) ved Norges teknisk-naturvitenskapelige universitet,
                NTNU. Studiet ble først introdusert våren 1998 og med et
                engasjert første kull ble linjeforeningen{" "}
                <span className="font-bold">Emil</span> stiftet den 28.
                september 1998 kort tid etter første immatrikulering.
              </div>
              <div className="grid grid-cols-3 gap-4">
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
                <Button onClick={() => scrollToSection("Fagkontakt")}>
                  Faglige spørsmål
                </Button>
                <Button onClick={() => scrollToSection("varsling")}>
                  Varsle?
                </Button>
              </div>
            </div>
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
                  src="/image/Komiteer/HS/HSfelles.jpg"
                  alt="Hovedstyret fellesbilde"
                  className="rounded-md object-cover w-[100rem] h-[19rem]"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <p className="font-semibold text-l">
                  er linjeforeningens øverste organ og har ansvaret for driften
                  og ledelsen av organisasjonen i det daglige. Styret består av
                  syv faste medlemmer med ansvarsområder innenfor alt fra
                  arrangement og fadderuker, til økonomi og næringsliv.
                </p>
                <p className="font-extralight text-l">
                  Alle styremedlemmene fungerer på lik linje, med alle de
                  rettigheter og plikter som dette innebærer. Som medlem i
                  styret tilegner du deg fort nye kunnskaper og ferdigheter,
                  ikke bare innen ditt eget ansvarsområde, men også om EMIL som
                  helhet, NTNU og hele studentfrivilligheten i Trondheim.
                </p>
                <p className="font-extralight text-l">
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
      <div id="studiemiljøet" className="flex justify-center">
        <div className="flex flex-col space-y-5 w-[65%]">
          <div className="flex items-center justify-center text-2xl font-bold">
            Studiemiljøet
          </div>
          <div className="flex justify-between space-x-10">
            <div className="flex flex-col justify-between space-y-5 ">
              <p className="font-medium text-xl">
                Emil hadde ikke vært Emil uten studentfrivilligheten
              </p>
              <p className="font-extralight text-l">
                I dag har Emil noe å by på for alle og enhver. Linjeforeningen
                har over 20 offisielle komitteer som alle holder på hver sine
                aktiviteter.{" "}
              </p>
              <p className="font-extralight text-l">
                På Emil er deltakelse oppfordret og man kan bli med i så mange
                komiteer man ønsker. Særegent for komiteene på Emil er at alle
                er lavterskel og holder sterkt fokus på et sosialt tilbud.
              </p>
              <p className="font-extralight text-l">
                Skulle du savne en komite som holder på med akkurat din
                favorittaktivitet er også terskelen for å starte en ny komite
                lav. Man kan dermed ta kontakt med hovedstyret for en prat og
                for å lage en plan på hvordan man kan starte en ny komite.
              </p>
              <Link href={"for_studenten/komiteer"}>
                <Button>Les mer om komiteene her</Button>
              </Link>
            </div>
            <div className="flex items-center">
              <Logos data={logos} />
            </div>
          </div>
        </div>
      </div>
      <TransissionIn />
      <div
        id="Fagkontakt"
        className="background-dark max-w-screen flex justify-center text-white"
      >
        <div className="flex flex-col items-center w-[65%] py-10 space-y-10">
          <div className="text-2xl font-bold">Faglig kontakt</div>
          <div className="font-extralight text-l">
            Emil har mange kontaktpersoner designert til å hjelpe deg med
            studenttilværelsen. Avhengig av hvilke formål man har er det
            forskjellige kontaktpersoner. Her finner du kontaktinformasjon for
            de ulike formålene.
          </div>
          <div className="flex space-x-5 justify-between px-10">
            <Fagkontakt
              name={fagkontakt[0].navn}
              rolle={fagkontakt[0].rolle}
              text={fagkontakt[0].text}
              bilde={fagkontakt[0].bilde}
              mail={fagkontakt[0].mail}
              nummer={fagkontakt[0].nummer}
            />
            <Fagkontakt
              name={fagkontakt[1].navn}
              rolle={fagkontakt[1].rolle}
              text={fagkontakt[1].text}
              bilde={fagkontakt[1].bilde}
              mail={fagkontakt[1].mail}
              nummer={fagkontakt[1].nummer}
            />
          </div>
        </div>
      </div>
      <TransissionOut />
      <div id="varsling" className="max-w-screen flex justify-center">
        <div className="flex flex-col items-center w-[65%] space-y-5">
          <p className="text-2xl font-bold">Varsle</p>
          <p className="font-extralight text-l">
            Noe av det viktigste vi kan gjøre for å sikre at alle i
            linjeforeningen kommer seg trygt gjennom studietiden, er å si ifra
            når ting ikke er som de skal. Uansett om det er en stor eller liten
            utfordring/hendelse, er det bedre å si ifra en gang for mye enn en
            gang for lite.{" "}
          </p>
          <p className="font-extralight text-l">
            Enhver hendelse som meldes inn her vil bli tatt på alvor. Du kan
            velge å holde det anonymt, eller å skrive ditt navn for at
            linjeforeningsstyret kan følge opp hendelsen/situasjonen videre med
            deg. Uansett vil vi i denne prosessen ta hensyn til deg og andre
            berørte, og ansvarlige for å håndtere varslingen har taushetsplikt.
          </p>
          <div className="space-x-5">
            <Link href="for_studenten/varsle_oss">
              <Button>Meld inn varslingssak her</Button>
            </Link>
            <Link href="for_studenten/varsle_oss">
              <Button>Les om håndteringen her</Button>
            </Link>
          </div>
        </div>
      </div>
      <TransissionIn />
    </div>
  );
};

export default OmEmilPage;
