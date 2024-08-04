import Hero from "@/components/hero/hero1";
import HSCard from "@/components/cards/styretCard";
import InfoAndScrollbarLeft from "@/components/ForStudenten/InfoAndScrollbarLeft";

const styret = [
  {
    rolle: "Kongsknekt - Leder",
    name: "Henriette Strømsvaag",
    text: "Kongsknekten er linjeforeningens øverste leder og har kontroll på aktiviteten i EMIL i tillegg til å opprettholde godt samarbeid internt og eksternt",
    mail: "henriette.stromsvaag@gmail.com",
    nummer: 46760243,
    bilde: "/image/Komiteer/HS/leder.jpg",
  },
  {
    rolle: "Viseknekt - Nestleder",
    name: "Sander Næss",
    text: "Viseknekten er kongsknektens høyre hånd, og har ansvar for samarbeidet EMIL-styret har med næringsliv og andre bedriftsrelaterte institusjoner på NTNU",
    mail: "sanderhn@stud.ntnu.no",
    nummer: 91857070,
    bilde: "/image/Komiteer/HS/nestleder.jpg",
  },
  {
    rolle: "Fut - Økonomiansvarlig",
    name: "Eirik Haugsdal",
    text: "Futen har til enhver tid oversikt over penger som flyter ut, inn og som blir værende i organisasjonen, samt organisasjonens økonomi totalt sett",
    mail: "haugsdaleirik21@gmail.com",
    nummer: 95484594,
    bilde: "/image/Komiteer/HS/fut.jpg",
  },
  {
    rolle: "Hyrd - Fadderansvarlig",
    name: "Vegard Jensen",
    text: "Hyrden sørger for at 1. klasse får den best tenkelige starten på energi- og miljøstudiet, og NTNU forøvrig, i tillegg til å være en sosial og omgjengelig person",
    mail: "vegard734@gmail.com",
    nummer: 47687685,
    bilde: "/image/Komiteer/HS/hyrd.jpg",
  },
  {
    rolle: "Trubadur - PR og webansvarlig",
    name: "Dea Elizabeth Kåss",
    text: "Trubaduren har ansvaret for EMILs kommunikasjon, både internt og eksternt. Dette innebærer blant annet drift organisasjonens sosiale medier og utarbeidelse av kommunikasjons- og blesteplaner",
    mail: "deaek@stud.ntnu.no",
    nummer: 91891307,
    bilde: "/image/Komiteer/HS/trubadur.jpg",
  },
  {
    rolle: "Lovn - Arrangementansvarlig",
    name: "Felix Linus Dahl",
    text: "Lovnen er styrets arrangementsansvarlig og har ansvaret for å planlegge og gjennomføre EMILs velkjente arrangementer",
    mail: "felixlinusdahl@gmail.com",
    nummer: 92403716,
    bilde: "/image/Komiteer/HS/lovn.jpg",
  },
  {
    rolle: "Gjøgler - Komiteansvarlig",
    name: "Kamilla Engaas",
    text: "Gjøgleren har ansvaret for å holde liv i komitéene og sørger for god informasjonsflyt og samarbeid mellom komitéene og styret",
    mail: "kamilla.engaas@gmail.com",
    nummer: 90414860,
    bilde: "/image/Komiteer/HS/gjøgler.jpg",
  },
];

const forStudentenPage = () => {
  return (
    <div className="   ">
      <InfoAndScrollbarLeft
        title={"EMIL-Styret"}
        imageUrl={"/image/Komiteer/HS/HSfelles.jpg"}
        text={
          "EMIL-styret er linjeforeningens øverste organ og har ansvaretfor driften og ledelsen av organisasjonen i det daglige. Styret består av syv faste medlemmer, med ansvarsområder innenfor alt fra arrangementog fadderuker, til økonomi og næringsliv."
        }
        info={
          "Alle styremedlemmene fungerer på lik linje, med alle de rettigheter og plikter som dette innebærer. Som medlem i styret tilegner du deg fort nye kunnskaper og ferdigheter, ikke bare innen ditt eget ansvarsområde, men også om EMIL som helhet, NTNU og hele studentfrivilligheten i Trondheim. Etter generalforsamling konstituerer styret seg selv, noe som betyr at det nyvalgte styret selv avgjør hvem som skal ha hvilken stilling i styret. Unntaket til regelen er kongsknekten, som velges først."
        }
      >
        <div className="mt-12 mb-12">
          <HSCard data={styret}></HSCard>
        </div>
      </InfoAndScrollbarLeft>
    </div>
  );
};

export default forStudentenPage;
