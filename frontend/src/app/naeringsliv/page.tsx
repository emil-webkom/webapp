import NaeringslivCard from "@/components/cards/naeringsliv_cards";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transiossionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import LogoSection from "@/components/logosection/logosection";

const NaeringslivPage = () => {
  return (
    <div>
      <div className="mt-4">
        <Hero2
          title="Næringsliv"
          undertitle="Her finner du alt du trenger å vite om Emil og næringslivet"
        />
      </div>
      <p className="m-7 px-80 flex text-left-center ">
        Energi- og miljøstudiet har utviklet et veldig godt kontaktnett med
        energibransjen og næringslivet. Energikontakten fungerer som et
        bindeledd mellom studentene på linjen, faglærere og næringslivet.
      </p>
      <p className="m-7 flex text-left-center px-80 text-[#001D21] font-thin pt-10 ">
        Nedenfor finner du en oversikt over EMIL sine samarbeidspartnere.
      </p>

      <TransissionIn />

      <div className="bg-[#001D21] flex justify-center items-stretch space-x-24 h-full">
        <NaeringslivCard
          titleImageSrc="image/multiconsult.svg"
          subtitle="Hovedsamarbeidspartner"
          description="Selskapet opererer innenfor flere relevante områder for Energi og miljø-studenter. Blant disse er fornybar energi, vann og miljø, bygg og eiendom og samferdsel. De står dermed for fremtidens bærekraftige by- og stedsutvikling, hvor kompetanse fra EMIL-studenter står helt sentralt. Multiconsult ansetter årlig flere fra Energi og miljø-studiet, og er et av de aller mest attraktive arbeidsplassene for teknologistudenter."
          linkText=" Mer om Multiconsult."
          linkHref="https://www.multiconsult.no/"
          buttonText="Ledige stillinger"
          buttonLinkHref=""
        />
        <NaeringslivCard
          titleImageSrc="image/statkraft_logo.jpg"
          subtitle="Hovedsamarbeidspartner"
          description="De er med det også en av Energi og Miljø-studentenes største arbeidsgivere. EMIL og Statkraft har vært hovedsamarbeidspartnere siden 2016, men Statkraft har i en rekke år hatt samarbeid med EMIL-link. Samarbeidet har utviklet linjeforeningen til å bli det den er idag, og Statkraft har omtrent blitt et symbol på det Energi og Miljø-studiet handler om. Vi i EMIL er derfor stolte over å ha Statkraft som en av våre to hovedsamarbeidspartnere. "
          linkText="Mer om Statkraft"
          linkHref="https://www.statkraft.no/"
          buttonText="Ledige stillinger"
          buttonLinkHref=""
        />
      </div>

      <div className="bg-[#001D21] flex justify-center ">
        <p className="text-white mx-5  ">
          For bedrifter Ønsker din bedrift å promotere stillingsannonser,
          internships eller gi et generelt innblikk i hva din bedrift driver
          med? Emil-Link tilbyr flere ulike tjenester hvor bedrifter har
          mulighet til å komme i kontakt med våre studenter og gjøre nettopp
          dette. EMIL-Link er Energi- og miljøingeniørenes bedriftskontakt, en
          komite underlagt linjeforeningen. Våre medlemmer jobber hardt for å gi
          det beste tilbudet til studentene, og være deres link til
          arbeidslivet!
        </p>
      </div>

      <TransissionOut />

      <LogoSection />
    </div>
  );
};

export default NaeringslivPage;
