import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button"; 
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const forStudentenPage = () => {
  const href = "mailto:styret@emilweb.no"; 
  const buttonText = "Kontakt styret";

  return (
    <div className="w-full flex justify-center items-center px-4"> 
      <div className="p-5 lg:p-10">
        <h1 className="text-white font-semibold text-4xl pt-4 text-center ">
          Har du en sak som bør varsles?
        </h1>

        <div className="text-left mt-6 lg:pr-32 lg:pl-32">
          <p className="text-white pt-4 pb-5">
            Ved uønskede hendelser, ønsker vi i styret at du tar kontakt med oss.
          </p>

          <p className="text-white font-thin pb-5">
            Noe av det viktigste vi kan gjøre for å sikre at alle i linjeforeningen kommer seg trygt gjennom
            studietiden, er å <span className="text-[#9DDBAD]"> si ifra når ting ikke er som de skal. </span> Uansett om det er en stor eller liten utfordring/hendelse,
            er det bedre å si ifra en gang for mye enn en gang for lite. Ved å få vite om utfordringer tidlig, er det mye lettere å gjøre noe med utfallet.
          </p>

          <p className="text-white font-thin pb-5">
            Ved uønskede hendelser, ønsker linjeforeningen å få vite om det slik at riktige tiltak kan settes inn for å unngå at det gjentar seg.
            <span className="text-[#9DDBAD] "> Enhver hendelse som meldes inn til oss vil bli tatt på alvor. </span>Du kan velge å holde det anonymt, eller å skrive ditt navn for at linjeforeningsstyret
            kan følge opp hendelsen/situasjonen videre med deg. Uansett vil vi i denne prosessen ta hensyn til deg og andre berørte.
          </p>

          <p className="text-white font-thin pb-10">
            Svaret ditt vil være synlig for styret. De har taushetsplikt, og vil ikke dele personlig informasjon med andre uten samtykke. Unntaket er om det er fare for liv/helse.
          </p>

          <p className="text-white font-thin">
            <i>Tusen takk for at du sier ifra!</i>
          </p>



          <div className="pt-14 flex justify-center items-center">
          <Button className="bg-[#25504F]" variant="transparent">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-row flex justify-center items-center gap-1"
            >
              <p className="text-white">{buttonText}</p>
              <ArrowUpRight className="w-4 text-white" />
            </a>
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forStudentenPage;
