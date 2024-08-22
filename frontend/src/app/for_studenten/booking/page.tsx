import BackgroundMain from "@/components/ForStudenten/ui/background-main";
import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import { Speaker, Coffee, Home, FileQuestion } from "lucide-react";

const BookingPage = () => {
  const cards: MenuCardProps[] = [
    {
      title: "Soundbox",
      logo: <Speaker />,
      description:
        "Emil har hele 2 soundboxer som studenter kan låne! Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!",
      buttonLabel: "Book Soundbox",
      href: "https://youtube.com",
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
      title: "Annet",
      logo: <FileQuestion />,
      description: "Hei hei heo",
      href: "https://youtube.com",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <BackgroundMain>
        <div className="flex flex-col space-y-4">
          <h1 className=" text-white font-semibold text-4xl w-3/4">Booking</h1>
          <p className="text-white text-md">
            På Emil kan du som student booke en rekke ting til diverse
            anledninger. Vi har blant annet 2 Soundboxer til disposisjon,
            Emil-kontoret og nå en hytte som deles med Smørekoppen! Komiteer kan
            også booke ting til arrangementer eller liknende.{" "}
          </p>
        </div>
        <MenuCardView cards={cards}></MenuCardView>
      </BackgroundMain>
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
