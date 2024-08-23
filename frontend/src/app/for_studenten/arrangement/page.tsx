"use client";

import ListView from "@/components/calendar/listView";
import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button";
import { Arrangement } from "@/schemas/arrangement";
import { fetchArrangementer } from "@/utils/arrangement/arrangement";
import { useEffect, useState } from "react";
import StickyNavbar from "@/components/navbar/stickyNavbar";

const ForStudentenPage = () => {
  const [arrangementer, setArrangementer] = useState<Arrangement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/arrangementer");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setArrangementer(data.arrangementer);
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

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" flex flex-col justify-center w-full gap-y-6 text-white">
      <div className="w-full pt-12 px-12">
        <img
          src="/image/Komiteer/HS/HSfelles.jpg"
          alt="Hovedstyret fellesbilde"
          className="rounded-md object-cover w-full h-[19rem]"
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
        <div className="flex flex-col max-w-[512px] space-y-3 text-sm lg:text-l">
          <p>
            Linjeforeningen arrangerer en rekke ulike arrangementer og disse kan
            være for kun komiteene eller hele linjeforeningen. Ofte arrangerer
            komiteene arrangementer for medlemmene sine, men de kan også
            arrangere for hele linjeforeningen.{" "}
          </p>
          <p>
            Påmelding til arrangementer skjer både gjennom nettsiden og gjennom
            emils
            <span className="text-[#9DDBAD]"> Facebookgruppe</span>. Ved
            spørsmål angående arrangementer kan man henvende seg til arrangør
            eller hovedstyret.
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
      {/* Add small transition in*/}
      <div className="w-full ">
        <StickyNavbar
          tags={[
            "Regler",
            "Aktive arrangementer",
            "Lavterskel kalender",
            "Årlige arrangementer",
          ]}
        />
        {/* Add small transition out */}
        <div id="Regler" className="bg-[#25504E]">
          relger
          {/* Nystudent-card brukes her: trenger titel,description og icon. Icon= 1,2,3,4 -> wrap i <p/> */}
        </div>
        <div id="Aktive arrangementer" className="flex flex-col items-center justify-center py-6">
          <div className="max-w-[512px] w-full">
            <ListView events={arrangementer} />
          </div>
        </div>
        <div id="Lavterskel kalender">
          LT
        </div>
        <div id="Årlige arrangementer">
          Årlig ARR
        </div>
      </div>
    </div>
  );
};

export default ForStudentenPage;
