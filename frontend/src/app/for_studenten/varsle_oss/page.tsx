import Hero from "@/components/hero/hero1";

const forStudentenPage = () => {
  return <div className= "flex justify-center items-center ">
    <div className="p-10">
      <h1 className= "text-white font-semibold text-4xl pt-4 text-center">
        Har du en sak som bør varsles?
      </h1>

      <div className="pr-52 pl-52 text-leftcenter">

      <p className= "text-white pt-3 pb-5"> 
      Ved uønskede hendelser, ønsker vi i styret at du tar kontakt med oss.
      </p>

      <p className= "text-white font-thin pb-5 ">
      Noe av det viktigste vi kan gjøre for å sikre at alle i linjeforeningen kommer seg trygt gjennom 
      studietiden, er å si ifra når ting ikke er som de skal. Uansett om det er en stor eller liten utfordring/hendelse,
      er det bedre å si ifra en gang for mye enn en gang for lite. Ved å få vite om utfordringer tidlig, er det mye lettere å gjøre noe med utfallet. 
      </p>

      <p className="text-white font-thin pb-5">
      Ved uønskede hendelser, ønsker linjeforeningen å få vite om det slik at riktige tiltak kan settes inn for å unngå at det gjentar seg. 
      Enhver hendelse som meldes inn til oss vil bli tatt på alvor. Du kan velge å holde det anonymt, eller å skrive ditt navn for at linjeforeningsstyret 
      kan følge opp hendelsen/situasjonen videre med deg. Uansett vil vi i denne prosessen ta hensyn til deg og andre berørte.
      </p>

      <p className="text-white font-thin pb-16">
      Svaret ditt vil være synlig for styret. De har taushetsplikt, og vil ikke dele personlig informasjon med andre uten samtykke. Unntaket er om det er fare for liv/helse.
      </p>

      <p className="text-white font-thin ">
      Tusen takk for at du sier ifra!
      </p>

      </div>
      
      </div>;
    </div>
};

export default forStudentenPage;
