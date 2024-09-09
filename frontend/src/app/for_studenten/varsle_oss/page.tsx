import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button"; 
import { Mail } from "lucide-react";
import { Bell } from "lucide-react"


const forStudentenPage = () => {
  const href = "mailto:styret@emilweb.no"; 
  const buttonText = "Kontakt styret";

  return (
    <div className="w-full flex justify-center items-center px-4"> 
      <div className="p-5 lg:p-10">
        <div className="flex items-center">
        <Bell className=" mr-3 text-[#EFDC35] h-6 w-6 lg:h-8 lg:w-8"></Bell>
        <h1 className="text-white font-bold text-base lg:text-4xl text-center ">
          Har du en sak som bør varsles?
        </h1>
        </div>
        <h2 className="text-white pt-4 font-normal lg:font-semibold text-sm lg:text-base text-center ">
            Ved uønskede hendelser, ønsker vi i styret at du tar kontakt med oss.
          </h2>

        <div className="bg-green-mid rounded-md text-sm lg:text-base max-w-xl mx-auto text-left mt-6 px-6 pt-3 pb-5 ">
          
          <p className="text-white font-thin pb-5">
            Noe av det viktigste vi kan gjøre for å sikre at alle i linjeforeningen kommer seg trygt gjennom
            studietiden, er å <span className="text-green-lightest font-normal lg:font-semibold"> si ifra når ting ikke er som de skal. </span> Uansett om det er en stor eller liten utfordring/hendelse,
            er det bedre å si ifra en gang for mye enn en gang for lite. Ved å få vite om utfordringer tidlig, er det mye lettere å gjøre noe med utfallet.
          </p>

          <p className="text-white font-thin pb-5">
            Ved uønskede hendelser, ønsker linjeforeningen å få vite om det slik at riktige tiltak kan settes inn for å unngå at det gjentar seg.
            <span className="text-green-lightest font-normal lg:font-semibold "> Enhver hendelse som meldes inn til oss vil bli tatt på alvor. </span>Du kan velge å holde det anonymt, eller å skrive ditt navn for at linjeforeningsstyret
            kan følge opp hendelsen/situasjonen videre med deg. Uansett vil vi i denne prosessen ta hensyn til deg og andre berørte.
          </p>

          <p className="text-white font-thin pb-10">
            Svaret ditt vil være synlig for styret. De har taushetsplikt, og vil ikke dele personlig informasjon med andre uten samtykke. Unntaket er om det er fare for liv/helse.
          </p>

          <p className="text-white font-normal">
            <i>Tusen takk for at du sier ifra!</i>
          </p>


        </div>
        <div className="pt-7 flex justify-center items-center">
        
        <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdWNMJfhXHVgU8BsmglSnnMrU4h3ERB-8Fr5RLlAzcOy6484g/viewform" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white font-thin text-base text-center"
          >
          <Button className="bg-green-darkest text-white hover:bg-[#80b0b7] hover:text-white ">
            Varsle styret her
            </Button>
          </a>
          
          </div>
      </div>
    </div>
  );
};

export default forStudentenPage;
