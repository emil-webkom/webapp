"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";
import MenuCardView from "@/components/ForStudenten/ui/menu-card-view";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
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
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const cards: MenuCardProps[] = [
    {
      title: "Vedtekter",
      logo: <ScrollText />,
      description:
        "Nedenfor finner du vedtektene til EMIL. Disse blir gjennomgått hvert år på budsjett- og vedtektsmøtet.",
      buttonLabel: "Se vedtekter",
      href: "https://docs.google.com/document/d/e/2PACX-1vSWq9cOIjpmuImkfUpt0d1G-DVt1IIFrh1SyQazGKn87Bg8DGg49wpDRYeeMX41UjRbuhl-CQeXC9Fx/pub",
    },
    {
      title: "Søknader",
      logo: <HandCoins />,
      description:
        "Her finner du alle tidligere søknader, både søknader til Leo's minnefond og Blomsterpotten.",
      buttonLabel: "Se søknader",
      href: "https://drive.google.com/drive/folders/1nM-PpRLzSYRzXTxGqjNdU8iynfK6UO3p",
    },
    {
      title: "Rapporter",
      logo: <Archive />,
      description:
        "Se arkivet for en oversikt over gamle rapporter f. eks. diplomundersøkelsen og trivselsrapporter.",
      buttonLabel: "Se rapporter",
      href: "https://emilweb.no/wp-content/uploads/2023/04/Diplomundersokelsen-2023-1.pdf",
    },
    {
      title: "Hvordan føre bilag",
      logo: <NotebookPen />,
      description:
        "Lurer du på hvordan du skal føre et bilag? Trykk på knappen nedenfor og les guiden.",
      href: "https://docs.google.com/document/d/13EW10RfGKc0zpBc4LVUgyyl3ksGq0fsjWQ08zL5bnO4/edit",
      buttonLabel: "Hvordan føre bilag",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex max-w-[512px] flex-col justify-center items-center space-y-4 pb-0 p-12">
        <h1 className="text-white text-center font-semibold text-4xl w-full">
          Viktige dokumenter
        </h1>
        <p className="text-white text-md text-center">
          Her ligger alle viktige dokumenter som Emil publiserer hvert år. For å
          se Diplomundersøkelsen må du trykke på “Se rapporter”.
        </p>
      </div>
      <div className="p-8">
        <MenuCardView cards={cards} />
      </div>
      <SmallTransissionPCSPC />
      <div className="w-full flex flex-col items-center justify-center text-white bg-[#225654] px-2 lg:px-4 gap-y-4 pb-4">
        <div className="max-w-[512px] flex flex-col items-center justify-center text-white rounded-md bg-[#3333] w-full px-4 lg:px-8 p-4">
          <h1 className="font-bold text-lg pb-4">EMIL-Eden</h1>
          <p>Lær oss gleden over de enkle ting,</p>
          <br />
          <p>og latter som ikke har ondt i sinn</p>
          <br />
          <p>Forlatelse fri for baktanke,</p>
          <br />
          <p>og kjærlighet til alle mennesker under solen.</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center text-white bg-[#225654] px-2 lg:px-4 gap-y-4 pb-4 rounded-b-lg">
        <div className="flex flex-col items-center justify-center max-w-[512px] py-4 gap-y-4 bg-[#225654]">
          <p className="font-bold text-lg text-white">Emil Eventyret</p>
          <p className="text-white text-md text-center">
            Emil har også sitt eget eventyr. Dette er det essensielt at alle
            emilere kan utenatt, så du gjør deg kanskje lurt som førsteklassing
            å kjenne til eventyret.
          </p>
          <Button onClick={toggleModal}>Du finner det her</Button>
          {openModal ? (
            <Modal
              isOpen={openModal}
              children={
                <div className="p-4 space-y-4">
                  <p>
                    Det var en gang en liten gutt som het Emil. Han var egentlig
                    en ganske vanlig gutt, men han hadde en egenskap som ikke
                    alle andre gutter på hans alder hadde. Emil hadde en tanke.
                    Faktisk en ganske stor tanke for en liten gutt. Emil ville
                    nemlig redde verden. Men hvordan skulle han klare det? Han
                    var jo bare én, og så veldig liten.
                    <br />
                    <br />
                    Emil tenkte stille for seg selv:
                    <br /> – Verden blir nøyaktig så bra som de handlingene vi
                    mennesker velger å gjøre. Å gjøre eller ikke gjøre, det er
                    tingen! Og slik sendte Moder Jord Emil ut i verden sånn at
                    han kunne realisere den store, lille tanken sin.
                    <br />
                    <br />
                    Etter å ha gått langt og lengre enn langt kom Emil til et
                    stort hav. På en metalløy ute i havet stod Georg og Petrine
                    og pumpet opp stygg, svart og stinkende olje. Det gikk i et
                    forrykende tempo og flammene stod høyt på himmelen mens
                    oljen ble fraktet over i store tankskip. I det samme så Emil
                    at en stor og sterk storm nærmet seg land. Havnivået steg
                    raskere enn antatt og nyhetene meldte om ekstreme
                    tørkeperioder i store deler av verden. Irma Isbjørn klamret
                    seg fast til et smeltende isflak.
                    <br /> – Å hjelp meg, hjelp meg, isen må ikke smelte,
                    hikstet Irma Isbjørn. Og klok som Emil var, løp han ned til
                    Georg og Petrine og ropte:
                    <br /> – Hallo, hallo, jeg tror ikke dere vet hva dere gjør.
                    Ser dere ikke at dere varmer opp verden?! Så forklarte Emil
                    om klimagassene og klimaendringne. Georg og Petrine forstod
                    og bestemte seg for å hjelpe Emil med å redde verden i
                    stedet. Teknologi kan vi jo bruke til flere ting, mente de.
                    <br />
                    <br />
                    Plutselig kom en knallrosa Jeep kjørende forbi i en rasende
                    fart. Det var Smøre-Snorre. Emil syntes at det var for galt
                    at han skulle kjøre slik og forurense, så han foreslo for
                    Smøre-Snorre at han kunne kjøre el-bil istedenfor, og det
                    synes Smøre-Snorre var en fabelaktig idé.
                    <br /> – Kanskje du kan hjelpe kompisen min også, spurte
                    Smøre-Snorre.
                    <br /> – Hun heter Bjørg-Bygg og har kledd på seg alt, alt
                    for mye. Hun er blitt både for varm og klam og ingen vil bo
                    i henne lengre. Faktisk holder hun på å knekke fordi hun er
                    blitt for tung.
                    <br /> – Ikke noe problem, sa Emil. Og slik ble det til at
                    Bjørg-Bygg fikk både solceller på taket og SMART-måler i
                    kjelleren. Slik fortsatte Emil med å gjøre verden bedre,
                    litt etter litt. Emil vandret fredelig videre og nøt synet
                    av en stor vindmøllepark, som lå i utkanten av en stor skog.
                    Det regnet, så Emil skjønte at dette måtte være regnskogen.
                    <br />– Regnskogen er viktig, tenkte Emil mens han grublet
                    på hvordan han skulle klare å gjøre hele verden bedre. Det
                    var verken en lett eller rask oppgave. Emil så seg rundt
                    igjen. En grå tåke hadde lagt seg rundt den lille byen han
                    nå befant seg i. Trærne så triste og sørgelige ut, og over
                    alt var det søppel. Emil ga det nærmeste treet en god klem
                    og begynte å plukke opp skrotet.
                    <br />
                    <br />
                    Når menneskene ikke engang tar vare på byen og trærne sine,
                    hvordan skal jeg da klare å lære dem å gjør det som er
                    riktig for verden? tenkte Emil. Han prøvde å tenke positive
                    tanker. I det samme dukket noen grønnkledde skikkelser i et
                    særlig grønt lys opp. Dette var Moder Jords personlige
                    etterretningstjeneste. Og de sa:
                    <br /> – Emil, vår venn, Moder Jord trenger deg mer enn noen
                    gang, så ikke mist motet. Vi kan vise deg riktig vei, men
                    bare virkelige handlinger kan redde verden, og det må du og
                    alle andre gjøre alene. Og like brått som de kom, forsvant
                    De Grønne. Emil trasket tappert mot byen. Rundt seg og på
                    veien så han triste og uttrykksløse mennesker, som han
                    åpenhjertig forsøkte å opplyse om sin gode idé. Men
                    menneskene virket likegyldige og upåvirkelige, akkurat som
                    om noen hadde tatt fra dem selve evnen til å tenke selv.
                    <br />
                    <br />
                    Jo lenger Emil gikk, desto mørkere ble det. Plutselig tronet
                    den grusomme og voldsomt onde Grev Tsjernobyl og De
                    Sortkledde hjelperne hans opp midt på torget, høyt hevet
                    over alle andre.
                    <br /> – DU! tordnet Grev Tsjernobyl, og heiste Emil høyt
                    opp i været med bare en finger. Den lille byen ristet og
                    himmelen ble svart som svarteste natten.
                    <br /> – Hvis ikke du slutter å redde verden, må du bøte med
                    livet ved å drikke dette giftbegeret! Først ble Emil veldig
                    redd, men så husket han hva De Grønne hadde sagt, og lille
                    Emil følte seg slett ikke så liten likevel. Han stirret Grev
                    Tsjernobyl hardt inn i øynene og sa:
                    <br /> – Ikke for min skyld, men for menneskenes egen skyld,
                    drikker jeg heller giftbegeret enn å gi opp min tanke!
                  </p>
                  <Button onClick={toggleModal}>Lukk?</Button>
                </div>
              }
            />
          ) : null}
        </div>
      </div>
      <SmallTransissionSPCPC />
      <div className="w-full flex flex-col items-center justify-center text-white px-2 lg:px-4 gap-y-4 pb-4 rounded-b-lg">
        <div className="max-w-[512px] w-full px-4 lg:px-8">
          <h1 className="text-white text-center font-semibold py-2 text-xl sm:text-2xl w-full">
            Wall of fame
          </h1>
          <p className="text-white text-sm text-left">
            Hvert år deler linjeforeningen ut ærespris og fortjenestemedajle til
            medlemmene som har bemerket seg i linjeforeningen. Under finner du
            emil's wall of fame
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
                            <td className="px-2 lg:px-6 py-4 border-b border-[#003A42]">
                              {aeresemiler.aar}
                            </td>
                            <td className="px-2 lg:px-6 py-4 border-b border-[#003A42]">
                              {aeresemiler.type.charAt(0).toUpperCase() +
                                aeresemiler.type.slice(1).toLowerCase()}
                            </td>
                            <td className="px-2 lg:px-6 py-4 border-b border-[#003A42] whitespace-normal break-words">
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
