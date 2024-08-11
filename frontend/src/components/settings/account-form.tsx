"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Navn må være lenger enn 2 bokstaver",
    })
    .max(30, {
      message: "Navn kan ikke være lenger enn 30 bokstaver.",
    }),
  dob: z.date({
    required_error: "Fødselsdato kreves.",
  }),
  language: z.string({
    required_error: "Shut it pleass.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navnet ditt" {...field} />
              </FormControl>
              <FormDescription>
                Dette er navnet som vil bli vist på profilen din.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fødselsdato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Velg dato</span>
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Fødselsdatoen din brukes til regne ut alderen din. Det er viktig
                at denne informasjonen stemmer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-[#001d21] hover:bg-[#2b666e]" type="submit">
          Lagre innstillinger
        </Button>
      </form>
    </Form>
  );
}

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const;

// <FormField
//           control={form.control}
//           name="language"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Language</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       className={cn(
//                         "w-[200px] justify-between",
//                         !field.value && "text-muted-foreground",
//                       )}
//                     >
//                       {field.value
//                         ? languages.find(
//                             (language) => language.value === field.value,
//                           )?.label
//                         : "Select language"}
//                       <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[200px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Search language..." />
//                     <CommandEmpty>No language found.</CommandEmpty>
//                     <CommandList>
//                       <CommandGroup>
//                         {languages.map((language) => (
//                           <CommandItem
//                             value={language.label}
//                             key={language.value}
//                             onSelect={() => {
//                               form.setValue("language", language.value);
//                             }}
//                           >
//                             <CheckIcon
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 language.value === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0",
//                               )}
//                             />
//                             {language.label}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 This is the language that will be used in the dashboard.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
