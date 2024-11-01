"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import MiniCard from "./miniCard";
import { useEffect, useState } from "react";
import { Hovedstyret } from "@/types/interfaces";
import { Komite } from "@/schemas/komite";

type BigCardProps = {
  title?: string;
  description?: string;
  footer?: any;
};

const BigCard = ({ title, description, ...rest }: BigCardProps) => {
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
    <>
      <div className="p-4 lg:p-8 flex flex-row rounded-md bg-green-dark w-[100%] lg:w-[60rem] text-left">
        <div className="flex flex-col gap-y-4 p-4 flex-1">
          <div className="font-medium text-white text-2xl">{title}</div>
          <div className=" text-white">{description}</div>
          <div className="w-full flex justify-center">
            <Link href="/for_studenten/komiteer">
              <Button>Finn deg en komité</Button>
            </Link>
          </div>
        </div>
        <div className=" hidden md:block p-4 space-x-4 justify-center">
          <div className="flex-col space-y-4 ">
            <div className="grid grid-cols-3 grid-rows-2 gap-3">
              {logos.slice(0, 6).map((komite: Komite) => (
                <MiniCard
                  label={komite.navn}
                  comitee={komite.navn}
                  img={komite.bilde}
                  link="/for_studenten/komiteer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigCard;
