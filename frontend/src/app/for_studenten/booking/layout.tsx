import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import Banner from "@/components/hero/for_studenten_banner";
import Hero2 from "@/components/hero/hero2";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import TransissionIn from "@/components/hero/transissions/transissionIn";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white w-full">
      <div className="w-full flex flex-col justify-center items-center px-12 py-10">
        <HeaderText className="text-3xl">Booking</HeaderText>
        <p className="text-white font-normal max-w-lg pt-4">
        På EMIL kan du som student booke en rekke ting til diverse
        anledninger. Vi har blant annet 2 Soundboxer til disposisjon,
          EMIL-kontoret og nå en hytte som deles med Smørekoppen! Komiteer kan
          også booke ting til arrangementer eller liknende.
        </p>
      </div>
      <SmallTransissionPCSPC />
      {children}
    </div>
  );
}
