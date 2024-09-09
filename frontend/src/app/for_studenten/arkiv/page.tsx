"use client";

import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { testDeleteAeresemiler } from "@/tests/api/delete/deleteAeresemiler";
import { testPostAeresemiler } from "@/tests/api/post/postAeresemiler";
import { HandCoins, ScrollText, Archive, NotebookPen } from "lucide-react";
import { useState } from "react";

const ArkivPage = () => {
  const { data, loading, error } = useFetch<AeresEmiler[] | null>(
    "/api/aeresemiler",
  );

  // Define the page size (number of entries per page)
  const PAGE_SIZE = 7;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);

  const sortedData = data ? [...data].sort((a, b) => b.aar - a.aar) : [];

  // Calculate the start and end indices of the current page
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleTest = () => {
  //   testPostAeresemiler({aar: 2005, type:"AERESEMILER", navn:"Sigrun Kavli" });
  // testDeleteAeresemiler("cm0mjnivx00021vc4ie8zii2w");
  // };

  const cards: MenuCardProps[] = [
    {
      title: "Vedtekter",
      logo: <ScrollText />,
      description:
        "Nedenfor finner du vedtektene til EMIL. Disse blir gjennomgått hvert år på budsjett- og vedtektsmøtet.",
      buttonLabel: "Se vedtekter",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Søknader",
      logo: <HandCoins />,
      description:
        "Her finner du alle tidligere søknader, både søknader til Leo's minnefond og Blomsterpotten.",
      buttonLabel: "Se søknader",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Rapporter",
      logo: <Archive />,
      description:
        "Se arkivet for en oversikt over gamle rapporter f. eks. diplomundersøkelsen og trivselsrapporter.",
      buttonLabel: "Se rapporter",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
    },
    {
      title: "Hvordan føre bilag",
      logo: <NotebookPen />,
      description:
        "Lurer du på hvordan du skal føre et bilag? Trykk på knappen nedenfor og les guiden.",
      href: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran",
      buttonLabel: "Hvordan føre bilag",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-full flex flex-col justify-center items-center px-12 py-10">
        <HeaderText className="text-3xl">Viktige dokumenter</HeaderText>
        <p className="text-white font-normal text-center max-w-lg pt-4">
        Her ligger alle viktige dokumenter som EMIL publiserer hvert år. For å
        se Diplomundersøkelsen må du trykke på “Se rapporter”.
        </p>
        <div className="mt-10">
          <MenuCardView cards={cards} />
        </div>
      </div>
      <SmallTransissionPCSPC />
      <div className="w-full flex flex-col items-center justify-center bg-green-mid px-2 lg:px-4 gap-y-4 pb-4 rounded-b-lg">
        <div className="max-w-[512px] w-full px-4 lg:px-8">
          <h1 className="text-white text-center font-semibold py-2 text-xl sm:text-2xl w-full">
            Wall of fame
          </h1>
          <p className="text-white text-sm text-left">
            Hvert år deler linjeforeningen ut ærespris og fortjenestemedajle til
            medlemmene som har bemerket seg i linjeforeningen. Under finner du
            EMIL's wall of fame
          </p>
        </div>
        <div className="p-2 lg:px-4 rounded-md items-center justify-center w-full lg:w-2/3 bg-[#25504E]">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-ping h-8 w-8 bg-blue-400 rounded-full"></div>
            </div>
          ) : data && data.length > 0 ? (
            paginatedData.length > 0 ? (
              <div className="p-4">
                <div className="overflow-x-auto w-full">
                  {/* Table for larger screens */}
                  <div className="hidden lg:block">
                    <table className="bg-[#25504E] text-white rounded-md w-full table-fixed">
                      <thead>
                        <tr className="bg-[#1F3A38]">
                          <th className="px-2 lg:px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-primary rounded-l-md w-[15%]">
                            År
                          </th>
                          <th className="px-2 lg:px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-primary w-[35%]">
                            Type
                          </th>
                          <th className="px-2 lg:px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-primary rounded-r-md w-[50%]">
                            Navn
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((aeresemiler) => (
                          <tr key={aeresemiler.id}>
                            <td className="px-2 lg:px-6 py-4 border-b border-green-dark">
                              {aeresemiler.aar}
                            </td>
                            <td className="px-2 lg:px-6 py-4 border-b border-green-dark">
                              {aeresemiler.type.charAt(0).toUpperCase() +
                                aeresemiler.type.slice(1).toLowerCase()}
                            </td>
                            <td className="px-2 lg:px-6 py-4 border-b border-green-dark whitespace-normal break-words">
                              {aeresemiler.navn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Card layout for smaller screens */}
                  <div className="lg:hidden">
                    {paginatedData.map((aeresemiler) => (
                      <div
                        key={aeresemiler.id}
                        className="bg-[#25504E] text-white mb-4 p-4 rounded-md shadow-md"
                      >
                        <div className="text-lg font-semibold">
                          År: {aeresemiler.aar}
                        </div>
                        <div className="text-md font-medium mt-2">
                          Type:{" "}
                          {aeresemiler.type.charAt(0).toUpperCase() +
                            aeresemiler.type.slice(1).toLowerCase()}
                        </div>
                        <div className="text-md mt-2">
                          Navn: {aeresemiler.navn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-4 w-full">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 bg-[#1F3A38] text-white rounded-md ${
                      currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Forrige
                  </button>
                  <span className="text-white flex items-center">
                    Side {currentPage + 1} av {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className={`px-4 py-2 bg-[#1F3A38] text-white rounded-md ${
                      currentPage >= totalPages - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Neste
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white">No data available</p>
            )
          ) : (
            <div className="text-center text-lg font-semibold text-white">
              Ingen data tilgjengelig
            </div>
          )}
        </div>
      </div>
      {/* <button onClick={handleTest}> CLICK HERE TO TEST</button> */}
    </div>
  );
};

export default ArkivPage;
