"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkBooking } from "@/utils/actions/checkBooking";
import { bookingFormSchema } from "@/schemas/booking";

interface BookingCardProps {
  onStatusChange: ({ status, lukk }: { status: string; lukk: boolean }) => void;
  selectedDate: Date | null; // Add selectedDate prop
}

export const BookingCard = ({
  onStatusChange,
  selectedDate,
}: BookingCardProps) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [lukk, setLukk] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      bookingDate: selectedDate || undefined, // Use selectedDate from props
    },
  });

  // Function to handle the close button
  const handleClose = () => {
    setLukk(true);
    onStatusChange({ status: "Closed", lukk: true }); // Send the close action to the parent component
  };

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof bookingFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      checkBooking(values, user?.id || "").then((data) => {
        const { error, success } = data || {};

        if (error) {
          setError(error);
          onStatusChange({ status: error, lukk }); // Send the error status to the parent component
        } else if (success) {
          setSuccess(success);
          toast({
            title: "Booking gjennomført!",
            description: `Du har booket: ${data.booking?.item === "ONE_SOUNDBOX" ? "1 Soundbox" : "2 Soundboxer"}, ${format(new Date(data.booking?.bookedAt!!), "PPP", { locale: nb })}`,
          });
          onStatusChange({ status: success, lukk }); // Send the success status to the parent component
        }
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Book soundbox"
      headerLabel="Enkelt å booke"
      backButtonLabel="Se mine bookinger"
      backButtonHref="/for_studenten/booking/bookings"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antall</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder="Velg antall"></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONE_SOUNDBOX">1</SelectItem>
                      <SelectItem value="TWO_SOUNDBOXES">2</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookingDate"
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
                  <FormDescription className="">
                    Velg en dato for din booking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Book
          </Button>
        </form>
      </Form>
      <Button className="w-full" onClick={handleClose}>
        Lukk
      </Button>
    </CardWrapper>
  );
};
