"use client";

import { Button } from "@/components/ui/button";
import Logos from "@/components/logosection/komitelogo";
import { useEffect, useState } from "react";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import HeaderImage from "@/components/ForStudenten/headerImage";

const ForStudentenPage = () => {
  const [logos, setLogos] = useState<any[]>([]); // Use a more specific type if available

  const fetchAndSetData = async () => {
    const [logosData] = await Promise.all([
      fetch("../api/komite/logo").then((response) => response.json()),
    ]);
    return logosData;
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const logosData = await fetchAndSetData();
        setLogos(logosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initData();
  }, []);

  return (
    <div className="w-full text-white flex flex-col items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center px-12 pb-10 space-y-6">
        <HeaderImage 
          src="/image/Komiteer/komiteer.jpg"
          alt="Komitearrangement"
          backgroundPos="0% 50%"/>
        <HeaderText className="text-3xl">Komiteene</HeaderText>
        <p className="text-white max-w-lg">
        Emil har et rikt utvalg av komiteer som alle har lav terskel for å bli
          medlem av. Enkelte komiteer er mer forpliktende enn andre, men de
          drives av og for studenter så det er godt mulig å holde på med
          frivillig verv i linjeforeningen på siden.
          <br />
          <br />
          Unikt for emil er engasjementet som eksisterer i linjeforeningen. Emil
          har blant de høyeste andelen studenter som er med i linjeforeningen.
          Dette er til dels hvor enkelt det er å starte en egen komite for
          akkurat det du er interessert i!
        </p>
      </div>
      <SmallTransissionPCSPC />
      <div className="w-full bg-green-mid rounded-b-xl flex items-center justify-center py-10">
        <div className="w-[95%] lg:w-[60%] pb">
          {logos.length > 0 ? (
            <Logos data={logos} />
          ) : (
            <div className="text-center text-white py-4">
              <p>No logos available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForStudentenPage;
