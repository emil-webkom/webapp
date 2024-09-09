'use client';

import { getUserByEmail } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserPrisma } from "@/schemas/user";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Kontigent } from "@prisma/client";
import { Span } from "next/dist/trace";
import { updateKontigent } from "@/utils/actions/updateProfile";
import { getKontigent } from "@/utils/actions/getkontigent";
import { kontigentPris } from "@/schemas/kontigentPris";

enum kontigenStatus {
  AVVENTER_BEKREFTELSE = 'AVVENTER_BEKREFTELSE',
  UBETALT = 'UBETALT',
  BETALT = 'BETALT',
}


const KontigentView = () => {
  const user = useCurrentUser();
  const [status, setStatus] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<kontigenStatus | null>(null);
  const [kontigentpris,setKontigentpris] = useState<kontigentPris>()

  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (user?.email) {
        try {
          const fetchedUser = await getUserByEmail(user.email);
          const fetchedKontigentPris = await getKontigent();
          console.log(fetchedKontigentPris);
          if (fetchedKontigentPris.success && fetchedKontigentPris.data) {
            setKontigentpris(fetchedKontigentPris.data[0]); 
          }
          if (fetchedUser) {
            setStatus(fetchedUser.kontigent);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        console.error("No valid session or email found");
      }
    };
    fetchAndSetUser();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assume you update the status via an API call or something similar
    if (newStatus && user?.email && status === kontigenStatus.UBETALT) {
      try {
        const result = await updateKontigent(user.email, {
          kontigent:newStatus,
        });
        if (result.success) {
          setStatus(newStatus);
        }
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <p>Kontigent</p>
      <div className="w-full flex items-center justify-center">
        <div className="w-full rounded-md bg-[#225654] px-4 py-8">
          <p>
            I hendhold til vedtektene skal alle som ønsker å være medlem i emil betale en medlemskontigent.
          <br />
          <br />
            Denne kontigenten kan i følge vedtektene vedtatt på generalforsamling variere avhengig av økonomien til linjeforeningen.
            Kontigenten er et engangsbeløp og har historisk ligget på mellom 25,- og 50,- NOK, og må betales for å kunne delta i linjeforeningen.
            For <span className="underline">{kontigentpris?.aar}</span > ligger beløpet på <span className="underline">{kontigentpris?.pris}</span>,- NOK.
          </p>
          <br />
          <p>
            Beløpet kan vippses til <span className="text-[#9DDBAD] underline">11101</span> eller så kan man kontakte fut for alternative betalingsmetoder.
            Etter du har betalt kontigent kan status under settes til AVVENTER_BEKREFTELSE før styret vil bekrefte at kontigent har blitt betalt og status blir BETALT.
          </p>
        </div>
      </div>

      {/* Display status */}
      <div className="w-full mt-6 text-center">
        <p>Din nåværende kontigentstatus: <strong>{status===Kontigent.BETALT?(
          <span className="text-[#9DDBAD]">{status}</span>
        ):(
          <span>{status}</span>
        )}</strong></p>
      </div>

      {/* Conditionally render the form if status is UBETALT */}
      {status === kontigenStatus.UBETALT && (
        <div className="w-full mt-4 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-y-4 lg:flex-row lg:space-x-4">
            <select
              id="status"
              name="status"
              value={newStatus || ''}
              onChange={(e) => setNewStatus(e.target.value as kontigenStatus)}
              className="border-gray-300 text-primary rounded-md shadow-sm"
            >
              <option value="">Status</option>
              <option value={kontigenStatus.AVVENTER_BEKREFTELSE}>
              {kontigenStatus.AVVENTER_BEKREFTELSE}
              </option>
              <option value={kontigenStatus.UBETALT}>
              {kontigenStatus.UBETALT}
              </option>
            </select>

            <Button
            type="submit">
              Oppdater status
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default KontigentView;
