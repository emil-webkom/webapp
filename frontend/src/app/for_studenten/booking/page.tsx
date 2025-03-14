"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import { Booking } from "@/schemas/booking";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import {
  Speaker,
  Coffee,
  Home,
  FileQuestion,
  ListChecks,
  GlassWater,
} from "lucide-react";
import { useState } from "react";
import Calendar from "react-calendar";

const BookingPage = () => {
  const cards: MenuCardProps[] = [
    {
      title: "Soundbox",
      logo: <Speaker />,
      description:
        "EMIL har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!",
      buttonLabel: "Book Soundbox",
      href: "/for_studenten/booking/soundbox",
    },
    {
      title: "Kontoret",
      logo: <Coffee />,
      description:
        "EMIL-kontoret kan bookes hver dag utenom tiden mellom 08 - 14. Dersom det skal drikkes alkohol inne på kontoret må man kontakte sittende gjøgler for å få dette godkjent på forhånd",
      buttonLabel: "Book kontoret",
      href: "https://docs.google.com/spreadsheets/d/1iTiJEgOG2_s4J4E_RQ00xvkrdbzLuMY_Wmy-Uo-3mSw/edit?usp=sharing",
    },
    {
      title: "Hytte",
      logo: <Home />,
      description:
        "Emil har egen hytte som vi deler med Smørekoppen. Dette er en hytte som kan bookes til fritt bruk av medlemmene i linjeforeningen. Du finner all informasjon under.",
      buttonLabel: "Book hytte",
      href: "http://eshyttekom.no/",
    },
    {
      title: "Emil og Smørekopp-kjelleren",
      logo: <GlassWater />,
      description:
        "Emil deler kjeller med Smørekoppen og som medlem av linjeforeningen kan denne bookes! Du finner lenken under.",
      buttonLabel: "Book kjelleren",
      href: "https://emilogsmorekoppenkjelleren.simplybook.it/v2/",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="px-12 py-10 bg-green-mid rounded-b-md h-full">
        <MenuCardView cards={cards}></MenuCardView>
      </div>
    </div>
  );
};

export default BookingPage;
