import NaeringslivCard from "@/components/cards/naeringsliv_cards";
import EmilLink from "@/components/EmilLink/EmilLink";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import LogoSection from "@/components/logosection/logosection";

const NaeringslivPage = () => {
  return (
    <div>
      <div>
        <Hero2 title="Næringsliv" undertitle="Her finner du alt du trenger å vite om Emil og næringslivet" />
      </div>
      <p className="m-3 px-80 flex text-left-center font-extralight text-l">
        Energi- og miljøstudiet har utviklet et godt kontaktnett med
        energibransjen og næringslivet. Energikontakten fungerer som et
        bindeledd mellom studentene på linjen, faglærere og næringslivet.
      </p>
      <p className="m-3 flex text-left-center px-80 text-primary font-extralight pt-4 mt-2  ">
        Nedenfor finner du en oversikt over EMIL sine samarbeidspartnere.
      </p>

      <TransissionIn />

      <div className="bg-[#001D21] flex justify-center items-stretch space-x-24 h-full py-16 ">
        <NaeringslivCard
          titleImageSrc="image/sponsorer/multiconsult.svg"
          imageLinkHref={"https://www.multiconsult.no/"}   
          subtitle="Hovedsamarbeidspartner"
          description="Selskapet opererer innenfor flere relevante områder for Energi og miljø-studenter. Blant disse er fornybar energi, vann og miljø, bygg og eiendom og samferdsel. De står dermed for fremtidens bærekraftige by- og stedsutvikling, hvor kompetanse fra EMIL-studenter står helt sentralt. Multiconsult ansetter årlig flere fra Energi og miljø-studiet, og er et av de aller mest attraktive arbeidsplassene for teknologistudenter."
          linkText=" Mer om Multiconsult."
          linkHref="https://www.multiconsult.no/"
          buttonText="Ledige stillinger"
          buttonLinkHref="https://www.multiconsult.no/karriere/must-2/sommerjobb-2/"
                 
        />
        <NaeringslivCard
          titleImageSrc="image/sponsorer/statkraft_logo.jpg"
          imageLinkHref={"https://www.statkraft.no/"}
          subtitle="Hovedsamarbeidspartner"
          description="De er med det også en av Energi og Miljø-studentenes største arbeidsgivere. EMIL og Statkraft har vært hovedsamarbeidspartnere siden 2016, men Statkraft har i en rekke år hatt samarbeid med EMIL-link. Samarbeidet har utviklet linjeforeningen til å bli det den er idag, og Statkraft har omtrent blitt et symbol på det Energi og Miljø-studiet handler om. Vi i EMIL er derfor stolte over å ha Statkraft som en av våre to hovedsamarbeidspartnere. "
          linkText="Mer om Statkraft"
          linkHref="https://www.statkraft.no/"
          buttonText="Ledige stillinger"
          buttonLinkHref="https://www.statkraft.no/karriere/ledige-stillinger/?gad_source=1&gclid=CjwKCAjw4ri0BhAvEiwA8oo6F1DD6IQT0s1fAdirdGZUIT-ZIe_bIkoxpPPFkN6SesMPVtEUHlIcBRoC57kQAvD_BwE" 
        />        
      </div>

      <div className="">
        <EmilLink />
      </div>

      <TransissionOut />

      <LogoSection />

      <TransissionIn/>
    </div>
  );
};

export default NaeringslivPage;
