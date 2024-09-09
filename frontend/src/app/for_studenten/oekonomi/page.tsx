import Hero from "@/components/hero/hero1";
import NyStudentCard, {
  nyStudentCardProps,
} from "@/components/cards/nyStudentCard";
import { FileQuestion, HandCoins, BadgeDollarSign, DollarSign} from "lucide-react";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import { Button } from "@/components/ui/button"; 
import MariaCard from "@/components/cards/mariaCard";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";




const forStudentenPage = () => {


  const unnagjortCards: nyStudentCardProps[] = [
    {
      title: "Generelt om EMIL sin økonomi",
      description: (
        <>
          <span className="font-semibold">Det er økonomiansvarlig i hovedstyret  som holder styr på  EMILs  økonomi. </span>
          <br />
          <br />
           Alt innad i linjeforeningen finansieres gjennom sparing, samarbeidsavtaler og kontakter fra næringslivet.
          <br />
          <br />
          Hvert år arrangeres det også en generalforsamling, hvor alle i linjeforeningen kan være med å stemme over hvordan disse pengene skal brukes.
          
        </>
      ),
    },

    {
      title: "Budsjett",
      description: (
        <>EMIL sitt budsjett er <span className="text-green-lightest italic">tilgjengelig for alle</span> i linjeforeningen, og du finner den på driven vår.</>
      ),
      
      icon: <BadgeDollarSign className="h-5 text-[#EFDC35]" />,
      buttons: [{text: "Se budsjett", href: "https://docs.google.com/spreadsheets/d/1bwn2-Mc4_7hgnmm0w-giy0vScZj3IS7pv2ObXSJoCtY/edit?fbclid=IwZXh0bgNhZW0CMTEAAR1VDQUPeQkaLtNV-REpOTRxiCccWb7BLClRoXNn-xcY6FQBC4Y1qu76unw_aem_qY71vneBu5ZNGsI64iqhCQ&gid=0#gid=0"}],
    },

    {
      title: "Søke om støtte",
      description: (
        <>
       <span className="font-semibold">Det er mulig for både komitéer og andre medlemmer av linjeforeningen å søke om pengestøtte. </span>
        <br />
        <br />
        For komitéer er det mulig å søke om penger fra blomsterpotten. Søknader til blomsterpotten gjelder mer omfattende prosjekter slik som nytt høytaler anlegg, og andre ting som koster litt.
        <br />
        <br />
        Vi har også Leo’s minnefond. Her kan alle linjeforeningens medlemmer søke om støtte. Søknader hit er mer lavterskel, og det kan søkes om blant annet støtte til klasse arrangement.
        <br />
        <br />
        På siden <span className= "text-green-lightest italic"> søknader</span>, finner du enda mer informasjon om Leo’ s minnefond og blomsterpotten.
        
      </>
       
      ),
      icon: <HandCoins className="h-5 text-[#EFDC35]" />,
      buttons: [{text: "Les mer om søknader her", href: "/for_studenten/soeknader"}]
    },
  ];

  return <div className="w-full flex flex-col items-center justify-center text-white">
    <div className= "w-full flex flex-col justify-center items-center p-12">
      
      <HeaderText className="text-3xl">Økonomi</HeaderText>
      <p className="text-white font-normal pt-4 text-center w-full max-w-lg">
      Denne siden inneholder alt du trenger å vite om linjeforeningen EMIL sin økonomi,  og hvordan den fungerer. 
        </p>
        </div>
        <SmallTransissionPCSPC />
        <div className=" bg-green-mid w-full  text-white flex justify-center items-center py-10 px-12">
        <div className="w-full flex flex-col items-center lg:items-stretch justify-center lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 ">
          <div className=" w-[90%] lg:w-[60%] flex flex-col justify-between gap-y-4 items-center  ">
            <NyStudentCard 
              key={unnagjortCards[0].title}
              {...unnagjortCards[0]}
            />
            <NyStudentCard 
              key={unnagjortCards[1].title}
              {...unnagjortCards[1]}
            />
          </div>
          <div className="w-[90%] lg:w-[60%] flex flex-col justify-center items-center ">
            
            <MariaCard 
              key={unnagjortCards[2].title}
              {...unnagjortCards[2]}
            />
          </div>
        </div>
      </div>
      <SmallTransissionSPCPC />

      <div className="px-12 py-12 flex justify-center items-center ">
        <div className=" bg-white p-4 w-[90%] lg:w-[60%] rounded-md text-green-darkest ">
          <div className="flex items-center">
            <FileQuestion className="text-[#3B6E62] fill-green-lightest"></FileQuestion>
            <h1 className="font-semibold text-xl">Hvordan føre bilag</h1>
          </div>
          <br></br>

          <p className="text-sm lg:text-base"> Her finner du en sjekkliste for hvordan man fører bilag. Bilag sendes alltid på mail til <strong className="text-green-light italic"> energi-og-miljoingeniorenes-linjeforening-emi@bilag.fiken.no. </strong></p>
          <br></br>

          <ul className=" text-sm lg:text-base list-disc pl-4">
            <li> <strong>Emne: </strong> Utlegg/ faktura/ Inntekt. </li>
            <li><strong>Navn: </strong>Navnet ditt.</li>
            <li><strong>Komité: </strong>Ansvarlig komité.</li>
            <li><strong>Beskrivelse: </strong>Ha med en beskrivelse eller begrunnelse for bilaget.</li>
            <li><strong>Beløp: </strong>Hvilket beløp det er snakk om.</li>
            <li><strong>Vedutlegg: </strong> <strong >(1)</strong> Ditt kontonummer <strong>(2)</strong> Komité som skal betale.</li>
            <li><strong>Ved faktura: </strong> <strong>(1)</strong> Leverandør <strong>(2)</strong> Komité som skal betale.</li>
            <li><strong> Hvis inntekt: </strong> <strong>(1)</strong>  Bankkonto/komité som mottar midlene <strong>(2)</strong> Navn på organisasjon/kunden.</li>
            <li><strong>Vedlegg: </strong> Kvittering/faktura/søknaden som førte til inntekt.</li>
          </ul>

          <br></br>

          <p className="text-sm lg:text-base">
          En fullstendig oppskrift for å fylle bilag finnes på driven vår.
          </p>

          <div className= "pt-5">
          <a 
            href="https://docs.google.com/document/d/13EW10RfGKc0zpBc4LVUgyyl3ksGq0fsjWQ08zL5bnO4/edit" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white font-thin text-base text-center"
          >
          <Button className="bg-green-darkest text-white hover:bg-[#80b0b7] hover:text-white ">
            Se fullstendig beskrivelse her
            </Button>
          </a>
          </div>

        </div>
       

      </div>

      
    
  </div>;
};

export default forStudentenPage;
