"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import { Booking } from "@/schemas/booking";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import { Speaker, Coffee, Home, FileQuestion, ListChecks } from "lucide-react";
import { useState } from "react";
import Calendar from "react-calendar";

const BookingPage = () => {
  const cards: MenuCardProps[] = [
    {
      title: "Soundbox",
      logo: <Speaker />,
      description:
        "Emil har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!",
      buttonLabel: "Book Soundbox",
      href: "/for_studenten/booking/soundbox",
    },
    {
      title: "Kontoret",
      logo: <Coffee />,
      description:
        "Emil-kontoret kan bookes hver dag fra 12 - 20. Dersom det skal drikkes alkohol inne på kontoret må man sende melding til vaktmesteren på gløs for å få dette godkjent på forhånd",
      buttonLabel: "Book kontoret",
      href: "https://youtube.com",
    },
    {
      title: "Hytte",
      logo: <Home />,
      description:
        "Emil har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!",
      buttonLabel: "Book hytte",
      href: "http://eshyttekom.no/",
    },
    {
      title: "Mine bookinger",
      logo: <ListChecks />,
      description:
        "Her finner du en oversikt over dine aktive og tidligere bookinger.",
      buttonLabel: "Se min oversikt",
      href: "/for_studenten/booking/bookings",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="p-12 bg-[#225654] rounded-b-md h-full">
        <MenuCardView cards={cards}></MenuCardView>
      </div>
    </div>
  );
};

export default BookingPage;
