import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface InfoAndScrollbarProps {
  title: string;
  imageUrl: string;
  text: string;
  info: string;

  imagePosition?: "left" | "right";
  children?: React.ReactNode;
}

const InfoAndScrollbarLeft: React.FC<InfoAndScrollbarProps> = ({
  title,
  imageUrl,
  text,
  info,

  imagePosition = "left",
  children,
}) => {
  return (
    <div className="flex justify-center mt-12 mb-48">
      <div className="bg-[#003A42] w-3/4 rounded-lg text-white h-full flex flex-col relative">
        <div className="w-full p-2">
          <div className="relative">
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#003A42] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#003A42] to-transparent pointer-events-none"></div>

            <div className="flex overflow-x-auto scrollbar-hide bg-[#003A42] rounded-t-lg border-b border-gray-300 m-5">
              <Link
                href="/for_studenten/komiteer/EMIL-styret"
                className="flex-none text-white font-semibold px-4 py-2 hover:text-gray-300 active:text-grey-500"
              >
                EMIL-styret
              </Link>
              <div className="flex-none text-white font-semibold px-4 py-2">
                Det eldres råd
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                EMIL-Link
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                FadderKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                MiljøKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                FestKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                IdrettsKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                GourmetKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                Høystemt
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                ÅreKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                KomPåTur
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                KontoKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                KvinneKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                ManneKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                MediaKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold ">
                BrettKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                EnergiFK
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                InterKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                KjellerKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                Pikestrøm
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                MusikkKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                PrEMIL league
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                RevyKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                ØlKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                EMIL Invest
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                KlatreKom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                Klovneløpet
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                JUB-Kom
              </div>
              <div className="flex-none text-white px-4 py-2 font-semibold">
                HobbyKom
              </div>
            </div>

            <div className="flex">
              {imagePosition === "left" && (
                <div className="w-1/2 p-2">
                  <img
                    src={imageUrl}
                    alt=""
                    className="rounded-lg mt-32 pl-12"
                  />
                </div>
              )}
              <div className="w-1/2 p-2">
                <p className="font-bold text-left text-2xl mt-12 mb-8 pl-12 pr-12">
                  {title}
                </p>
                <p className="text-left  my-4 pl-12 pr-12">{text}</p>
                <p className="text-left font-thin my-4 pl-12 pr-12 mb-0">
                  {info}
                </p>
              </div>
              {imagePosition === "right" && (
                <div className="w-1/2 p-2">
                  <img
                    src={imageUrl}
                    alt=""
                    className="rounded-lg pl-12 mt-12 pr-24"
                  />
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAndScrollbarLeft;
