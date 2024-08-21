import NyStudentCard, { nyStudentCardProps } from "@/components/cards/nyStudentCard";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import { Building, Coins, Home, Key, Mail, User, Wifi } from "lucide-react";

const forStudentenPage = () => {
  const unnagjortCards : nyStudentCardProps[] = [{
    title: "Registrere deg og betale semesteravgift",
    description: "Når du har fått plass på studiet må semesteravgiften betales og fag må velges. Logg deg inn på StudentWeb og følg instruksjonene.",
    frist:"15. sep (høst) og 1. feb (vår)",
    buttonText:"StudentWeb",
    href:"https://www.youtube.com",
    icon:<Coins className="h-5"/>
  },{
    title:"Opprette bruker hos NTNU",
    description:"Når du har registrert deg på studentweb kan du opprette din NTNU-brukerkonto. Dette gir deg tilgang til NTNUs IT-tjenester.",
    frist : "15. sep (høst) og 1. feb (vår)",
    buttonText:"StudentWeb",
    icon:<User className="h-5"/>,
    href:"https://i.ntnu.no/wiki/-/wiki/Norsk/Aktiver+brukerkonto"

  },{
    title: "Melde adresseendring",
    description: "Du bør endre postadressen din. Vær rask! Du får viktig post fra NTNU og Lånekassen, og du får ikke omgjøringsstipend uten.",
    buttonText: "Skatteetaten",
    icon: <Mail className="h-5"/>,
    href: "https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/"
  },{
    title: "Skaff adgangskort",
    description: "Kortet fungerer som lånekort til biblioteket og adgangskort til rom og til utskrifter.",
    buttonText: "Skaffe adgangskort",
    icon: <Key className="h-5"/>,
    href:"https://innsida.ntnu.no/studentkort"
  },{
    title: "Søk om stipend og lån",
    description: "Søk stipend og lån hos Lånekassen. Du må betale semesteravgiften for å få stipend og studielån.",
    buttonText: "Søk stipend",
    icon: <Key className="h-5"/>,
    href: "https://lanekassen.no/"
  },{
    title: "Wifi på campus",
    description: "Eduroam-nettet finnes på alle NTNU campuser. Last ned det automatiske oppsettet og koble deg på!",
    buttonText: "Koble til Eduroam",
    icon: <Wifi className="h-6"/>,
    href:"https://innsida.ntnu.no/wiki/-/wiki/Norsk/Tr%C3%A5dl%C3%B8st+nett"
  }]


  return <>
  <div className="text-white w-[100%]">
    <div className="p-12 justify-center flex flex-col items-center">
      <div className="space-y-8 max-w-[512px]">
        <HeaderText className="text-3xl">Velkommen til Energi og Miljø!</HeaderText>
        <div className="space-y-4 text-base">
          <p>Og velkommen til linjeforeningen for Energi og miljø-studiet, også kalt EMIL. EMIL driftes av studentene ved studiet og er ansvarlig for at alle studentene på energi og miljø-studiet har det bra under studietiden sin.</p>
          <p>Linjeforeningen forsøker å oppnå dette gjennom å skape godt miljø ved å holde arrangementer, aktiviteter, fester og å være et kontaktpunkt med næringslivet. Som ny student ser vi fram til å ta imot akkurat deg!</p>
          <p>Å komme som ny student kan være  overveldende, så for å forenkle prosessen har vi samlet alt du trenger av informasjon på denne siden. Her finner du generell informasjon, hva du må sørge for som ny student, diverse informasjon  og andre tips som er nyttige å vite.</p>
        </div>
      </div>
    </div>

    <div className="bg-[#225654] p-12 justify-center flex flex-col items-center space-y-8">
        <HeaderText>Ting du bør få unnagjort</HeaderText>
        <div className="grid gap-8 lg:grid-cols-2">
          {unnagjortCards.map((c,i) => 
            <NyStudentCard key={i} title={c.title} description={c.description} frist={c.frist} icon={c.icon} buttonText={c.buttonText} href={c.href}></NyStudentCard>
          )}
        </div>
    </div>
  </div>
  </>
};

export default forStudentenPage;
