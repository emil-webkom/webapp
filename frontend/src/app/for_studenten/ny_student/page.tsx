'use client'
import NyStudentCard, { nyStudentCardProps } from "@/components/cards/nyStudentCard";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import NyStudentSection, { nyStudentSectionProps } from "@/components/ForStudenten/nyStudent/nyStudentSection";
import { Building, Coins, Facebook, Home, Key, Mail, Shirt, User, Wifi } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaFacebookF } from "react-icons/fa";

const ForStudentPage = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const unnagjortCards: nyStudentCardProps[] = [{
    title: "Registrere deg og betale semesteravgift",
    description: "Når du har fått plass på studiet må semesteravgiften betales og fag må velges. Logg deg inn på StudentWeb og følg instruksjonene.",
    frist: "15. sep (høst) og 1. feb (vår)",
    buttonText: "StudentWeb",
    href: "https://www.youtube.com",
    icon: <Coins className="h-5" />
  }, {
    title: "Opprette bruker hos NTNU",
    description: "Når du har registrert deg på studentweb kan du opprette din NTNU-brukerkonto. Dette gir deg tilgang til NTNUs IT-tjenester.",
    frist: "15. sep (høst) og 1. feb (vår)",
    buttonText: "StudentWeb",
    icon: <User className="h-5" />,
    href: "https://i.ntnu.no/wiki/-/wiki/Norsk/Aktiver+brukerkonto"

  }, {
    title: "Melde adresseendring",
    description: "Du bør endre postadressen din. Vær rask! Du får viktig post fra NTNU og Lånekassen, og du får ikke omgjøringsstipend uten.",
    buttonText: "Skatteetaten",
    icon: <Mail className="h-5" />,
    href: "https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/"
  }, {
    title: "Skaff adgangskort",
    description: "Kortet fungerer som lånekort til biblioteket og adgangskort til rom og til utskrifter.",
    buttonText: "Skaffe adgangskort",
    icon: <Key className="h-5" />,
    href: "https://innsida.ntnu.no/studentkort"
  }, {
    title: "Søk om stipend og lån",
    description: "Søk stipend og lån hos Lånekassen. Du må betale semesteravgiften for å få stipend og studielån.",
    buttonText: "Søk stipend",
    icon: <Key className="h-5" />,
    href: "https://lanekassen.no/"
  }, {
    title: "Wifi på campus",
    description: "Eduroam-nettet finnes på alle NTNU campuser. Last ned det automatiske oppsettet og koble deg på!",
    buttonText: "Koble til Eduroam",
    icon: <Wifi className="h-6" />,
    href: "https://innsida.ntnu.no/wiki/-/wiki/Norsk/Tr%C3%A5dl%C3%B8st+nett"
  }, {
    title: "Meld deg på fadderopplegget",
    description: "Dersom du ønsker å bli med på fadderukene må du fylle ut påmeldingsskjema. Det er veldig anbefalt å delta!",
    buttonText: "Påmeldingsskjema",
    icon: <Shirt className="h-6" />,
    href: "https://docs.google.com/forms/d/e/1FAIpQLScS8x6cBvKwrlFHGMF5nAFCfWh_DVnuJFQC67lITu8JiEycQA/viewform"
  }
    , {
    title: "Bli med i facebook-gruppen",
    description: "Det er mye nyttig informasjon som bare legges ut på facebook. Så bli med i din klasses facebook-gruppe!",
    buttonText: "EMIL ‘24",
    icon: <FaFacebookF className="h-5" />,
    href: "https://www.facebook.com/groups/622786496486913/"
  }]


  const forsteUkeneCards: nyStudentCardProps[] = [
    {
      title: "Immatrikulering",
      description: "Skoleåret begynner med felles samling og immatrikulering på Gløshaugen. Dette skjer mandag 14. august i EL5 fra 12:00-13:00"
    }, {
      title: "Fadderperioden",
      description: "Fadderperioden består av to uker med arrangementer hver eneste dag. Målet er at alle som starter på energi og miljø skal få den ultimate starten på studiet og en herlig velkomst til studentbyen Trondheim. Disse ukene er hele byen preget av festivalstemning og terskelen for å hilse på nye folk er ikke-eksisterende."
    },
    {
      title: "Renselsen",
      description: "Dette er en innvielsessermoni til linjeforeningen for alle nye studenter og er tradisjonelt for sivil-ingienørlinjene på NTNU. Det skjer i september."
    }, {
      title: "Immatrikuleringsball",
      description: " En velkomstfest for ny-studentene i linjeforeningen. Hele linjeforeningen samles til en helaften med mat, drikke og underholdning for å feire de nye studentene. Det skjer kvelden etter renselsen."
    },
  ]
  const pageSections: nyStudentSectionProps[] = [
    {
      title: "Sjekkliste for nye EMIL-studenter",
      tag: "Sjekkliste",
      intro: <p className="max-w-[512px] mt-2 mb-6 text-center">De viktigste tingene å få unnagjort når du har fått plass på studiet. NTNUs offisielle sjekkliste kan du lese <Link href={"https://i.ntnu.no/ny-student"} target='_blank' rel='noopener norefferer' className="text-green-300 underline">her</Link>.
      </p>,
      content: <div className="grid gap-4 lg:grid-cols-2">
        {unnagjortCards.map((c, i) =>
          <NyStudentCard key={i} title={c.title} description={c.description} frist={c.frist} icon={c.icon} buttonText={c.buttonText} href={c.href}></NyStudentCard>
        )}
      </div>,
    }, {
      title: "De første ukene på studiet",
      tag: "De første ukene",
      content: <div className="grid gap-4 lg:grid-cols-1">
        {forsteUkeneCards.map((c, i) =>
          <NyStudentCard key={i} title={c.title} description={c.description} frist={c.frist} icon={c.icon} buttonText={c.buttonText} href={c.href}></NyStudentCard>
        )}
      </div>
    },
    {
      title: "Tips og verktøy",
      tag: "Tips og verktøy",
      content: <div className="grid gap-4 lg:grid-cols-1">
        {forsteUkeneCards.map((c, i) =>
          <NyStudentCard key={i} title={c.title} description={c.description} frist={c.frist} icon={c.icon} buttonText={c.buttonText} href={c.href}></NyStudentCard>
        )}
      </div>
    },]


  return <>
    <div className="text-white w-[100%]">
      <div className="p-12 justify-center flex flex-col items-center space-y-6">
        <HeaderText className="text-3xl">Velkommen til <span className="text-[#c7ff96]">Energi og Miljø!</span></HeaderText>
        <div className="space-y-4 text-base max-w-[512px]">
          <p>Og velkommen til linjeforeningen for Energi og miljø-studiet, også kalt EMIL. EMIL driftes av studentene ved studiet og er ansvarlig for at alle studentene på energi og miljø-studiet har det bra under studietiden sin.</p>
          <p>Linjeforeningen forsøker å oppnå dette gjennom å skape godt miljø ved å holde arrangementer, aktiviteter, fester og å være et kontaktpunkt med næringslivet. Som ny student ser vi fram til å ta imot akkurat deg!</p>
          <p>Å komme som ny student kan være  overveldende, så for å forenkle prosessen har vi samlet alt du trenger av informasjon på denne siden. Her finner du generell informasjon, hva du må sørge for som ny student, diverse informasjon  og andre tips som er nyttige å vite.</p>
        </div>
      </div>

      <HeaderText className="text-xl bg-[#457969] pt-2">Hva vil du lese om?</HeaderText>
      <div className="flex flex-row flex-wrap justify-center p-2 gap-2 bg-[#457969] sticky top-0">
      {pageSections.map((s,i) =>(
        <button key={i} onClick={()=>scrollToSection(s.tag)} className='border-[1px] rounded-md flex-row justify-center items-center hover:bg-slate-400 gap-1 p-1 hover:bg-slate-40 w-fit'>
                            {s.tag}
                  </button>
      ))}
      
      </div>
      {pageSections.map((s, i) => 
      <NyStudentSection 
      key={i}
      title={s.title} 
      intro={s.intro} 
      tag={s.tag} 
      content={s.content} 
      bg={i % 2 !== 0 ? '' : '[#225654]'}
    />)}
    </div>
  </>
};

export default ForStudentPage;
