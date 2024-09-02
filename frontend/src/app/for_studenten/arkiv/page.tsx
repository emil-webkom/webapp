"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { HandCoins, ScrollText, Archive, NotebookPen } from "lucide-react";
import { useState } from "react";

const ArkivPage = () => {
  const [aeresEmiler, setAeresEmiler] = useState<AeresEmiler[]>([]);
  const {data, loading, error} = useFetch<AeresEmiler[]>("/api/aeresemiler");

  const cards: MenuCardProps[] = [
    {
      title: "Vedtekter",
      logo: <ScrollText />,
      description:
        "Nedenfor finner du vedtektene til EMIL. Disse blir gjennomgått hvert år på budsjett- og vedtektsmøtet.",
      buttonLabel: "Se vedtekter",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Søknader",
      logo: <HandCoins />,
      description:
        "Her finner du alle tidligere søknader, både søknader til Leo's minnefond og Blomsterpotten.",
      buttonLabel: "Se søknader",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Rapporter",
      logo: <Archive />,
      description:
        "Se arkivet for en oversikt over gamle rapporter f. eks. diplomundersøkelsen og trivselsrapporter. ",
      buttonLabel: "Se rapporter",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Hvordan føre bilag",
      logo: <NotebookPen />,
      description:
        "Lurer du på hvordan du skal føre et bilag? Trykk på knappen nedenfor og les guiden.",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
      buttonLabel: "Hvordan føre bilag",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-white text-center font-semibold text-4xl w-full">
          Viktige dokumenter
        </h1>
        <p className="text-white text-md text-center">
          Her ligger alle viktige dokumenter som Emil publiserer hvert år. For å
          se Diplomundersøkelsen må du trykke på “Se rapporter”.{" "}
        </p>
      </div>
      <MenuCardView cards={cards}></MenuCardView>
      <div>HereGoesAeresEmilere</div>
    </div>
  );
};

export default ArkivPage;

// <MenuCard
//           href="https://youtube.com"
//           logo={<Speaker />}
//           title="Soundbox"
//           description="Emil har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!"
//           buttonLabel="Book Soundbox"
//         ></MenuCard>
