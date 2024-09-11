"use client";
import DropdownCard, {
  dropdownCardProps,
} from "@/components/cards/dropdownCard";
import NyStudentCard, {
  nyStudentCardProps,
} from "@/components/cards/nyStudentCard";
import HeaderImage from "@/components/ForStudenten/headerImage";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import NyStudentSection, {
  nyStudentSectionProps,
} from "@/components/ForStudenten/nyStudent/nyStudentSection";
import ThumbnailButton, {
  thumbnailButtonProps,
} from "@/components/ForStudenten/nyStudent/thumbnailButton";
import SmallTransissionDarkHighligh from "@/components/hero/transissions/smallTransissionDarkHighlight";
import SmallTransissionHighlightSPC from "@/components/hero/transissions/smallTransissionHighlightSPC";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import StickyNavbar from "@/components/navbar/stickyNavbar";
import { Button } from "@/components/ui/button";
import TextLink from "@/components/ui/textLink";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Building,
  Coins,
  Facebook,
  Home,
  Key,
  Mail,
  Shirt,
  User,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaFacebookF } from "react-icons/fa";

const ForStudentPage = () => {
  const unnagjortCards: nyStudentCardProps[] = [
    {
      title: "Registrere deg og betale semesteravgift",
      description:
        "Når du har fått plass på studiet må semesteravgiften betales og fag må velges. Logg deg inn på StudentWeb og følg instruksjonene.",
      frist: "15. sep (høst) og 1. feb (vår)",
      icon: <Coins className="h-5" />,
      buttons: [
        {
          text: "Betaling av semesteravgift",
          href: "https://i.ntnu.no/wiki/-/wiki/Norsk/Semesteravgift+og+registrering",
        },
      ],
    },
    {
      title: "Opprette bruker hos NTNU",
      description:
        "Når du har registrert deg på studentweb kan du opprette din NTNU-brukerkonto. Dette gir deg tilgang til NTNUs IT-tjenester.",
      frist: "15. sep (høst) og 1. feb (vår)",
      icon: <User className="h-5" />,
      buttons: [
        {
          text: "Bruker hos NTNU",
          href: "https://i.ntnu.no/wiki/-/wiki/Norsk/Aktiver+brukerkonto",
        },
      ],
    },
    {
      title: "Melde adresseendring",
      description:
        "Du bør endre postadressen din. Vær rask! Du får viktig post fra NTNU og Lånekassen, og du får ikke omgjøringsstipend uten.",
      icon: <Mail className="h-5" />,
      buttons: [
        {
          text: "Skatteetaten",
          href: "https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/",
        },
      ],
    },
    {
      title: "Skaff adgangskort",
      description:
        "Kortet fungerer som lånekort til biblioteket og adgangskort til rom og til utskrifter.",
      icon: <Key className="h-5" />,
      buttons: [
        {
          text: "Skaffe adgangskort",
          href: "https://innsida.ntnu.no/studentkort",
        },
      ],
    },
    {
      title: "Søk om stipend og lån",
      description:
        "Søk stipend og lån hos Lånekassen. Du må betale semesteravgiften for å få stipend og studielån.",
      icon: <Key className="h-5" />,
      buttons: [{ text: "Lånekassen", href: "https://lanekassen.no/" }],
    },
    {
      title: "Wifi på campus",
      description:
        "Eduroam-nettet finnes på alle NTNU campuser. Last ned det automatiske oppsettet og koble deg på!",
      icon: <Wifi className="h-6" />,
      buttons: [
        {
          text: "Koble til Eduroam",
          href: "https://innsida.ntnu.no/wiki/-/wiki/Norsk/Tr%C3%A5dl%C3%B8st+nett",
        },
      ],
    },
    {
      title: "Meld deg på fadderopplegget",
      description:
        "Dersom du ønsker å bli med på fadderukene må du fylle ut påmeldingsskjema. Det er veldig anbefalt å delta!",
      icon: <Shirt className="h-6" />,
      buttons: [
        {
          text: "Påmeldingsskjema",
          href: "https://docs.google.com/forms/d/e/1FAIpQLScS8x6cBvKwrlFHGMF5nAFCfWh_DVnuJFQC67lITu8JiEycQA/viewform",
        },
      ],
    },
    {
      title: "Bli med i facebook-gruppen",
      description:
        "Det er mye nyttig informasjon som bare legges ut på facebook. Så bli med i din klasses facebook-gruppe!",
      icon: <FaFacebookF className="h-5" />,
      buttons: [
        {
          text: "EMIL ‘24",
          href: "https://www.facebook.com/groups/1128521504910742",
        },
        { text: "Hele EMIL", href: "https://www.facebook.com/groups/Ntnuemil" },
      ],
    },
  ];

  const forsteUkeneCards: dropdownCardProps[] = [
    {
      title: "Immatrikulering",
      content:
        "Skoleåret begynner med felles samling og immatrikulering på Gløshaugen. Dette skjer mandag 14. august i EL5 fra 12:00-13:00",
      time: "14. august 12:00 - 13:00",
      place: "Gløshaugen EL5",
      oneLiner:
        "Skoleåret begynner med felles samling og immatrikulering på...",
    },
    {
      title: "Fadderperioden",
      content: (
        <div className="space-y-8">
          <div className="space-y-2">
            <p>
              Fadderperioden består av to uker med arrangementer hver eneste
              dag. Målet er at alle som starter på energi og miljø skal få den
              ultimate starten på studiet og en herlig velkomst til studentbyen
              Trondheim. Disse ukene er hele byen preget av festivalstemning og
              terskelen for å hilse på nye folk er ikke-eksisterende.
            </p>
            <p>
              Husk å melde deg på ved å fylle ut påmeldingskjema{" "}
              <Link
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLScS8x6cBvKwrlFHGMF5nAFCfWh_DVnuJFQC67lITu8JiEycQA/viewform"
                }
                target="_blank"
                rel="noopener norefferer"
                className="text-green-300 underline"
              >
                her
              </Link>
              !
            </p>
          </div>
          <div className="">
            <img
              className="rounded-md"
              src="/image/EMIL/fadderukaPlan.png"
              alt=""
            />
          </div>
        </div>
      ),
      time: "14. august - 25. august",
    },
    {
      title: "Renselsen",
      content:
        "Dette er en innvielsessermoni til linjeforeningen for alle nye studenter og er tradisjonelt for sivil-ingienørlinjene på NTNU. Det skjer i september.",
      time: "Noen uker etter fadderperioden",
    },
    {
      title: "Immatrikuleringsball",
      content:
        "En velkomstfest for ny-studentene i linjeforeningen. Hele linjeforeningen samles til en helaften med mat, drikke og underholdning for å feire de nye studentene. Det skjer kvelden etter renselsen.",
      time: "Kvelden etter renselsen",
    },
    {
      title: "Teknostart",
      content:
        "Teknostart er et obligatorisk oppstartsprogram for førsteårs sivilingeniørstudenter ved NTNU, og vil i 2024 pågå i den første uken av semesteret. Det arrangeres av NTNU, ikke linjeforeningenen. Den faglige starten er den andre uken av semesteret og er en introduksjon til fagene studentene skal ha.",
      time: "Første uke",
    },
  ];

  interface tipsprops {
    mainpoint: string;
    description: ReactNode;
    thumbnailButton?: thumbnailButtonProps[];
  }
  //Data for tips-section
  const fagligeTips: tipsprops[] = [
    {
      mainpoint: "Bruk alternative læringsformer",
      description:
        " Det finnes mange gode ressurser på nettet som komplimenterer undervisningen. Et eksempel er kateter.no som er laget av NTNU studenter.",
      thumbnailButton: [
        {
          title: "Kateter",
          oneliner: "Læringsplatform for og av studenter",
          link: "https://kateter.no",
        },
      ],
    },
    {
      mainpoint: "Pensum",
      description:
        "Du kan spare både miljøet og lommeboka ved å se etter pensumbøker på Finn.no. Du kan også finne billige digitale kopier på ibok.no. Ellers finner du alt du trenger på Akademika",
      thumbnailButton: [
        {
          title: "iBok",
          oneliner: "Nettsted for av digitale bøker",
          link: "https://ibok.no",
        },
      ],
    },
    {
      mainpoint: "Bruk medstudenter og student-assistenter",
      description:
        "Bruk medstudenter og student-assistenter. Ikke vær redd for å spørre om hjelp eller veiledning fra dine eldre studenter. Ofte finnes det Piazza-forum per fag hvor du kan få hjelp. På EMNR.no kan man også finne gode tips.",
      thumbnailButton: [
        {
          title: "EMNR",
          oneliner: "Nettsted for vurdering av emner ved NTNU",
          link: "https://emnr.no",
        },
      ],
    },
    // {
    //   mainpoint: "EMILs lille hjelper",
    //   description:
    //     "Linjeforeningen har en felles disk hvor man deler ressurser internt i linjeforeningen. Kanskje det finnes noe lurt her som du kan få bruk for?",
    //   thumbnailButton: [
    //     {
    //       title: "EMILS lille hjelper",
    //       oneliner: "Linjeforeningens interne disk",
    //       link: "https://drive.google.com/drive/folders/0B1yZD12vp6TdRjJQZWhLNU51NnM?resourcekey=0--piITTQpCvehrwAFuTXJnQ",
    //     },
    //   ],
    // },
    {
      mainpoint: "Engasjer deg i frivilligheten",
      description:
        "Frivillighet er en enkel måte å møte nye folk på, enten det er i linjeforeningen eller i andre organisasjoner som samfundet. Det er også god CV-mat!",
      thumbnailButton: [
        {
          title: "Samfundet",
          oneliner: "Verdens åttends støreste utested",
          link: "https://samfundet.no",
        },
      ],
    },
    {
      mainpoint: "Mazemap",
      description:
        "Lost på campus? Last ned mazemap-appen for å finne frem til alle rom.",
      thumbnailButton: [
        {
          title: "Mazemap",
          oneliner: "Interaktivt kart over alle NTNU-campuser",
          link: "https://use.mazemap.com/",
        },
      ],
    },
    {
      mainpoint: "SIT",
      description:
        "Studentsamskipnaden har mye tilbud til studentene, alt fra bolig til helse. Bruk tilbudet til det du har behov for på SIT.no.",
      thumbnailButton: [
        {
          title: "SIT",
          oneliner: "Interaktivt kart over alle NTNU-campuser",
          link: "https://www.sit.no/",
        },
      ],
    },
    {
      mainpoint: "Organiser deg",
      description:
        "Tekna og Nito er begge fagforeninger som gir gode tilbud til medlemmene sine som f.eks. reiseforsikring, innbo og mer. Sjekk det ut!",
      thumbnailButton: [
        {
          title: "Tekna",
          oneliner: "Fagforening for siving-studenter",
          link: "https://www.tekna.no/",
        },
        {
          title: "NITO",
          oneliner: "Fagforening for siving-studenter",
          link: "https://www.nito.no/",
        },
      ],
    },

    // ["Eksperimenter med læringsmetoder:", "Det er mange måter å lære på og som student har vi full frihet til å velge hvilken metode vi vil selv. Ikke vær redd for å prøve ut et nytt format."],
    // ["Fokuser på en innlevering av gangen:", "På de tekniske studiene er det behov for å sikre læringsutbyttet til studentene og derfor er det en del innleveringer. Føles det mye, prøv å fokusere på en innlevering av gangen og husk at karakter er viktigere enn karakterer. "],
    // ["Kok med omhu:", "Det finnes mange måter å koke på, enten det er gjennom fult fyr på stekepannen eller om det er under lave temperaturer. Det er fort gjort å brenne seg om varmen blir for høy så kok klokt!"],
  ];

  //Where all sections of the page are coded
  const pageSections: nyStudentSectionProps[] = [
    {
      title: "Sjekkliste for nye EMIL-studenter",
      tag: "Sjekkliste",
      intro: (
        <>
          De viktigste tingene å få unnagjort når du har fått plass på studiet
          <br />
        </>
      ),
      content: (
        <div className="grid gap-8 lg:grid-cols-2">
          {unnagjortCards.map((c, i) => (
            <NyStudentCard {...c}></NyStudentCard>
          ))}
          <TextLink href="https://i.ntnu.no/ny-student">
            Les mer på NTNUs offisielle sjekkliste
          </TextLink>
        </div>
      ),
    },
    {
      title: "De første ukene på studiet",
      tag: "De første ukene",
      intro: <>Her kan du lese om opplegg som skjer de første ukene</>,
      content: (
        <div className="flex flex-col self-center w-full max-w-[512px] gap-4">
          {forsteUkeneCards.map((c, i) => (
            <DropdownCard
              key={i}
              title={c.title}
              content={c.content}
              time={c.time}
              place={c.place}
              oneLiner={c.oneLiner}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Tips og verktøy",
      tag: "Tips og verktøy",
      intro: (
        <>
          Her har vi samlet ulike tips og verktøy som kan komme godt med i
          studietiden
        </>
      ),
      content: (
        <div className="flex flex-col items-center w-full mt-4">
          <div className="flex flex-col gap-8">
            {fagligeTips.map((t, i) => (
              <div
                className={`flex max-w-3xl  flex-col lg:flex-row lg:gap-16 gap-2 `}
              >
                <div className="text-sm max-w-[512px]">
                  <p className="font-semibold text-base">{t.mainpoint}</p>
                  <p>{t.description}</p>
                </div>
                <div className="flex flex-row lg:flex-col flex-wrap w-full lg:w-fit gap-2">
                  {/* Renders button for the tip if there is one */}
                  {t.thumbnailButton &&
                    t.thumbnailButton.map((b) => <ThumbnailButton {...b} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Har du spørsmål?",
      tag: "Kontakt",
      content: (
        <div className="flex flex-col gap-2">
          <p className="max-w-[512px]">
            Hovedstyret i linjeforeningen er ansvarlig for mottakelsen og
            integreringen av nye studenter til linjeforeningen. De vil være mye
            med dere og gjøre sitt for at dere skal ha det bra. De er alltids
            tilgjengelige og kan kontaktes hvis du lurer på noe rundt oppstart
            eller rundt fadderperioden.
          </p>
          <div className="flex font-light flex-row items-end gap-6 lg:gap-12">
            <p>
              <span className="font-semibold">Fadderansvarlig:</span>
              <br />
              Vegard Jensen
              <br />
              +47 123 45 678
            </p>
            <Button
              onClick={() => window.open("mailto:styret@emilweb.no")}
              className="gap-2"
            >
              Kontakt styret <ArrowUpRight size={20} />
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="text-white w-full">
        <div className="p-12 justify-center flex flex-col items-center space-y-6">
          <HeaderImage
            src={"/image/EMIL/nyStudentHeader.jpg"}
            alt={"EMIL linjeforeningen"}
            backgroundPos="0% 30%"
          />
          <HeaderText className="text-3xl">
            Velkommen til{" "}
            <span className="text-green-lightest">Energi og Miljø!</span>
          </HeaderText>
          <div className="space-y-4 text-base max-w-[512px]">
            <p>
              Og velkommen til linjeforeningen for Energi og miljø-studiet, også
              kalt EMIL. EMIL driftes av studentene ved studiet og er ansvarlig
              for at alle studentene på energi og miljø-studiet har det bra
              under studietiden sin.
            </p>
            <p>
              Linjeforeningen forsøker å oppnå dette gjennom å skape godt miljø
              ved å holde arrangementer, aktiviteter, fester og å være et
              kontaktpunkt med næringslivet. Som ny student ser vi fram til å ta
              imot akkurat deg!
            </p>
            <p>
              Å komme som ny student kan være overveldende, så for å forenkle
              prosessen har vi samlet alt du trenger av informasjon på denne
              siden. Her finner du generell informasjon, hva du må sørge for som
              ny student, diverse informasjon og andre tips som er nyttige å
              vite.
            </p>
          </div>
        </div>

        <SmallTransissionDarkHighligh />
        <StickyNavbar tags={[...pageSections.map((s) => s.tag)]}></StickyNavbar>
        <SmallTransissionHighlightSPC />
        {pageSections.map(
          (
            s,
            i, //Renders all sections and alternates background
          ) => (
            <>
              <NyStudentSection
                key={i}
                title={s.title}
                intro={s.intro}
                tag={s.tag}
                content={s.content}
                bg={i % 2 !== 0 ? "" : "bg-green-mid"}
              />
              {/*Transitions  */}
              {i !== pageSections.length - 1 &&
                (i % 2 === 1 ? (
                  <SmallTransissionPCSPC />
                ) : (
                  <SmallTransissionSPCPC />
                ))}
            </>
          ),
        )}
      </div>
    </>
  );
};

export default ForStudentPage;
