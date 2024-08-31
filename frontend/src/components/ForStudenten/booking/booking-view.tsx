"use client";

import { nb } from "date-fns/locale";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Booking } from "@/schemas/booking";

const getDate = (date: Date) => {
  const newDate = new Date(date);
  return format(newDate, "PPP", { locale: nb });
};

export default function BookingView() {
  const user = useCurrentUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?userID=${user?.id}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (bookingToCancel) {
      try {
        const response = await fetch(`/api/bookings/${bookingToCancel.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBookings(
            bookings.filter((booking) => booking.id !== bookingToCancel.id),
          );
        } else {
          console.log("Failed to delete booking");
        }
      } catch (error) {
        console.log("Noe feilet.");
      }
    }
    setIsModalOpen(false);
    setBookingToCancel(null);
  };

  const isBookingActive = (date: Date) => {
    const bookingDate = new Date(date);
    const currentDate = new Date();
    return bookingDate >= currentDate;
  };

  return (
    <Card className="w-full p-2">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Bookinger</CardTitle>
        <CardDescription className="text-sm">
          Dine tidligere bookinger.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="min-w-[350px] w-full">
              <thead>
                <tr>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-left">Dato</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-right">Antall</th>
                  <th className="py-2 text-right">Handling</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const isActive = isBookingActive(booking.bookedAt);
                  return (
                    <tr
                      key={booking.id}
                      className={`text-sm ${
                        isActive && booking.status === "CONFIRMED"
                          ? "bg-green-50"
                          : booking.status === "REJECTED"
                          ? "bg-red-50"
                          : "bg-yellow-50"
                      } rounded-md`}
                    >
                      <td className="py-2">Soundbox</td>
                      <td className="py-2">{getDate(booking.bookedAt)}</td>
                      <td className="py-2">{booking.status}</td>
                      <td className="py-2 text-right">
                        {booking.item === "ONE_SOUNDBOX" ? 1 : 2}
                      </td>
                      <td className="py-2 text-right">
                        {isActive ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCancelClick(booking)}
                            aria-label={`Cancel ${booking.item} booking for ${booking.bookedAt}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            {bookings.map((booking) => {
              const isActive = isBookingActive(booking.bookedAt);
              return (
                <div
                  key={booking.id}
                  className={`mb-4 p-4 rounded-lg ${
                    isActive && booking.status === "CONFIRMED"
                      ? "bg-green-50"
                      : booking.status === "REJECTED"
                      ? "bg-red-50"
                      : "bg-yellow-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">Type:</span>
                    <span>Soundbox</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Dato:</span>
                    <span>{getDate(booking.bookedAt)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Status:</span>
                    <span>{booking.status}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Antall:</span>
                    <span>{booking.item === "ONE_SOUNDBOX" ? 1 : 2}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Handling:</span>
                    {isActive ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCancelClick(booking)}
                        aria-label={`Cancel ${booking.item} booking for ${booking.bookedAt}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bekreft kansellering</DialogTitle>
            <DialogDescription>
              Er du sikker på om du vil slette denne bookingen?
            </DialogDescription>
          </DialogHeader>
          {bookingToCancel && (
            <div className="py-4 text-sm">
              <p>
                <strong className="font-semibold">Type: </strong> Soundbox
              </p>
              <p>
                <strong className="font-semibold">Dato: </strong>{" "}
                {getDate(bookingToCancel.bookedAt)}
              </p>
              <p>
                <strong className="font-semibold">Antall: </strong>
                {bookingToCancel.item === "ONE_SOUNDBOX" ? 1 : 2}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Nei, gå tilbake
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Ja, kanseller bookingen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
