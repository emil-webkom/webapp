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
      <div className="flex flex-col justify-center items-center text-2xl font-bold gap-y-4 py-4 px-4">
        <p>Booking</p>
        <p className="flex flex-col max-w-[512px] space-y-3 text-sm lg:text-l p-4">
          På Emil kan du som student booke en rekke ting til diverse
          anledninger. Vi har blant annet 2 Soundboxer til disposisjon,
          Emil-kontoret og nå en hytte som deles med Smørekoppen! Komiteer kan
          også booke ting til arrangementer eller liknende.{" "}
        </p>
      </div>
      <SmallTransissionPCSPC />
      {children}
    </div>
  );
}
