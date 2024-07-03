// pages/index.jsx (or any other page/component file)
import React from 'react';
import Link from 'next/link';

const EmilLink = () => {
  return (
    <div className="bg-[#001D21] flex flex-col items-center justify-center  text-center py-18">
      <p className="font-extrabold text-2xl text-white py-6 ">
        EMIL-Link
      </p>
      <p className="text-white mx-5 text-sm  leading-relaxed max-w-4xl">
        Ønsker din bedrift å promotere stillingsannonser, internships eller gi et generelt innblikk i hva din bedrift driver med? Emil-Link tilbyr flere ulike tjenester hvor bedrifter har mulighet til å komme i kontakt med våre studenter og gjøre nettopp dette. EMIL-Link er Energi- og miljøingeniørenes bedriftskontakt, en komite underlagt linjeforeningen. Våre medlemmer jobber hardt for å gi det beste tilbudet til studentene, og være deres link til arbeidslivet!
      </p>
        <div className ="py-6">
        <Link href="https://www.emil-link.no/">
            <button className="bg-white text-[#001D21] py-2 px-4 rounded hover:underline text-sm">
            Kontakt oss her
            </button> 
        </Link>
        </div>
    </div>
  );
};

export default EmilLink;
