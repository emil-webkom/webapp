"use client";

import useFetch from "@/hooks/use-fetch";
import { Arrangement, createArrangementSchema } from "@/schemas/arrangement";
import { UserPrisma } from "@/schemas/user";
import { formatTrinn } from "@/utils/arrangement/trinn";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookUser, CalendarIcon, Edit, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { nb } from "date-fns/locale";
import { uploadArrangementImage } from "@/utils/firebase/upload_arrangementImage";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

const TRINN_OPTIONS = [
  { value: 1, label: "1." },
  { value: 2, label: "2." },
  { value: 3, label: "3." },
  { value: 4, label: "4." },
  { value: 5, label: "5." },
];

const ArrangementComponentNew = () => {
  const [events, setEvents] = useState<Arrangement[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Arrangement | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [participants, setParticipants] = useState<UserPrisma[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useFetch<{ data: Arrangement[] }>(
    "/api/arrangementer",
  );

  const form = useForm<z.infer<typeof createArrangementSchema>>({
    resolver: zodResolver(createArrangementSchema),
    defaultValues: {
      navn: "",
      sted: "",
      dato: undefined,
      beskrivelse: "",
      bilde: "",
      kapasitet: 100,
      trinn: [],
    },
  });

  useEffect(() => {
    if (data && data.data) {
      setEvents(data.data);
    }
  }, [data]);

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEditMode(false);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Arrangement) => {
    setSelectedEvent(event);
    setIsEditMode(true);
    setImageFile(null);
    setIsModalOpen(true);

    // Pre-populate form with event data
    form.reset({
      navn: event.navn,
      sted: event.sted,
      dato: new Date(event.dato),
      beskrivelse: event.beskrivelse,
      bilde: event.bilde,
      kapasitet: event.kapasitet,
      trinn: event.trinn,
    });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const onSubmit = async (values: z.infer<typeof createArrangementSchema>) => {
    console.log("onSubmit function called with values:", values);
    setIsSubmitting(true);
    let imageUrl = values.bilde || "";

    if (imageFile) {
      try {
        console.log("Uploading image...");
        imageUrl = await uploadArrangementImage(imageFile);
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsSubmitting(false);
        return;
      }
    }

    console.log("Preparing form data to send...");
    const formData = {
      ...values,
      bilde: imageUrl,
    };
    console.log("Form data prepared:", formData);

    try {
      let response;
      if (isEditMode && selectedEvent) {
        // Update existing event
        response = await fetch(`/api/arrangementer/${selectedEvent.id}`, {
          method: "PUT", // or "PATCH" depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new event
        response = await fetch("/api/arrangementer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${JSON.stringify(responseData)}`);
      }

      // Reset form and close modal
      form.reset();
      setImageFile(null);
      setImagePreview(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx p-4">
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
              {event.dato && !isNaN(new Date(event.dato).getTime())
                ? format(new Date(event.dato), "PPP", { locale: nb })
                : "Invalid date"}
            </div>
            <div className="col-span-1">{event.sted}</div>
            <div className="col-span-1 truncate">{event.beskrivelse}</div>
            <div className="col-span-1 truncate">{event.bilde}</div>
            <div className="col-span-1">{formatTrinn(event.trinn)}</div>
            <div className="col-span-2 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleParticipants(event.id)}
              >
                <BookUser className="mr-2 h-4 w-4" />
                {`${event.paameldinger?.length || 0}/${event.kapasitet}`}
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
          <div className="">
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                (data) => {
                  console.log("Form is valid. Submitting with data:", data);
                  onSubmit(data);
                },
                (errors) => {
                  console.log("Form has errors:", errors);
                },
              )}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="navn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Navn på arrangementet</FormLabel>
                    <Input {...field} type="text" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dato"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Dato</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal text-black",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: nb })
                            ) : (
                              <span>Velg en dato</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sted</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beskrivelse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beskrivelse</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bilde"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last opp et bilde</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange(
                            e.target.files ? e.target.files[0].name : "",
                          );
                        }}
                      />
                    </FormControl>
                    {imagePreview && (
                      <div className="mt-2 max-w-[200px] max-h-[200px] overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kapasitet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapasitet</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      value={field.value == null ? "" : field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : parseInt(value, 10),
                        );
                      }}
                    />
                    <FormDescription>
                      Hvis det ikke er noe maksgrense på antall påmeldinger, lar
                      du dette feltet stå tomt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trinn"
                render={() => (
                  <FormItem>
                    <FormLabel>Trinn</FormLabel>
                    <div className="flex flex-wrap items-center gap-6">
                      {TRINN_OPTIONS.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="trinn"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      option.value,
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            option.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== option.value,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                    "cursor-pointer", // Make the label clickable
                                  )}
                                >
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Sender..."
                  : isEditMode
                    ? "Oppdater arrangement"
                    : "Opprett arrangement"}
              </Button>
            </form>
          </Form>
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
};

export default ArrangementComponentNew;
