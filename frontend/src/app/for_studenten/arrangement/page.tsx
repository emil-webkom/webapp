"use client";

import ListView from "@/components/event/listView";
import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button";
import { Arrangement } from "@/schemas/arrangement";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import StickyNavbar from "@/components/navbar/stickyNavbar";
import NyStudentCard from "@/components/cards/nyStudentCard";
import SmallTransissionDarkHighligt from "@/components/hero/transissions/smallTransissionDarkHighlight";
import SmallTransissionHighlightSPC from "@/components/hero/transissions/smallTransissionHighlightSPC";
import Calendar from "react-calendar";
import AarligArrangementCard from "@/components/cards/aarligArrangementCard";
import SmallTransissionSPCPC from "@/components/hero/transissions/smallTransissionSPCPC";
import SmallTransissionPCSPC from "@/components/hero/transissions/smallTransissionPCSPC";
import LavterskelArrangementForm from "@/components/forms/lavterskelarrangementform";
import EventCalendarView from "@/components/event/eventCalendarview";
import { LavterskelArrangement } from "@prisma/client";

const ForStudentenPage = () => {
  const [arrangementer, setArrangementer] = useState<Arrangement[]>([]);
  const [lavterskelArrangement, setLavterskelArrangement] = useState<
    lavTerskelArrangement[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("Regler");
  const [combinedArrangements, setCombinedArrangements] = useState<
    (Arrangement | lavTerskelArrangement)[]
  >([]);
  const [allCombinedArrangements, setAllCombinedArrangements] = useState<
    (Arrangement | lavTerskelArrangement)[]
  >([]);
  const [openForm, setOpenform] = useState<Boolean>(false);

  // Select date in calendar and find all arrangements (both regular and lavterskel) for the selected date
  const handleDateClick = (date: Date) => {
    const dateString = date.toDateString();
    setSelectedDate(dateString);

    // Filter both types of arrangements for the selected date
    const selectedDateArrangements = arrangementer.filter(
      (a) => new Date(a.dato).toDateString() === dateString,
    );
    const selectedDateLavterskelArrangements = lavterskelArrangement.filter(
      (a) => new Date(a.dato).toDateString() === dateString,
    );

    // Function for joining both lavterskel and regular arrangement.
    const combined = [
      ...selectedDateArrangements,
      ...selectedDateLavterskelArrangements,
    ];
    setCombinedArrangements(combined);
  };

  const handleSubmit = async (data: lavTerskelArrangement) => {
    const response = await fetch("/api/lavterskelarrangement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchData();
      closeModal();
    } else {
      console.error("Failed to send data");
    }
  };

  // Handle delete request from user
  const handleDeletion = (success: boolean) => {
    if (success) {
      fetchData();
      closeModal();
    } else {
      console.error("Failed to delete instance");
    }
  };

  // Close opened date
  const closeModal = () => {
    setSelectedDate(null);
    openForm ? toggleForm() : "";
  };

  const toggleForm = () => {
    setOpenform((prevState) => !prevState);
  };
  const handleCloseForm = () => {
    setOpenform(false);
  };

  // Function for fetchin and setting data from DB
  const fetchData = async () => {
    try {
      const responseLTA = await fetch("/api/lavterskelarrangement");
      const responseA = await fetch("/api/arrangementer");
      if (!responseLTA.ok) {
        if (!responseA.ok) {
          throw new Error(`HTTP error! status: ${responseA.status}`);
        }
        throw new Error(`HTTP error! status: ${responseLTA.status}`);
      }
      const dataLTA = await responseLTA.json();
      const dataA = await responseA.json();
      setArrangementer(dataA.data);
      setLavterskelArrangement(dataLTA.data);

      // Combine the arrangements after both states are updated
      console.log(dataLTA.data)
      const combined = [
        ...dataA.data,
        ...dataLTA.data,
      ];
      setAllCombinedArrangements(combined);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch arrangementer: ${err.message}`);
      } else {
        setError("Failed to fetch arrangementer: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };
  // API call to fetch arrangements from DB
  useEffect(() => {
    fetchData();
  }, []);

  const AarligarrangementData = [
    {
      Name: "Vin og Klin",
      Komite: "FestKom",
      Tekst:
        "brygger vinen, linjeforeningen drikker den. Det serveres gratis i tåteflasker og det en bjelle som dikterer når vinen skal drikkes. For å slippe å drikke, er det bare å finne seg noen å kline med i stedet. Mange syns dette er Emils artigste arrangement.",
      bilde: "/image/arrangement/V&K.png",
    },
    {
      Name: "Åretur",
      Komite: "Årekom",
      Tekst:
        "Her kan Emils Årekom garantere at uansett om du kommer for å stå på ski, brett eller bare for å drikke så skal alle med på afterski og byen. Det gjelder å finne den beste hangover-kuren og finne fram jaegerflasken fordi her skal tiden utnyttes best mulig.",
      bilde: "/image/arrangement/aaretur.png",
    },
  ];

  return (
    <div className=" flex flex-col justify-center w-full text-white">
      <div className="w-full pt-12 px-4 lg:px-8">
        <img
          src="/image/arrangement/Arrangement.jpg"
          alt="Arrangement forsidebilde"
          className="rounded-md object-cover object-[0_15%] w-full h-[19rem]"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-y-3 py-3">
        <div className="flex justify-center items-center text-2xl font-bold gap-x-3">
          <p>Arrangementer</p>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon/ticket">
              <path
                id="Vector"
                d="M3.5 7.5V9.5C4.29565 9.5 5.05871 9.81607 5.62132 10.3787C6.18393 10.9413 6.5 11.7044 6.5 12.5C6.5 13.2956 6.18393 14.0587 5.62132 14.6213C5.05871 15.1839 4.29565 15.5 3.5 15.5V17.5C3.5 18.6 4.4 19.5 5.5 19.5H19.5C20.0304 19.5 20.5391 19.2893 20.9142 18.9142C21.2893 18.5391 21.5 18.0304 21.5 17.5V15.5C20.7044 15.5 19.9413 15.1839 19.3787 14.6213C18.8161 14.0587 18.5 13.2956 18.5 12.5C18.5 11.7044 18.8161 10.9413 19.3787 10.3787C19.9413 9.81607 20.7044 9.5 21.5 9.5V7.5C21.5 6.96957 21.2893 6.46086 20.9142 6.08579C20.5391 5.71071 20.0304 5.5 19.5 5.5H5.5C4.96957 5.5 4.46086 5.71071 4.08579 6.08579C3.71071 6.46086 3.5 6.96957 3.5 7.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M13.5 5.5V7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_3"
                d="M13.5 17.5V19.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_4"
                d="M13.5 11.5V13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col max-w-[512px] space-y-3 text-sm lg:text-l px-4">
          <p>
            Linjeforeningen arrangerer en rekke ulike arrangementer og disse kan
            være for kun komiteene eller hele linjeforeningen. Ofte arrangerer
            komiteene arrangementer for medlemmene sine, men de kan også
            arrangere for hele linjeforeningen.{" "}
          </p>
          <p>
            Påmelding til arrangementer skjer både gjennom nettsiden og gjennom
            emils
            <span className="text-[#9DDBAD] text-underscore">
              <a href="https://www.facebook.com/groups/emilntnu/?locale=nb_NO">
                {" "}
                Facebookgruppe
              </a>
            </span>
            . Ved spørsmål angående arrangementer kan man henvende seg til
            arrangør eller hovedstyret.
          </p>
          <p>
            Typen arrangementer som holdes kan være alt fra sosiale
            arrangementer, faglige arrangementer, ekskursjoner og
            bedriftspresentasjoner. Sistnevnte her er det
            <span className="text-[#9DDBAD]"> Emil-Link </span>
            som er ansvarlig for. Uansett hvilket arrangement man skal delta på
            har vi retningslinjer på Emil som må følges uavhengig av hva som
            gjennomføres.
          </p>
        </div>
      </div>
      <SmallTransissionDarkHighligt />
      <div className="w-full ">
        <StickyNavbar
          tags={[
            "Regler",
            "Aktive arrangementer",
            "Lavterskelkalender",
            "Årlige arrangementer",
          ]}
        />
        <SmallTransissionHighlightSPC />
        <div
          id="Regler"
          className="bg-[#225654] flex flex-col items-center justify-center pt-8 px-12"
        >
          <div className="flex justify-center items-center text-2xl font-bold gap-x-3 py-4">
            <p>Arrangementsregler</p>
          </div>
          <div className="flex justify-center items-center max-w-[512px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-4 gap-4 justify-center py-4">
              <NyStudentCard
                title={
                  "Ta imot medstudentene dine med åpent sinn og vis inkluderende atferd"
                }
                icon="1."
              />
              <NyStudentCard
                title={"Behandle dine medstudenter med respekt"}
                icon="2."
              />
              <NyStudentCard
                title={
                  "Vær bevisst på hva som bidrar til press og etterstreb å motvirke det."
                }
                icon="3."
              />
              <NyStudentCard
                title={
                  "Si ifra. Linjeforeningen har nulltrolleranse for trakassering og mobbing."
                }
                icon="4."
              />
              <NyStudentCard
                title={
                  "Ta ansvar for egne handlinger og vær bevisst på hvordan de påvirker andre."
                }
                icon="5."
              />
              <NyStudentCard
                title={
                  "Bidra aktivt til et positivt og støttende fellesskap der alle føler seg velkomne."
                }
                icon="6."
              />
              <NyStudentCard
                title={
                  "Anerkjenn og respekter forskjellige bakgrunner og perspektiver."
                }
                icon="7."
              />
              <NyStudentCard
                title={
                  "Del ideer, bekymringer og tilbakemeldinger på en konstruktiv måte."
                }
                icon="8."
              />
            </div>
          </div>
        </div>
        <SmallTransissionSPCPC />
        <div
          id="Aktive arrangementer"
          className="flex flex-col items-center justify-center py-6 px-12"
        >
          <div className="flex justify-center items-center text-2xl font-bold gap-x-3 py-6">
            <p>Aktive arrangementer</p>
          </div>
          <div className="max-w-[512px] w-full ">
            <p className="pb-4">
              Aktive arrangementer publiseres her og i relevante{" "}
              <span className="text-[#579783] text-underscore">
                <a
                  href="https://www.facebook.com/groups/emilntnu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebookgrupper
                </a>
              </span>
              . Klikk på et arrangement for å lese mer!
            </p>
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-ping h-8 w-8 bg-blue-400 rounded-full"></div>
              </div>
            ) : arrangementer && arrangementer.length > 0 ? (
              <ListView events={arrangementer} />
            ) : (
              <div className="text-center text-lg font-semibold text-white">
                Ingen kommende arrangementer
              </div>
            )}
          </div>
        </div>
        <SmallTransissionPCSPC />
        <div
          id="Lavterskelkalender"
          className="bg-[#225654] flex flex-col items-center justify-center py-6"
        >
          <div className="flex justify-center items-center text-2xl font-bold gap-x-3 py-4 ">
            <p>Lavterskelkalender</p>
          </div>
          <div className="max-w-[512px] w-full pb-6">
            <p className="pb-4 px-12">
              Emil har en lavterskelkalender som kan brukes for å planlegge
              arrangementer og happenings framover i tid. Den skal være
              tilgjengelig for hele Emil og skal kunne brukes av alle. Alle
              tilbud og aktiviteter som skjer på Emil skal kunne legges inn her
              og sees av hele linjen slik at man kan koordinere rundt det. Den
              finnes også i excelformat{" "}
              <span className="text-[#9DDBAD] text-underscore">
                <a
                  href="https://docs.google.com/spreadsheets/d/1NPX4qDA5BDv0QHx1QYmXG62Jl1SCMuAiCBoRrJQH3QQ/edit?gid=1062059690#gid=1062059690"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  her
                </a>
              </span>
              .
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-start ">
              <div className="flex gap-x-2 items-center px-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm lg:text-base">
                  Offentlige arrangementer
                </span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm lg:text-base">Intert arrangement</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm lg:text-base">
                  Eksterne arrangementer
                </span>
              </div>
            </div>
            <Calendar
              locale="nb"
              className="bg-[#225654] text-white p-4 rounded-md flex items-center justify-center flex-col gap-y-4 lg:px-12"
              onClickDay={handleDateClick}
              tileClassName={({ date, view }) => {
                const dateString = date.toDateString();
                const isToday = dateString === new Date().toDateString();

                return view === "month" && isToday
                  ? "bg-[#579783] text-white font-bold border border-white lg:h-[5rem] p-2 flex flex-col justify-center items-center relative"
                  : "hover:bg-slate-400 p-2 border border-white h-[5rem] flex flex-col justify-center items-center relative";
              }}
              tileContent={({ date, view }) => {
                const dateString = date.toDateString();
                const relevantArrangements = allCombinedArrangements.filter(
                  (a) => new Date(a.dato).toDateString() === dateString,
                );

                const arrangementColors = relevantArrangements.map(
                  (arrangement) => {
                    if ("type" in arrangement) {
                      if (arrangement.type === "Internt arrangement") {
                        return "bg-blue-500";
                      } else if (arrangement.type === "Eksternt arrangement") {
                        return "bg-red-500";
                      }
                    }
                    return "bg-yellow-500";
                  },
                );
                return relevantArrangements.length > 0 ? (
                  <div className="w-full flex flex-col justify-end items-center space-y-1">
                    {arrangementColors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 ${color} rounded-full`}
                      ></div>
                    ))}
                  </div>
                ) : null;
              }}
              navigationLabel={({ date, label, locale, view }) => (
                <div className="text-lg w-[150px] flex justify-center flex-shrink-0 font-semibold text-white icon-hover">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </div>
              )}
              next2Label={null}
              prev2Label={null}
              nextLabel={
                <span className="text-white font-bold text-xl">›</span>
              }
              prevLabel={
                <span className="text-white font-bold text-xl">‹</span>
              }
            />

            {selectedDate && (
              <div className="fixed inset-0 bg-[#579783] bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white text-primary rounded-lg shadow-lg px-3 py-6 w-[300px] lg:w-1/3">
                  <h2 className="text-xl font-bold mb-4">
                    {
                      // Format date in norwegian with capital letter
                      format(selectedDate, "EEEE, d MMMM yyyy", { locale: nb })
                        .split(",")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                    }
                  </h2>
                  <EventCalendarView
                    combinedArrangements={combinedArrangements}
                    openForm={openForm}
                    onDeletionSuccess={handleDeletion}
                  />
                  {openForm ? (
                    <div>
                      <LavterskelArrangementForm
                        onSubmit={handleSubmit}
                        onClose={handleCloseForm}
                        selectedDate={new Date(selectedDate)}
                      />
                    </div>
                  ) : (
                    <div className=" w-full flex justify-center lg:justify-start items-center">
                      <button
                        className="mt-6 bg-primary text-sm lg:text-base text-white px-4 py-2 rounded hover:bg-slate-400"
                        onClick={toggleForm}
                      >
                        Legg til arrangement?
                      </button>
                    </div>
                  )}
                  <div className="flex lg:justify-between w-full flex-col lg:flex-row">
                    <button
                      className="mt-6 bg-primary text-sm lg:text-base text-white px-4 py-2 rounded hover:bg-slate-400"
                      onClick={closeModal}
                    >
                      Lukk
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <SmallTransissionSPCPC />
        <div
          id="Årlige arrangementer"
          className="flex flex-col items-center justify-center py-6 gap-y-4"
        >
          <div className="flex justify-center items-center text-2xl font-bold gap-x-3 py-4 px-12">
            <p>Årlige arrangementer</p>
          </div>
          <div className="max-w-[512px] w-full px-12">
            <p className="pb-4">
              Emil har også mange faste arrangementer som går gjennom året. Det
              varierer fra fest og morro til mer seriøse samlinger hvor vi
              diskuterer linjeforeningens drift, mål og andre sentrale spørsmål.
              Under finner du en oversikt.
            </p>
          </div>
          <div className="px-4 lg:px-12">
            <AarligArrangementCard data={AarligarrangementData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForStudentenPage;
