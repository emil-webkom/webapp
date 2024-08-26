"use client";

import useFetch from "@/hooks/use-fetch";
import { Arrangement } from "@/schemas/arrangement";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const ArrangementPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { data } = useFetch<Arrangement>(`/api/arrangementer/${id}`);
  const user = useCurrentUser();

  const onClick = async () => {
    if (!user) {
      alert("You need to be logged in to sign up for the event.");
      return;
    }
    try {
      const response = await fetch(`/api/arrangementer/${id}/paamelding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: user.id }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to sign up for the event.");
      }

      alert("Successfully signed up for the event!");
    } catch (error) {
      alert(error);
    }
  };

  return (
      <div className="w-full p-6 text-white flex flex-col gap-y-4">
        <div className="h-1/2 flex justify-center items-center">
          <img src={data?.bilde} alt="Arrangementsbilde" className=" w-full h-[15rem] object-cover rounded-md"/>
        </div>
        <div className="">
          <h1 className="font-bold text-2xl border-b-2 border-[#9DDBAD]">
            {data?.navn}
            </h1>
          </div>
        <div className="flex w-full justify-between ">
          <div className="w-[50%] flex items-center justify-center text-sm lg:text-base">{data?.beskrivelse}</div>
          <div className="w-[50%]">
            <div className=" px-4 flex flex-col justify-start gap-y-2">
              <div>
              <h3 className="font-bold text-lg">Hvor?</h3>
              <p className="text-sm lg:text-base">{data?.sted}</p>
              </div>
              <div>
              <h3 className="font-bold text-lg">Når?</h3>
              <p className="text-sm lg:text-base">{data?.dato?.toString().replace("T", " ")}</p>
              </div>
              <div>
              <h3 className="font-bold text-lg">Hvem?</h3>
              <p className="text-sm lg:text-base">{data?.trinn}. trinn</p>
              </div>
              <div>
              <h3 className="font-bold text-lg">Spesielle bemerkelser?</h3>
              <p className="text-sm lg:text-base">Tilgjengelige plasser: {data?.kapasitet}</p>
              </div>
            <Button onClick={onClick}>Meld deg på</Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArrangementPage;
