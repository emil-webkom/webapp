"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero/hero1";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import ListView from "@/components/calendar/listView";

const HomePage = () => {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push("/for_studenten");
  // };

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col m-14 items-left justify-center pt-4">
        <div className="flex ">
          <Hero
            title="Energi og Miljø"
            undertitle="Velkommen til energi og miljøstudentenes linjeforening!"
          />
          <div className="relative max-lg:hidden w-[8rem] h-[8rem]">
            <Image
              src="/image/logo.png"
              fill
              alt="Emil Logo"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex text-left space-x-5 pt-9 px-1">
          <div className="flex items-left space-x-2 items-center">
            <span className="font-bold text-xl tracking-tighter ">
              Ny Student?
            </span>
            {/* <p className="text-l font-light tracking-tighter">
              Klikk her for å lese mer
            </p> */}
          </div>
          {/* <Button onClick={handleClick}>Les mer</Button> */}
          <Link href="/for_studenten">
            <Button>
              Les mer
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <TransissionIn />
      <div className="h-screen w-full background-dark pt-8">
        {/* <p className="text-white">Stuff goes here</p> */}
        <div className="gap-4 flex justify-center">
          <div className="bg-emerald-400 w-[40rem] rounded-md border">
            <ListView
              events={[
                {
                  title: "ragusea",
                  decscription: "Adam ragusea is a food critic and youtuber",
                },
                {
                  title: "Cook",
                  decscription: "Adam ragusea is a food critic and youtuber",
                },
              ]}
            />
          </div>
          <div className="bg-white inline-block rounded-md max-lg:hidden">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </div>
      </div>
      <TransissionOut />
      <TransissionIn />
    </div>
  );
};

export default HomePage;
