'use client'

import { Button } from "@/components/ui/button";
import Logos from "@/components/logosection/komitelogo";
import { useEffect, useState } from "react";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";

const forStudentenPage = () => {
  const [logos, setLogos] = useState([]);

  const fetchAndSetData = async () => {
    const [ logosData] = await Promise.all([
      fetch("../api/komite/logo").then((response) => response.json()),
    ]);
    return logosData ;
  };

  useEffect(() => {
    const initData = async () => {
      try {
        console.log("WeTryTofetchdata")
        const  logosData  = await fetchAndSetData();
        setLogos(logosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initData();
  },[])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src="/image/Komiteer/komiteer.jpg" alt="Komitearrangement" className="px-4 lg:px-8 rounded-lg w-full h-[50vh] object-cover" />
      <div className="max-w-[512px] w-full px-4 lg:px-8">
        <h1 className="text-white text-center font-semibold py-2 text-xl sm:text-2xl w-full">Komiteene</h1>
        <p className="text-white text-sm text-left">
          Emil har et rikt utvalg av komiteer som alle har lav terskel for å bli medlem av.
          Enkelte komiteer er mer forpliktende enn andre, men de drives av og for studenter
          så det er godt mulig å holde på med frivillig verv i linjeforeningen på siden.
          <br></br>
          <br></br>
          Unikt for emil er engasjementet som eksisterer i linjeforeningen. Emil har blant de høyeste
          andelen studenter som er med i linjeforeningen. Dette er til dels hvor enkelt det er å starte
          en egen komite for akkurat det du er interessert i!
        </p>
        </div>
        <SmallTransissionPCSPC/>
        <div className="w-full bg-[#225654] rounded-b-xl flex items-center justify-center">
        <div className="w-[95%] lg:w-[60%] pb-8">
          <Logos data={logos}/>
        </div>
        </div>
    </div>
  );
};

export default forStudentenPage;
