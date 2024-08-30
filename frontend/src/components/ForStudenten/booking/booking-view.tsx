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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Function to get a date string for a future date
const getFutureDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

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
      } catch (error) {}
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bookinger</CardTitle>
        <CardDescription>Dine tidligere bookinger.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Dato</TableHead>
              <TableHead className="text-right">Antall</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const isActive = isBookingActive(booking.bookedAt);
              return (
                <TableRow
                  key={booking.id}
                  className={isActive ? "bg-green-50" : ""}
                >
                  <TableCell>Soundbox</TableCell>
                  <TableCell>{getDate(booking.bookedAt)}</TableCell>
                  <TableCell className="text-right">
                    {booking.item === "ONE_SOUNDBOX" ? 1 : 2}
                  </TableCell>
                  <TableCell className="text-right">
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
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
            <div className="py-4">
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
