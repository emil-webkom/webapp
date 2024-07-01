import Banner from "@/components/hero/for_studenten_banner";
import Hero2 from "@/components/hero/hero2";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col mt-4">
        <Hero2
          title="For studenten"
          undertitle="Her finner du alt du trenger som student på Emil"
        />
      </div>
      <Banner />
      {children}
    </div>
  );
}
