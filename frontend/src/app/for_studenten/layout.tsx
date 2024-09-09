import Banner from "@/components/hero/for_studenten_banner";
import Hero2 from "@/components/hero/hero2";
import TransissionIn from "@/components/hero/transissions/transissionIn";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col">
        <Hero2
          title="For studenten"
          undertitle="Her finner du alt du trenger som student på Emil"
        />
      </div>
      <Banner />
      <div className="grid place-items-center">
        <div className="lg:w-[65%] bg-green-dark flex flex-col items-center rounded-xl ">
          {children}
        </div>
      </div>
      <TransissionIn />
    </div>
  );
}
