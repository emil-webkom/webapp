// "use client";

// import useFetch from "@/hooks/use-fetch";
// import { Arrangement } from "@/schemas/arrangement";
// import { formatTrinn } from "@/utils/arrangement/trinn";

// import { formatDate } from "date-fns";
// import { nb } from "date-fns/locale";
// import { useState, useEffect } from "react";
// import { Button } from "../ui/button";
// import { BookUser } from "lucide-react";

// const ArrangementComponent = () => {
//   // const [openForm, setOpenForm] = useState<boolean>(false);
//   const { data, loading, error } = useFetch<{
//     data: Arrangement[];
//   } | null>("/api/arrangementer");

//   const [AData, setAData] = useState<Arrangement[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (data && data.data) {
//       setAData(data.data);
//     }
//   }, [data]);

//   const handleClick = () => {
//     try {
//     } catch (error) {}
//   };

//   return (
//     <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
//       <div className="w-full px-4 lg:px-8">
//         <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
//           Arrangementer
//         </h1>
//       </div>

//       <div className="flex flex-col w-full p-4 ">
//         <div className="flex bg-[#AEE0D0] rounded-md p-2">
//           <div className="w-[30%] font-semibold">Navn</div>
//           <div className="w-[30%] font-semibold">Dato</div>
//           <div className="w-[30%] font-semibold">Sted</div>
//           <div className="w-[30%] font-semibold">Beskrivelse</div>
//           <div className="w-[30%] font-semibold">Bilde</div>
//           <div className="w-[30%] font-semibold">Trinn</div>
//           <div className="w-[30%] font-semibold">Påmeldinger</div>
//         </div>

//         {AData.map((item) => (
//           <div
//             key={item.id}
//             className="flex w-full border-b-2 border-[#25504E] p-2"
//           >
//             <div className="w-[30%] flex items-center">{item.navn}</div>
//             <div className="w-[30%] flex items-center">{`${formatDate(
//               new Date(item.dato),
//               "PPP",
//               { locale: nb }
//             )}`}</div>
//             <div className="w-[30%] flex items-center">{item.sted}</div>
//             <div className="w-[30%] flex items-center truncate">
//               {item.beskrivelse}
//             </div>
//             <div className="w-[30%] flex items-center">{item.bilde}</div>
//             <div className="w-[30%] flex items-center">{`${formatTrinn(
//               item.trinn
//             )}`}</div>
//             <div className="w-[30%] flex items-center">
//               {`12/${item.kapasitet}`}{" "}
//               <Button variant="ghost" onClick={() => {}}>
//                 <BookUser />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArrangementComponent;

// VERSION 2

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { BookUser, Edit, Trash2 } from "lucide-react";
// import { formatDate } from "date-fns";
// import { nb } from "date-fns/locale";
// import useFetch from "@/hooks/use-fetch";
// import { Arrangement } from "@/schemas/arrangement";
// import { formatTrinn } from "@/utils/arrangement/trinn";

// export default function EventDashboard() {
//   const [events, setEvents] = useState<Arrangement[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<Arrangement | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showParticipants, setShowParticipants] = useState<string | null>(null);

//   const { data, loading, error } = useFetch<{ data: Arrangement[] }>(
//     "/api/arrangementer"
//   );

//   useEffect(() => {
//     if (data && data.data) {
//       setEvents(data.data);
//     }
//   }, [data]);

//   const handleCreateEvent = () => {
//     setSelectedEvent(null);
//     setIsEditMode(false);
//     setIsModalOpen(true);
//   };

//   const handleEditEvent = (event: Arrangement) => {
//     setSelectedEvent(event);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleDeleteEvent = async (id: string) => {
//     if (confirm("Er du sikker på at du vil slette dette arrangementet?")) {
//       try {
//         const response = await fetch(`/api/arrangementer/${id}`, {
//           method: "DELETE",
//         });
//         if (response.ok) {
//           setEvents(events.filter((event) => event.id !== id));
//         } else {
//           console.error("Failed to delete event");
//         }
//       } catch (error) {
//         console.error("Error deleting event:", error);
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const eventData = Object.fromEntries(formData);

//     try {
//       const url = isEditMode
//         ? `/api/arrangementer/${selectedEvent?.id}`
//         : "/api/arrangementer";
//       const method = isEditMode ? "PUT" : "POST";
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         const updatedEvent = await response.json();
//         if (isEditMode) {
//           setEvents(
//             events.map((event) =>
//               event.id === updatedEvent.id ? updatedEvent : event
//             )
//           );
//         } else {
//           setEvents([...events, updatedEvent]);
//         }
//         setIsModalOpen(false);
//       } else {
//         console.error("Failed to save event");
//       }
//     } catch (error) {
//       console.error("Error saving event:", error);
//     }
//   };

//   const toggleParticipants = (id: string) => {
//     setShowParticipants(showParticipants === id ? null : id);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Arrangementer</h1>
//         <Button onClick={handleCreateEvent}>Lag nytt arrangement</Button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="grid grid-cols-7 gap-4 p-4 bg-[#AEE0D0] font-semibold">
//           <div>Navn</div>
//           <div>Dato</div>
//           <div>Sted</div>
//           <div className="truncate">Beskrivelse</div>
//           <div>Bilde</div>
//           <div>Trinn</div>
//           <div>Handlinger</div>
//         </div>

//         {events.map((event) => (
//           <div key={event.id} className="grid grid-cols-7 gap-4 p-4 border-b">
//             <div>{event.navn}</div>
//             <div>{formatDate(new Date(event.dato), "PPP", { locale: nb })}</div>
//             <div>{event.sted}</div>
//             <div className="truncate">{event.beskrivelse}</div>
//             <div>{event.bilde}</div>
//             <div>{formatTrinn(event.trinn)}</div>
//             <div className="flex space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => toggleParticipants(event.id)}
//               >
//                 <BookUser className="mr-2 h-4 w-4" />
//                 {`${event.paameldinger.length}/${event.kapasitet}`}
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleEditEvent(event)}
//               >
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleDeleteEvent(event.id)}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showParticipants !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Påmeldte</h2>
//             <ul>
//               <li>User 1</li>
//               <li>User 2</li>
//               <li>User 3</li>
//             </ul>
//             <Button onClick={() => setShowParticipants(null)} className="mt-4">
//               Lukk
//             </Button>
//           </div>
//         </div>
//       )}

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {isEditMode ? "Edit Event" : "Create New Event"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="navn"
//               placeholder="Navn på arrangement"
//               defaultValue={selectedEvent?.navn}
//             />
//             <Input
//               name="dato"
//               type="date"
//               defaultValue={
//                 selectedEvent?.dato
//                   ? new Date(selectedEvent.dato).toISOString().split("T")[0]
//                   : ""
//               }
//             />
//             <Input
//               name="sted"
//               placeholder="Sted"
//               defaultValue={selectedEvent?.sted}
//             />
//             <Textarea
//               name="beskrivelse"
//               placeholder="Beskrivelse"
//               defaultValue={selectedEvent?.beskrivelse}
//             />
//             <Input
//               name="bilde"
//               placeholder="Bilde URL"
//               defaultValue={selectedEvent?.bilde}
//             />
//             <Input
//               name="trinn"
//               placeholder="Trinn"
//               defaultValue={selectedEvent?.trinn.join(",")}
//             />
//             <Input
//               name="kapasitet"
//               type="number"
//               placeholder="Kapasitet"
//               defaultValue={selectedEvent?.kapasitet}
//             />
//             <Button type="submit">
//               {isEditMode ? "Oppdater arrangement" : "Lag arrangement"}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { BookUser, Edit, Trash2, Upload } from "lucide-react";
// import { formatDate } from "date-fns";
// import { nb } from "date-fns/locale";
// import useFetch from "@/hooks/use-fetch";
// import { Arrangement } from "@/schemas/arrangement";
// import { formatTrinn } from "@/utils/arrangement/trinn";

// export default function EventDashboard() {
//   const [events, setEvents] = useState<Arrangement[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<Arrangement | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showParticipants, setShowParticipants] = useState<string | null>(null);
//   const [selectedTrinn, setSelectedTrinn] = useState<number[]>([]);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState<string | null>(null);

//   const { data, loading, error } = useFetch<{ data: Arrangement[] }>(
//     "/api/arrangementer"
//   );

//   useEffect(() => {
//     if (data && data.data) {
//       setEvents(data.data);
//     }
//   }, [data]);

//   const handleCreateEvent = () => {
//     setSelectedEvent(null);
//     setIsEditMode(false);
//     setSelectedTrinn([]);
//     setImageFile(null);
//     setIsModalOpen(true);
//   };

//   const handleEditEvent = (event: Arrangement) => {
//     setSelectedEvent(event);
//     setIsEditMode(true);
//     setSelectedTrinn(event.trinn);
//     setImageFile(null);
//     setIsModalOpen(true);
//   };

//   const handleDeleteEvent = async (id: string) => {
//     try {
//       const response = await fetch(`/api/arrangementer/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setEvents(events.filter((event) => event.id !== id));
//       } else {
//         console.error("Failed to delete event");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//     setDeleteConfirmOpen(false);
//     setEventToDelete(null);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     formData.set("trinn", selectedTrinn.join(","));

//     if (imageFile) {
//       formData.set("bilde", imageFile);
//     }

//     try {
//       const url = isEditMode
//         ? `/api/arrangementer/${selectedEvent?.id}`
//         : "/api/arrangementer";
//       const method = isEditMode ? "PUT" : "POST";
//       const response = await fetch(url, {
//         method,
//         body: formData,
//       });

//       if (response.ok) {
//         const updatedEvent = await response.json();
//         if (isEditMode) {
//           setEvents(
//             events.map((event) =>
//               event.id === updatedEvent.id ? updatedEvent : event
//             )
//           );
//         } else {
//           setEvents([...events, updatedEvent]);
//         }
//         setIsModalOpen(false);
//       } else {
//         console.error("Failed to save event");
//       }
//     } catch (error) {
//       console.error("Error saving event:", error);
//     }
//   };

//   const toggleParticipants = (id: string) => {
//     setShowParticipants(showParticipants === id ? null : id);
//   };

//   const handleTrinnChange = (trinn: number) => {
//     setSelectedTrinn((prev) =>
//       prev.includes(trinn)
//         ? prev.filter((t) => t !== trinn)
//         : [...prev, trinn].sort()
//     );
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Arrangementer</h1>
//         <Button onClick={handleCreateEvent}>Lag nytt arrangement</Button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="grid grid-cols-8 gap-4 p-4 bg-[#AEE0D0] font-semibold">
//           <div className="col-span-1">Navn</div>
//           <div className="col-span-1">Dato</div>
//           <div className="col-span-1">Sted</div>
//           <div className="col-span-1">Beskrivelse</div>
//           <div className="col-span-1">Bilde</div>
//           <div className="col-span-1">Trinn</div>
//           <div className="col-span-2">Handlinger</div>
//         </div>

//         {events.map((event) => (
//           <div
//             key={event.id}
//             className="grid grid-cols-8 gap-4 p-4 border-b items-center"
//           >
//             <div className="col-span-1">{event.navn}</div>
//             <div className="col-span-1">
//               {formatDate(new Date(event.dato), "PPP", { locale: nb })}
//             </div>
//             <div className="col-span-1">{event.sted}</div>
//             <div className="col-span-1 truncate">{event.beskrivelse}</div>
//             <div className="col-span-1">{event.bilde}</div>
//             <div className="col-span-1">{formatTrinn(event.trinn)}</div>
//             <div className="col-span-2 flex space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => toggleParticipants(event.id)}
//               >
//                 <BookUser className="mr-2 h-4 w-4" />
//                 {`${event.paameldinger.length}/${event.kapasitet}`}
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleEditEvent(event)}
//               >
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   setEventToDelete(event.id);
//                   setDeleteConfirmOpen(true);
//                 }}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showParticipants !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Påmeldte</h2>
//             <ul>
//               <li>User 1</li>
//               <li>User 2</li>
//               <li>User 3</li>
//             </ul>
//             <Button onClick={() => setShowParticipants(null)} className="mt-4">
//               Lukk
//             </Button>
//           </div>
//         </div>
//       )}

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {isEditMode ? "Rediger arrangement" : "Lag nytt arrangement"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="navn"
//               placeholder="Navn på arrangement"
//               defaultValue={selectedEvent?.navn}
//             />
//             <Input
//               name="dato"
//               type="date"
//               defaultValue={
//                 selectedEvent?.dato
//                   ? new Date(selectedEvent.dato).toISOString().split("T")[0]
//                   : ""
//               }
//             />
//             <Input
//               name="sted"
//               placeholder="Sted"
//               defaultValue={selectedEvent?.sted}
//             />
//             <Textarea
//               name="beskrivelse"
//               placeholder="Beskrivelse"
//               defaultValue={selectedEvent?.beskrivelse}
//             />
//             <div>
//               <Label htmlFor="image-upload">Bilde</Label>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   id="image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     document.getElementById("image-upload")?.click()
//                   }
//                 >
//                   <Upload className="mr-2 h-4 w-4" />
//                   Last opp bilde
//                 </Button>
//                 {imageFile && <span>{imageFile.name}</span>}
//               </div>
//             </div>
//             <div>
//               <Label>Trinn</Label>
//               <div className="flex space-x-2">
//                 {[1, 2, 3, 4, 5].map((trinn) => (
//                   <div key={trinn} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`trinn-${trinn}`}
//                       checked={selectedTrinn.includes(trinn)}
//                       onCheckedChange={() => handleTrinnChange(trinn)}
//                     />
//                     <Label htmlFor={`trinn-${trinn}`}>{trinn}</Label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <Input
//               name="kapasitet"
//               type="number"
//               placeholder="Kapasitet"
//               defaultValue={selectedEvent?.kapasitet}
//             />
//             <Button type="submit">
//               {isEditMode ? "Oppdater arrangement" : "Lag arrangement"}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Bekreft sletting</DialogTitle>
//             <DialogDescription>
//               Er du sikker på at du vil slette dette arrangementet? Denne
//               handlingen kan ikke angres.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteConfirmOpen(false)}
//             >
//               Avbryt
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => eventToDelete && handleDeleteEvent(eventToDelete)}
//             >
//               Slett
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
