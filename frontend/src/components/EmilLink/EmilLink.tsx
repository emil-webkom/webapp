
import React from "react";
import Link from "next/link";

const EmilLink = () => {
  return (
    <div className="bg-[#] rounded-md flex flex-col items-center justify-center text-center py-18 text-[#001D21]">
      <h1 className="font-extrabold text-3xl py-6 ">For bedriften</h1>
      <h2 className="font-semibold  text-xl">Bedriftspresentasjon på Gløshaugen</h2>
      <p className="font-thin ">Her foregår en presentasjon på ettermiddagen/kvelden etterfulgt av middag enten på Gløshaugen eller i byen.</p>

      
        <div className="w-[75%] lg:w-[45%] flex flex-col justify-center items-center px-4 lg: py-7">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-11 lg:gap-16 w-full text-left">

          <div className="bg-[#225654] text-white rounded-md p-4  lg:w-1/2 ">
          <h2 className="font-semibold pb-3"> Bedriftspresentasjon på dagtid</h2>
          <p className="font-thin text-sm ">Dette kaller vi for lunsjbedriftspresentasjon, og foregår på dagen. Da serveres det lunsj i stedet for middag. Dette foregår oftest på Gløshaugen da studentene har andre forelesninger utover dagen.</p>
          </div>
          
          <div className= "bg-[#225654] text-white rounded-md p-4 lg:w-1/2 ">
          <h2 className="font-semibold pb-3"> Intim bedriftspresentasjon</h2>
          <p className="font-thin text-sm "> Vi kan også tilby en mindre og mer intim bedriftspresentasjon hvor det kun er få studenter invitert. Idéen er da å invitere til en bedre middag etterpå, hvor bedriften kan komme i nærmere kontakt med aktuelle arbeidstagere for fremtiden</p>
          </div>

          </div>
        </div>

        <h2 className="font-extrabold text-xl  ">EMIL-link</h2>


     
      
      <p className="font-extralight text-sm lg:text-base leading-relaxed max-w-4xl">
        EMIL-Link fungerer som bindeleddet mellom emil-studentene og bedrifter.
        Ønsker din bedrift å promotere stillingsannonser, internships eller gi
        et generelt innblikk i hva din bedrift driver med? Emil-Link tilbyr
        flere ulike tjenester hvor bedrifter har mulighet til å komme i kontakt
        med våre studenter og gjøre nettopp dette. EMIL-Link er Energi- og
        miljøingeniørenes bedriftskontakt, en komite underlagt linjeforeningen.
        Våre medlemmer jobber hardt for å gi det beste tilbudet til studentene,
        og være deres link til arbeidslivet!
      </p>

      <br></br>

      <p className="font-extralight text-sm lg:text-base leading-relaxed max-w-4xl">
       <i>Dersom din bedrift ønsker å komme i kontakt med energi og miljøstudentene, så ta kontakt med <span className="text-[#3A766C] font-semibold">link-styret@emilweb.no</span> .</i>
      </p>


      <div className="py-6">
        



        <Link href="https://www.emil-link.no/">
          <button className="bg-[#001D21] text-white py-2 px-5 rounded hover hover:bg-slate-400">
            Mer om EMIL-Link
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmilLink;
