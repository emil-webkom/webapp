import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Bell } from "lucide-react";

const forStudentenPage = () => {
  const href = "mailto:styret@emilweb.no";
  const buttonText = "Kontakt styret";

  return (
    <div className="w-full flex justify-center items-center p-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center">
          <Bell className=" mr-3 text-green-lightest h-5 "></Bell>
          <HeaderText className="text-3xl text-white">Varsling</HeaderText>
        </div>
        <p className="text-white w-full max-w-[512px] font-normal pt-4">
          Ved uønskede hendelser, ønsker vi i styret at du tar kontakt med oss.
        </p>

        <div className="bg-green-mid rounded-md text-sm lg:text-base p-6 text-left">
          <p className="text-white font-thin pb-5">
            Noe av det viktigste vi kan gjøre for å sikre at alle i
            linjeforeningen kommer seg trygt gjennom studietiden, er å{" "}
            <span className="text-green-lightest font-normal lg:font-semibold">
              {" "}
              si ifra når ting ikke er som de skal.{" "}
            </span>{" "}
            Uansett om det er en stor eller liten utfordring/hendelse, er det
            bedre å si ifra en gang for mye enn en gang for lite. Ved å få vite
            om utfordringer tidlig, er det mye lettere å gjøre noe med utfallet.
          </p>

          <p className="text-white font-thin pb-5">
            Ved uønskede hendelser, ønsker linjeforeningen å få vite om det slik
            at riktige tiltak kan settes inn for å unngå at det gjentar seg.
            <span className="font-bold lg:font-semibold ">
              {" "}
              Enhver hendelse som meldes inn til oss vil bli tatt på alvor.{" "}
            </span>
            Du kan velge å holde det anonymt, eller å skrive ditt navn for at
            linjeforeningsstyret kan følge opp hendelsen/situasjonen videre med
            deg. Uansett vil vi i denne prosessen ta hensyn til deg og andre
            berørte.
          </p>

          <p className="text-white font-thin pb-10">
            Svaret ditt vil være synlig for styret. De har taushetsplikt, og vil
            ikke dele personlig informasjon med andre uten samtykke. Unntaket er
            om det er fare for liv/helse.
          </p>

          <p className="text-white font-normal">
            <i>Tusen takk for at du sier ifra!</i>
          </p>
        </div>
        <div className="pt-7 flex justify-center items-center">
          <a
            href="https://forms.gle/TqWf4gMBtQ3vLdfDA"
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
