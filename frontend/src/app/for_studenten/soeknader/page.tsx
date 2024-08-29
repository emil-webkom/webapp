import Hero from "@/components/hero/hero1";
import NyStudentCard, {
  nyStudentCardProps,
} from "@/components/cards/nyStudentCard";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import { ArrowRight, ArrowUpRight, Coins, Link } from "lucide-react";
import { Info } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { Flower } from "lucide-react";
import { Notebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const soeknaderPage = () => {
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
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdlweUahxa6eTMwyYTz6iLzgc7NwFx_NDKIWJ6PKbS4v7jPDQ/viewform",
      icon: <Coins className="h-5" />,
    },

    {
      title: "Info",
      description: (
        <div>
          Du kan også sende en mail til styret på @styret@emilweb.no hvor du må ha med:
          <ul className="list-disc px-4">
            <li>Navn</li>
            <li>Komité</li>
            <li>Beløp det er snakk om</li>
            <li>Begrunnelse for søknad</li>
          </ul>
        </div>
      ),
      frist: "",
      buttonText: "",
      href: "",
      icon: <Info className="h-5" />,
    },

    {
      title: "Se tidligere søknader",
      description: (
        <>
          Gjennom tiden har det blitt levert mange søknader til Emil. Klikk på
          knappen nedenfor for å se eldre søknader
        </>
      ),
      frist: "",
      buttonText: "Se eldre søknader",
      href: "https://www.youtube.com",
      icon: <FileQuestion className="h-5" />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center max-w-[512px] py-5">
        <h1 className="text-white font-semibold text-4xl pt-4 text-center">
          Søknader
        </h1>

        <p className="text-white font-normal pt-4 text-center">
          På denne siden finner du alt av informasjon om søknader til
          linjeforeningen EMIL.
        </p>
      </div>
      <SmallTransissionPCSPC />

      <div></div>
      <div className="bg-[#225654] w-full text-white flex justify-center items-center py-4 lg:px-16">
        <div className="w-full flex flex-col items-center lg:items-stretch justify-center lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 ">
          <div className="w-[90%] lg:w-[60%] flex flex-col justify-center items-center">
            <NyStudentCard
              key={unnagjortCards[0].title}
              {...unnagjortCards[0]}
            />
          </div>
          <div className="w-[90%] lg:w-[60%] flex flex-col justify-between gap-y-4 items-center ">
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

      <div className="bg-[#003A42] text-white flex items-center justify-center pb-7 lg:pb-2">
        <Flower className="w-12 h-12 pt-4"></Flower>
        <h1 className="text-white font-semibold text-3xl pt-4 text-center">
          Blomsterpotten
        </h1>
      </div>

      <div className="bg-[#003A42] text-white w-full flex justify-center items-center py-4 pt-1 lg:px-16">
        <div className="w-full flex flex-col items-center lg:items-stretch justify-center lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 lg:py-8">
          <div className="w-[90%] bg-[#00333A] px-12 py-5">
            <p className="font-bold">Søknadskriterier</p>
            <br></br>
            <p className="font-light">
              Linjeforeningsmedlemmer og komiteer som ønsker å søke om bruk av
              midler fra EMILs Blomsterpott skal skrive en søknad som inneholder
              følgende momenter. Dersom ett eller flere av momentene mangler,
              blir søknaden sendt tilbake til søker med forbedringsforslag og
              oppfordring til å søke på nytt.
            </p>
            <br></br>
            <p className="font-normal ">
              Søknaden skal være sendt inn minst 4 uker før midlene skal være
              utbetalt! 
            </p>
          </div>

          <div className="w-[90%] bg-[#00333A] lg:w-fit flex flex-col justify-between gap-y-4 px-12 py-5">
            <div className="font-thin">
              <p className="font-bold">Søknaden skal bygges opp slik</p>
              <ul className="pl-5 mt-2 space-y-1 list-disc ">
                <li>
                  Søknaden skal skrives digitalt og sendes per epost til
                  Blomsterpottstyret, eventuelt til annenparten dersom
                  Blomsterpottstyret er søker. Håndskrevne søknader tillates
                  ikke. 
                </li>
                <br></br>
                <li>
                  Søknaden skal føres punktvis, som vist under. Alle punktene
                  skal ha samme tittel som de har i søknadskriterene.
                </li>
                <br></br>
                <li>
                  Punkt 6 skal kopieres direkte inn i søknaden og skal stå
                  ordrett slik den står i søknadskriteriene.
                </li>
                <br></br>
                <li>
                  På slutten av søknaden skal det være en underskriftslinje.
                  Under denne linjen skal det stå dato og sted for søkers
                  underskrift. Dette er eksemplifisert i slutten av
                  søknadskriterene.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20 flex justify-center items-center ">
        <div className=" bg-white p-4 w-[90%] lg:w-[86%] rounded-md text-[#001D21]  ">
          <div className="flex items-center">
            <Notebook></Notebook>
            <h1 className="font-semibold text-xl">Eksempelsøknad</h1>
          </div>

          <br></br>

          <p className="font-bold text-xs">1. Søkeren/komiteéns navn</p>

          <p className="font-light text-xs">"Navn"</p>
          <br></br>

          <p className="font-bold text-xs">2. Konkret hva det søkes om</p>

          <ul className="font-light text-xs list-disc pl-4">
            <li>
              Konkret og utfyllende om hva det søkes midler til. For eksempel:
              Er det innkjøp, som for eksempel lydutsyr, hytte, etc.?
            </li>
            <li>Akkurat hva skal kjøpes inn? Hva er bruksområdet?</li>
            <li>Er det et enkeltarrangement?</li>
            <li>Hvem er det for? Komité, klassetrinn, jenter/gutter?</li>
            <li>Hvor mange deltakere vil det være?</li>
            <li>Er det for et faglig opplegg?</li>
            <li>Hvem er det for?</li>
          </ul>

          <ul className="font-light text-xs">
            <li>Hvordan vil opplegget være?</li>
          </ul>

          <br></br>

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

          <ul className="font-light text-xs">
            <li>
              Er dette noe som er til nytte i fremtiden, eller er det et
              prosjekt som gagner medlemmene det året pengene blir brukt?{" "}
            </li>
          </ul>

          <ul className="font-light text-xs list-disc pl-4">
            <li>
              Er det prioritert slik at alle linjeforeningsmedlemmer får nytte
              av det, eller kommer det hovedsaklig enkelte klassetrinn eller
              komiteer til gode?
            </li>
          </ul>

          <ul className="font-light text-xs">
            <li>
              Hvorfor mener du dette er noe som vil bidra positivt til
              linjeforeningen?
            </li>
          </ul>

          <br></br>

          <p className="font-bold text-xs">
            4. Er det sendt i søknad til Sit eller andre relevante
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

          <br></br>

          <p className="font-bold text-xs">5. Budsjett</p>

          <p className="font-light text-xs">
            Det skal legges ved et budsjett hvor det står konkret hva pengene
            skal bli brukt på, hvor mye det vil koste og hvor man har funnet
            prisene. Er det uklart hvordan et budsjett lages og hvordan det skal
            se ut, ta kontakt med Futen.
          </p>

          <br></br>

          <p className="font-bold text-xs">6. Ansvar for bruk av midler</p>

          <p className="font-light text-xs">
            “Undertegnede har lest, forstått og akseptert retningslinjene til
            EMILs Blomsterpott og har ansvaret for at midlene som er innvilget
            og utbetalt brukes i henhold til det godkjente budsjettet. Ved
            manglende dokumentasjon på dette, eller dersom midlene er brukt til
            noe annet, står undertegnede ansvarlig for å tilbakebetale det
            misbrukte beløpet.”
          </p>

          <br></br>
          <br></br>

          <p className="font-light text-xs">Emil Emilsen</p>

          <p className="font-light text-xs">--------------------------</p>

          <p className="font-light text-xs">Emil Emilsen</p>

          <p className="font-light text-xs">17/03/2022, Trondheim</p>
        </div>
      </div>
    </div>
  );
};

export default soeknaderPage;
