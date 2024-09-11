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
import TextLink from "@/components/ui/textLink";
import HeaderText from "@/components/ForStudenten/nyStudent/headerText";
import HeaderImage from "@/components/ForStudenten/headerImage";
import { Ticket } from "lucide-react";

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
      console.log(dataLTA.data);
      const combined = [...dataA.data, ...dataLTA.data];
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
      <div className="flex flex-col justify-center items-center p-12 space-y-6">
        <HeaderImage
          src={"/image/arrangement/Arrangement.jpg"}
          alt={"Arrangement forsidebilde"}
          backgroundPos="0% 20%"
        />
        <HeaderText className="flex text-3xl flex-row justify-center items-center gap-2">
          Arrangementer <Ticket className="text-green-lightest" />
        </HeaderText>
        <div className="text-white font-normal max-w-lg pt-4 space-y-4">
          <p>
            Linjeforeningen arrangerer en rekke ulike arrangementer og disse kan
            være for kun komiteene eller hele linjeforeningen. Ofte arrangerer
            komiteene arrangementer for medlemmene sine, men de kan også
            arrangere for hele linjeforeningen.{" "}
          </p>
          <p>
            Påmelding til arrangementer skjer både gjennom nettsiden og gjennom
            emils{" "}
            <TextLink
              href={"https://www.facebook.com/groups/emilntnu/?locale=nb_NO"}
            >
              facebookgruppe
            </TextLink>
            . Ved spørsmål angående arrangementer kan man henvende seg til
            arrangør eller hovedstyret.
          </p>
          <p>
            Typen arrangementer som holdes kan være alt fra sosiale
            arrangementer, faglige arrangementer, ekskursjoner og
            bedriftspresentasjoner. Sistnevnte her er det{" "}
            <TextLink href="https://www.emil-link.no/">EMIL-Link</TextLink> som
            er ansvarlig for. Uansett hvilket arrangement man skal delta på har
            vi retningslinjer på EMIL som må følges uavhengig av hva som
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
          className="bg-green-mid flex flex-col items-center justify-center py-10 px-12"
        >
          <HeaderText className="mb-6">Arrangementsregler</HeaderText>
          <div className="flex justify-center items-center">
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
          className="flex flex-col items-center justify-center py-10 px-12"
        >
          <HeaderText className="mb-2">Aktive arrangementer</HeaderText>
          <div className="max-w-[512px] w-full ">
            <p className="pb-6 text-center">
              Aktive arrangementer publiseres her og i relevante{" "}
              <TextLink href="https://www.facebook.com/groups/emilntnu">
                facebookgrupper
              </TextLink>
              . <span>Klikk på et arrangement for å lese mer!</span>
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
          className="bg-green-mid flex flex-col items-center justify-center py-10 px-12"
        >
          <HeaderText className="mb-4">Lavterskekalender</HeaderText>
          <div className="max-w-lg w-full mb-6">
            <p className="">
              EMIL har en lavterskelkalender som kan brukes for å planlegge
              arrangementer og happenings framover i tid. Den skal være
              tilgjengelig for hele EMIL og skal kunne brukes av alle. Alle
              tilbud og aktiviteter som skjer på EMIL skal kunne legges inn her
              og sees av hele linjen slik at man kan koordinere rundt det. Den
              finnes også i{" "}
              <TextLink href="https://docs.google.com/spreadsheets/d/1NPX4qDA5BDv0QHx1QYmXG62Jl1SCMuAiCBoRrJQH3QQ/edit?gid=1062059690#gid=1062059690">
                excelformat
              </TextLink>
              .
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-start flex-wrap">
              <div className="flex w-full justify-center flex-wrap gap-x-2 gap-y-2 items-center px-4 ">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs sm:text-sm lg:text-base">
                  Bedpress
                </span>

                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs sm:text-sm lg:text-base">
                  Offentlige arrangementer
                </span>

                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs sm:text-sm lg:text-base">
                  Intert arrangement
                </span>

                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs sm:text-sm lg:text-base">
                  Eksterne arrangementer
                </span>
              </div>
            </div>

            <Calendar
              locale="nb"
              className="bg-green-mid text-white rounded-md flex items-center justify-center flex-col gap-y-4 lg:px-12"
              onClickDay={handleDateClick}
              tileClassName={({ date, view }) => {
                const dateString = date.toDateString();
                const isToday = dateString === new Date().toDateString();

                return view === "month" && isToday
                  ? "bg-green-light text-white font-bold border border-white lg:h-[5rem] p-2 flex flex-col justify-center items-center relative"
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
                      } else if (arrangement.type === "Bedpress") {
                        return "bg-green-500";
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
              <div className="fixed inset-0 bg-green-light bg-opacity-30 flex items-center justify-center z-50">
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
          className="flex flex-col items-center justify-center py-10"
        >
          <HeaderText className="mb-4">Årlige arrangementer</HeaderText>
          <div className="max-w-lg w-full px-12">
            <p className="mb-6">
              EMIL har også mange faste arrangementer som går gjennom året. Det
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
