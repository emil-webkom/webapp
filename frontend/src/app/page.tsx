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
import BigCard from "@/components/landing/bigCard";
import { cardData } from "@/static/landingInfo";
import VideoPlayer from "@/components/landing/video-player";
import Baerekraft from "@/components/landing/baerekraft";

const HomePage = () => {
  const data = JSON.parse(cardData);

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
      <div className="h-full w-full background-dark p-8 justify-center">
        {/* <p className="text-white">Stuff goes here</p> */}
        <div className="gap-4 flex justify-center">
          <div className="">
            <ListView
              events={[
                {
                  id: "kuk",
                  title: "Ragusea",
                  decscription: "Adam ragusea is a food critic and youtuber",
                  trinn: 3,
                  location: "Snarøya tennisbane",
                  date: "12.06",
                },
                {
                  id: "kuk",
                  title: "Cook",
                  decscription: "Adam ragusea is a food critic and youtuber",
                  trinn: 2,
                  location: "R7, Realfagsbygget",
                  date: "01.06",
                },
                {
                  id: "kuk",
                  title: "Meatballs",
                  decscription: "Adam ragusea is a food critic and youtuber",
                  date: "03.05",
                  trinn: 4,
                  location: "Ragusea Lake",
                },
                {
                  id: "kuk",
                  title: "Why i season my cutting board",
                  decscription: "Adam ragusea is a food critic and youtuber",
                  trinn: 5,
                  location: "R7, Realfagsbygget",
                  date: "01.06",
                },
                {
                  id: "kuk",
                  title: "Not my steak",
                  decscription: "Adam ragusea is a food critic and youtuber",
                  trinn: 1,
                  location: "R7, Realfagsbygget",
                  date: "01.06",
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
        <div className="flex justify-center mt-4">
          <BigCard {...data} />
        </div>
        <VideoPlayer />
      </div>
      {/* <TransissionOut />
      <Baerekraft />
      <TransissionIn /> */}
      <Image src="/svg/bg.svg" alt={"baerekraft"} className="w-full" width={1920} height={1080}/>
    </div>
  );
};

export default HomePage;
