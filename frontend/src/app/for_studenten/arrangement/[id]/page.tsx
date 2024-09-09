"use client";

import useFetch from "@/hooks/use-fetch";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Arrangement } from "@/schemas/arrangement";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { startTransition, useEffect, useState, useTransition } from "react";
import { signUpForEvent } from "@/utils/actions/signUpForEvent";
import { toast } from "@/components/ui/use-toast";
import { formatTrinn } from "@/utils/trinnFormatter";
import { cancelEvent } from "@/utils/actions/cancelEvent";
import { checkSignUpStatus } from "@/utils/actions/checkSignUpStatus";

const ArrangementPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = useCurrentUser();
  const userID = user?.id;
  const { data } = useFetch<Arrangement>(`/api/arrangementer/${id}`);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const fetchSignUpStatus = async () => {
      setLoading(true);
      const status = await checkSignUpStatus(id, userID!!);
      setIsSignedUp(status.isSignedUp);
      setLoading(false);
    };

    fetchSignUpStatus();
  }, [id, userID]);

  const handleSignUp = async () => {
    setLoading(true);
    startTransition(() => {
      signUpForEvent(id, userID).then((data) => {
        // signUpForEvent is an action
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Noe gikk galt.",
            description: `${data.error}`,
          });
        } else if (data?.success) {
          toast({
            variant: "default",
            title: "Suksess!",
            description: `${data.success}`,
          });
          setIsSignedUp(true);
        }
        setLoading(false);
      });
    });
  };

  const handleCancel = async () => {
    setLoading(true);
    startTransition(() => {
      cancelEvent(id, userID).then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Noe gikk galt.",
            description: `${data.error}`,
          });
        } else if (data?.success) {
          toast({
            variant: "default",
            title: "Suksess!",
            description: `${data.success}`,
          });
          setIsSignedUp(false);
        }
        setLoading(false);
      });
    });
  };

  return (
    <div className="w-full p-6 text-white flex flex-col gap-y-4">
      <div className="h-1/2 flex justify-center items-center">
        <img
          src={data?.bilde}
          alt="Arrangementsbilde"
          className=" w-full h-[15rem] object-cover rounded-md"
        />
      </div>
      <div className="">
        <h1 className="font-bold text-2xl border-b-2 border-green-lightest">
          {data?.navn}
        </h1>
      </div>
      <div className="flex w-full justify-between ">
        <div className="w-[50%] flex items-center justify-center text-sm lg:text-base">
          {data?.beskrivelse}
        </div>
        <div className="w-[50%]">
          <div className=" px-4 flex flex-col justify-start gap-y-2">
            <div>
              <h3 className="font-bold text-lg">Hvor</h3>
              <p className="text-sm lg:text-base">{data?.sted}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Når</h3>
              <p className="text-sm lg:text-base">
                {data?.dato &&
                  format(new Date(data.dato), "PPP", { locale: nb })}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Hvem</h3>
              <p className="text-sm lg:text-base">
                {data?.trinn
                  ? formatTrinn({ trinn: data.trinn })
                  : "Alle trinn"}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Spesielle bemerkelser</h3>
              <p className="text-sm lg:text-base">
                Tilgjengelige plasser: {data?.kapasitet}
              </p>
            </div>
            {isSignedUp ? (
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={loading}
              >
                Meld deg av
              </Button>
            ) : (
              <Button onClick={handleSignUp} disabled={loading}>
                Meld deg på
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementPage;
