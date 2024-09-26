"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookUser, Edit, Trash2, Upload, X } from "lucide-react";
import { formatDate } from "date-fns";
import { nb } from "date-fns/locale";
import useFetch from "@/hooks/use-fetch";
import { Arrangement } from "@/schemas/arrangement";
import { formatTrinn } from "@/utils/arrangement/trinn";
import { UserPrisma } from "@/schemas/user";
import { uploadArrangementImage } from "@/utils/firebase/upload_arrangementImage";

export default function EventDashboard() {
  const [events, setEvents] = useState<Arrangement[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Arrangement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [selectedTrinn, setSelectedTrinn] = useState<number[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [participants, setParticipants] = useState<UserPrisma[]>([]);

  const { data, loading, error } = useFetch<{ data: Arrangement[] }>(
    "/api/arrangementer",
  );

  useEffect(() => {
    if (data && data.data) {
      setEvents(data.data);
    }
  }, [data]);

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEditMode(false);
    setSelectedTrinn([]);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Arrangement) => {
    setSelectedEvent(event);
    setIsEditMode(true);
    setSelectedTrinn(event.trinn);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/arrangementer/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    setDeleteConfirmOpen(false);
    setEventToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let imageUrl = selectedEvent?.bilde || "";

    if (imageFile) {
      try {
        imageUrl = await uploadArrangementImage(imageFile);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const eventData = {
      navn: formData.get("navn") as string,
      dato: new Date(formData.get("dato") as string),
      sted: formData.get("sted") as string,
      beskrivelse: formData.get("beskrivelse") as string,
      bilde: imageUrl || undefined,
      trinn: selectedTrinn,
      kapasitet: formData.get("kapasitet")
        ? Number(formData.get("kapasitet"))
        : undefined,
      arrangorID: selectedEvent?.arrangorID || "default-arranger-id", // Replace with actual default or logged-in user ID
    };

    try {
      const url = isEditMode
        ? `/api/arrangementer/${selectedEvent?.id}`
        : "/api/arrangementer";
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        if (isEditMode) {
          setEvents(
            events.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event,
            ),
          );
        } else {
          setEvents([...events, updatedEvent]);
        }
        setIsModalOpen(false);
        setImageFile(null);
      } else {
        console.error("Failed to save event");
        // Optionally, you can show an error message to the user here
      }
    } catch (error) {
      console.error("Error saving event:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  const toggleParticipants = async (id: string) => {
    if (currentEventId === id) {
      setCurrentEventId(null);
      setParticipants([]);
    } else {
      setCurrentEventId(id);
      try {
        const response = await fetch(`/api/arrangementer/${id}/users`);
        if (response.ok) {
          const data = await response.json();
          setParticipants(data);
        } else {
          console.error("Failed to fetch participants");
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    }
  };

  const handleTrinnChange = (trinn: number) => {
    setSelectedTrinn((prev) =>
      prev.includes(trinn)
        ? prev.filter((t) => t !== trinn)
        : [...prev, trinn].sort(),
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDeleteSignup = async (eventId: string, userId: string) => {
    try {
      const response = await fetch(`/api/arrangementer/${eventId}/paamelding`, {
        method: "DELETE",
        body: JSON.stringify({
          userId,
        }),
      });
      if (response.ok) {
        setParticipants(participants.filter((p) => p.id !== userId));
      } else {
        console.error("Failed to delete signup");
      }
    } catch (error) {
      console.error("Error deleting signup:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Arrangementer</h1>
        <Button onClick={handleCreateEvent}>Lag nytt arrangement</Button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 gap-4 p-4 bg-[#AEE0D0] font-semibold">
          <div className="col-span-1">Navn</div>
          <div className="col-span-1">Dato</div>
          <div className="col-span-1">Sted</div>
          <div className="col-span-1">Beskrivelse</div>
          <div className="col-span-1">Bilde</div>
          <div className="col-span-1">Trinn</div>
          <div className="col-span-2">Handlinger</div>
        </div>

        {events.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-8 gap-4 p-4 border-b items-center"
          >
            <div className="col-span-1">{event.navn}</div>
            <div className="col-span-1">
              {formatDate(new Date(event.dato), "PPP", { locale: nb })}
            </div>
            <div className="col-span-1">{event.sted}</div>
            <div className="col-span-1 truncate">{event.beskrivelse}</div>
            <div className="col-span-1">{event.bilde}</div>
            <div className="col-span-1">{formatTrinn(event.trinn)}</div>
            <div className="col-span-2 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleParticipants(event.id)}
              >
                <BookUser className="mr-2 h-4 w-4" />
                {`${event.paameldinger.length}/${event.kapasitet}`}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditEvent(event)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEventToDelete(event.id);
                  setDeleteConfirmOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={currentEventId !== null}
        onOpenChange={() => setCurrentEventId(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Påmeldte deltakere</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Navn</th>
                  <th className="p-2 text-left">Kontigent</th>
                  <th className="p-2 text-left">Rolle</th>
                  <th className="p-2 text-left">Handling</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.kontigent}</td>
                    <td className="p-2">{p.role}</td>
                    <td className="p-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          currentEventId &&
                          handleDeleteSignup(currentEventId, p.id)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button onClick={() => setCurrentEventId(null)}>Lukk</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Rediger arrangement" : "Lag nytt arrangement"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="navn"
              placeholder="Navn på arrangement"
              defaultValue={selectedEvent?.navn}
            />
            <Input
              name="dato"
              type="date"
              defaultValue={
                selectedEvent?.dato
                  ? new Date(selectedEvent.dato).toISOString().split("T")[0]
                  : ""
              }
            />
            <Input
              name="sted"
              placeholder="Sted"
              defaultValue={selectedEvent?.sted}
            />
            <Textarea
              name="beskrivelse"
              placeholder="Beskrivelse"
              defaultValue={selectedEvent?.beskrivelse}
            />
            <div>
              <Label htmlFor="image-upload">Bilde</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Last opp bilde
                </Button>
                {imageFile && <span>{imageFile.name}</span>}
                {!imageFile && selectedEvent?.bilde && (
                  <span>Existing image</span>
                )}
              </div>
            </div>
            <div>
              <Label>Trinn</Label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((trinn) => (
                  <div key={trinn} className="flex items-center space-x-2">
                    <Checkbox
                      id={`trinn-${trinn}`}
                      checked={selectedTrinn.includes(trinn)}
                      onCheckedChange={() => handleTrinnChange(trinn)}
                    />
                    <Label htmlFor={`trinn-${trinn}`}>{trinn}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Input
              name="kapasitet"
              type="number"
              placeholder="Kapasitet"
              defaultValue={selectedEvent?.kapasitet}
            />
            <Button type="submit">
              {isEditMode ? "Oppdater arrangement" : "Lag arrangement"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bekreft sletting</DialogTitle>
            <DialogDescription>
              Er du sikker på at du vil slette dette arrangementet? Denne
              handlingen kan ikke angres.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Avbryt
            </Button>
            <Button
              variant="destructive"
              onClick={() => eventToDelete && handleDeleteEvent(eventToDelete)}
            >
              Slett
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
