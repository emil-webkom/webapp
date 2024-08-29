import Hero from "@/components/hero/hero1";
import NyStudentCard, {
  nyStudentCardProps,
} from "@/components/cards/nyStudentCard";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import { Coins } from "lucide-react";
import { Info } from "lucide-react";
import { FileQuestion } from "lucide-react";

const forStudentenPage = () => {
  const unnagjortCards: nyStudentCardProps[] = [
    {
      title: "Leo´s minnefond",
      description: (
        <>
          Leos minnefond er et fond i EMIL der det blir satt inn penger hvert
          år, slik at medlemmer av EMIL kan søke om midler.
          <br />
          <br />
          Du kan søke om midler{" "}
          <strong className="text-[#9DDBAD]"> opp til 5000 kr</strong> til ulike
          formål, slik som arrangementer eller investeringer som ikke er
          budsjettert. Merk at om det skal søkes om større beløp enn 5000 kr må
          du søke hos <strong className="text-[#9DDBAD]">Blomsterpotten</strong>
          .
          <br />
          <br />
          Du kan søke fra Leos minnefond både før og etter pengene er brukt. Det
          anbefales å søke <strong className="text-[#9DDBAD]">før</strong> du
          bruker pengene for å ikke gå på en smell om du ikke får godkjent.
        </>
      ),
      frist: "",
      buttonText: "Søk om støtte her",
      href: "https://www.youtube.com",
      icon: <Coins className="h-5" />,
    },

    {
      title: "Info",
      description: (
        <>
          Du kan også sende en mail til styret på @styret@emilweb.no hvor du må
          ha med:
          <li> Navn</li>
          <li>Komité</li>
          <li>Beløp det er snakk om</li>
          <li> Begrunnelse for søknad</li>
        </>
      ),
      frist: "",
      buttonText: "",
      href: "",
      icon: <Info className="h-5" />,
    },

    {
      title: "Se tidligere søknader",
      description: <>Klikk på knappen nedenfor for å se eldre søknader</>,
      frist: "",
      buttonText: "Se eldre søknader",
      href: "https://www.youtube.com",
      icon: <FileQuestion className="h-5" />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center max-w-[512px]">
        <h1 className="text-white font-semibold text-4xl pt-4 text-center">
          Søknader
        </h1>

        <p className="text-white font-normal pt-4 text-center">
          På denne siden finner du alt av informasjon om søknader til
          linjeforeningen EMIL.
        </p>
      </div>
        <SmallTransissionPCSPC />

      <div>

      </div>
        <div className="bg-[#225654] text-white grid grid-cols-1 px-16 ">
          <div className="w-full flex flex-col lg:flex-row gap-x-4">
            <div className="lg:w-[60%]">
              <NyStudentCard
                key={unnagjortCards[0].title}
                {...unnagjortCards[0]}
              />
            </div>
            <div className="flex flex-col justify-between ">
              <NyStudentCard
                key={unnagjortCards[1].title}
                {...unnagjortCards[1]}
              />
              <NyStudentCard
                key={unnagjortCards[2].title}
                {...unnagjortCards[2]}
              />
            </div>
          </div>
        </div>

        <SmallTransissionSPCPC />

        <div className="bg-[#003A42] text-white">
          <h1 className="text-white font-semibold text-3xl pt-4 text-center">
            Blomsterpotten
          </h1>

          <div className="bg-[#]"></div>
        </div>

        <div className=" bg-white p-5 ">
          <p className="font-semibold text-xl">Eksempelsøknad</p>

          <p className="font-bold text-xs">1. Søkeren/komiteéns navn</p>

          <p className="font-light text-xs">"Navn"</p>

          <p className="font-bold text-xs">2. Konkret hva det søkes om</p>

          <p className="font-light text-xs">
            Konkret og utfyllende om hva det søkes midler til. For eksempel: Er
            det innkjøp, som for eksempel lydutsyr, hytte, etc.?
          </p>

          <p className="font-light text-xs">
            Akkurat hva skal kjøpes inn? Hva er bruksområdet?
          </p>

          <p className="font-light text-xs">Er det et enkeltarrangement?</p>

          <p className="font-light text-xs">
            Hvem er det for? Komité, klassetrinn, jenter/gutter?
          </p>

          <p className="font-light text-xs">
            Hvor mange deltakere vil det være?
          </p>

          <p className="font-light text-xs">Er det for et faglig opplegg?</p>

          <p className="font-light text-xs">Hvem er det for?</p>

          <p className="font-light text-xs">Hvordan vil opplegget være?</p>

          <p className="font-bold text-xs">
            3. Hvordan prosjektet vil gangne linjeforeningens medlemmer
          </p>

          <p className="font-light text-xs">
            Blomsterpottens midler er ment å komme hele linjeforeningen til
            gode. Hvordan vil ditt prosjekt gjøre dette?
          </p>

          <p className="font-light text-xs">
            Skriv utfyllende og svar på følgende spørsmål i søknadsteksten:
          </p>

          <p className="font-light text-xs">
            Er dette noe som er til nytte i fremtiden, eller er det et prosjekt
            som gagner medlemmene det året pengene blir brukt?
          </p>

          <p className="font-light text-xs">
            Er det prioritert slik at alle linjeforeningsmedlemmer får nytte av
            det, eller kommer det hovedsaklig enkelte klassetrinn eller komiteer
            til gode?
          </p>

          <p className="font-light text-xs">
            Hvorfor mener du dette er noe som vil bidra positivt til
            linjeforeningen?
          </p>

          <p className="font-bold text-xs">
            4. Er det sendt i søknad til SIT eller andre relevante
            organisasjoner?
          </p>

          <p className="font-light text-xs">
            Linjeforeningskomiteer får ofte innvilget støtte fra andre aktører
            enn linjeforeningen. Har du/dere gjort en innsats for å skaffe
            midler på andre måter?
          </p>

          <p className="font-light text-xs">
            Er det noe du lurer på angående dette, ta kontakt med Futen.
          </p>

          <p className="font-bold text-xs">5. Budsjett</p>

          <p className="font-light text-xs">
            Det skal legges ved et budsjett hvor det står konkret hva pengene
            skal bli brukt på, hvor mye det vil koste og hvor man har funnet
            prisene. Er det uklart hvordan et budsjett lages og hvordan det skal
            se ut, ta kontakt med Futen.
          </p>

          <p className="font-bold text-xs">6. Ansvar for bruk av midler</p>

          <p className="font-light text-xs">
            “Undertegnede har lest, forstått og akseptert retningslinjene til
            EMILs Blomsterpott og har ansvaret for at midlene som er innvilget
            og utbetalt brukes i henhold til det godkjente budsjettet. Ved
            manglende dokumentasjon på dette, eller dersom midlene er brukt til
            noe annet, står undertegnede ansvarlig for å tilbakebetale det
            misbrukte beløpet.”
          </p>

          <p className="font-light text-xs">Emil Emilsen</p>

          <p className="font-light text-xs">--------------------</p>

          <p className="font-light text-xs">Emil Emilsen</p>

          <p className="font-light text-xs">17/03/2022, Trondheim</p>
        </div>
      </div>
  );
};

export default forStudentenPage;
