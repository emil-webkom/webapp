"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import { Speaker, Coffee, Home, FileQuestion, ListChecks } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center p-12 gap-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-white text-center font-semibold text-4xl w-full">
          Booking
        </h1>
        <p className="text-white text-md text-center">
          På Emil kan du som student booke en rekke ting til diverse
          anledninger. Vi har blant annet 2 Soundboxer til disposisjon,
          Emil-kontoret og nå en hytte som deles med Smørekoppen! Komiteer kan
          også booke ting til arrangementer eller liknende.{" "}
        </p>
      </div>
      <MenuCardView cards={cards}></MenuCardView>
    </div>
  );
};

export default BookingPage;

// <MenuCard
//           href="https://youtube.com"
//           logo={<Speaker />}
//           title="Soundbox"
//           description="Emil har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!"
//           buttonLabel="Book Soundbox"
//         ></MenuCard>
