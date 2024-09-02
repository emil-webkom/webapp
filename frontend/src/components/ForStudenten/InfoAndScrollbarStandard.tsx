import Link from "next/link";
import React from "react";

//Husk å legge til felt med kontaktinfo

interface InfoAndScrollbarStandardProps {
  title: string;
  imageUrl: string;
  text: string;
  info: string;

  children?: React.ReactNode;
}

const InfoAndScrollbarStandard: React.FC<InfoAndScrollbarStandardProps> = ({
  title,
  imageUrl,
  text,
  info,

  children,
}) => {
  return (
    <div className="flex justify-center mt-12 mb-48">
      <div className="bg-[#003A42] w-3/4 rounded-lg text-white h-full flex flex-col relative">
        <div className="w-full p-2">
          <div className="relative">
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#003A42] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#003A42] to-transparent pointer-events-none"></div>

            <div className="flex overflow-x-auto scrollbar-hide custom-scrollbar bg-[#003A42] rounded-t-lg border-b border-white m-5">
              <Link
                href="/for_studenten/komiteer/emil-styret"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                EMIL-styret
              </Link>

              <Link
                href="/for_studenten/komiteer/det-eldres-rad"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                Det eldres råd
              </Link>

              <Link
                href="/for_studenten/komiteer/emil-link"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                EMIL-link
              </Link>

              <Link
                href="/for_studenten/komiteer/fadderkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FadderKom
              </Link>

              <Link
                href="/for_studenten/komiteer/miljokom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                MiljøKom
              </Link>

              <Link
                href="/for_studenten/komiteer/festkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FestKom
              </Link>

              <Link
                href="/for_studenten/komiteer/idrettskom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                IdrettsKom
              </Link>

              <Link
                href="/for_studenten/komiteer/gourmetkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                GourmetKom
              </Link>

              <Link
                href="/for_studenten/komiteer/hoystemt"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                Høystemt
              </Link>

              <Link
                href="/for_studenten/komiteer/arekom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                Årekom
              </Link>

              <Link
                href="/for_studenten/komiteer/emil-styret"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FestKom
              </Link>

              <Link
                href="/for_studenten/komiteer/kom-pa-tur"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                KomPåTur
              </Link>

              <Link
                href="/for_studenten/komiteer/emil-styret"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FestKom
              </Link>

              <Link
                href="/for_studenten/komiteer/kontokom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                KontoKom
              </Link>

              <Link
                href="/for_studenten/komiteer/kvinnekom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                KvinneKom
              </Link>

              <Link
                href="/for_studenten/komiteer/mannekom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                ManneKom
              </Link>

              <Link
                href="/for_studenten/komiteer/mediakom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                MediaKom
              </Link>

              <Link
                href="/for_studenten/komiteer/brettkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                BrettKom
              </Link>

              <Link
                href="/for_studenten/komiteer/energi-fk"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                EnergiFK
              </Link>

              <Link
                href="/for_studenten/komiteer/interkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FestKom
              </Link>

              <Link
                href="/for_studenten/komiteer/kjellerkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                KjellerKom
              </Link>

              <Link
                href="/for_studenten/komiteer/emil-styret"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                FestKom
              </Link>

              <Link
                href="/for_studenten/komiteer/pikestrom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                Pikestrøm
              </Link>

              <Link
                href="/for_studenten/komiteer/musikkkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                MusikkKom
              </Link>

              <Link
                href="/for_studenten/komiteer/premil-league"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                PrEMIL league
              </Link>

              <Link
                href="/for_studenten/komiteer/olkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                ØlKom
              </Link>

              <Link
                href="/for_studenten/komiteer/emil-invest"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                EMIL Invest
              </Link>

              <Link
                href="/for_studenten/komiteer/klatrekom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                KlatreKom
              </Link>

              <Link
                href="/for_studenten/komiteer/klovnelopet"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                Klovneløpet
              </Link>

              <Link
                href="/for_studenten/komiteer/jubkom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                JUB-kom
              </Link>

              <Link
                href="/for_studenten/komiteer/hobbykom"
                className="flex-none text-white font-normal px-4 py-2 hover:text-gray-300 active:text-grey-500 hover-shadow"
              >
                HobbyKom
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2 pt-2 pb-8">
              <p className="font-medium text-left text-2xl mt-12 mb-8 pl-12 pr-12">
                {title}
              </p>
              <p className="text-left my-4 pl-12 pr-12">{text}</p>
              <p className="text-left font-thin my-4 pl-12 pr-12 pb-6">
                {info}
              </p>
              {children}
            </div>

            <div className="w-1/2 pt-2 pb-8 ">
              <img
                src={imageUrl}
                alt=""
                className="rounded-lg mt-12 mb-12 pr-12  "
              />
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoAndScrollbarStandard;
