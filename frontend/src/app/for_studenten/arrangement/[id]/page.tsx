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
    <>
      <div>
        <h1>Navn: {data?.navn}</h1>
        <p>Sted: {data?.sted}</p>
        <p>Beskrivelse: {data?.beskrivelse}</p>
        <p>Trinn: {data?.trinn}</p>
      </div>
      <Button onClick={onClick}>Meld deg på</Button>
    </>
  );
};

export default ArrangementPage;
