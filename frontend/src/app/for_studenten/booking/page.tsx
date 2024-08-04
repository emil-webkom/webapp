import MenuCard from "@/components/ForStudenten/ui/MenuCard";
import { Speaker } from "lucide-react";

const BookingPage = () => {
  return (
    <>
      <MenuCard
        logo={<Speaker />}
        title="Soundbox"
        description="Emil har hele 2 soundboxer som studenter kan låne! 
Book en soundbox til en valgt dato eller tid. Ventetiden kan være lang så vær obs på å booke i god tid!"
        buttonLabel="Book Soundbox"
      ></MenuCard>
    </>
  );
};

export default BookingPage;
