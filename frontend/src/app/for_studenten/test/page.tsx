"use server";

import { db } from "@/lib/db";
import { EventTable } from "@/components/event/event-table";
import { Arrangement } from "@/schemas/arrangement";
import { auth } from "@/lib/auth";

export default async function EventPage() {
  const response = await fetch("http://localhost:3000/api/arrangementer");
  const events: Arrangement[] = await response.json();

  const session = await auth();
  const currentUser = session?.user;

  return (
    <div className="container mx-auto py-10">
      <EventTable data={events} currentUser={currentUser} />
    </div>
  );
}
