"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import MiniCard from "./miniCard";

type BigCardProps = {
  title?: string;
  description?: string;
  footer?: any;
};

const BigCard = ({ title, description, ...rest }: BigCardProps) => {
  return (
    <>
      <div className="p-8 flex flex-row rounded-md bg-[#003A42] w-[100%] lg:w-[60rem] text-left">
        <div className="flex flex-col gap-y-4 p-4 flex-1">
          <div className="font-medium text-white text-2xl">{title}</div>
          <div className=" text-white">{description}</div>
          <div>
            <Link href="/for_studenten/komiteer">
              <Button>Finn deg en komité</Button>
            </Link>
          </div>
        </div>
        <div className=" hidden lg:block p-4 space-x-4 justify-center">
          <div className="flex-col space-y-4">
            <div className="space-x-4">
              <MiniCard
                label={"Høystemt"}
                comitee={"Mannskoret"}
                img="/image/Komiteer/Høystemt.png"
                link="/for_studenten/komiteer"
              />
              <MiniCard
                label={"Pikestrøm"}
                comitee={"pikestrøm"}
                img="/image/Komiteer/pikestrøm.png"
                link="/for_studenten/komiteer"
              />
              <MiniCard
                label={"Klovneløpet"}
                comitee={"klovnen"}
                img="/image/Komiteer/klovneløpet.png"
                link="/for_studenten/komiteer"
              />
            </div>
            <div className="space-x-4">
              <MiniCard
                label={"Ølkom"}
                comitee={"olkom"}
                img="/image/Komiteer/ølkom.png"
                link="/for_studenten/komiteer"
              />
              <MiniCard
                label={"Brettkom"}
                comitee={"spillogmoro"}
                img="/image/Komiteer/Brettkom.png"
                link="/for_studenten/komiteer"
              />
              <MiniCard
                label={"Kvinnekom"}
                comitee={"morendin"}
                img="/image/Komiteer/pikestrøm.png"
                link="/for_studenten/komiteer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigCard;
