"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  avatar: z.string().optional(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "Jeg går Emil 4. klasse og liker sodd.",
  urls: [{ value: "+4712345678" }, { value: "+4790784534" }],
};

export function ProfileForm() {
  const user = useCurrentUser();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {}, [profilePic]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  const changeProfilePic = () => {
    const inputElement = document.getElementById(
      "profile-pic-input",
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click(); // Trigger file input dialog
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);

      // Generate a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const togglePreview = () => {
    setProfilePic(null);
  }

  const handleUpload = async () => {
    if (!profilePic) return;

    // Simulate an image upload
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      // Add actual function for uploading profile pic
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profilbilde</FormLabel>
              <FormControl>
                <Avatar className="w-12 h-12 ml-1">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="background-dark">
                    <FaUser size={20} className="text-white" />
                  </AvatarFallback>
                </Avatar>
              </FormControl>
              <div>
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <p
                  onClick={changeProfilePic}
                  className="w-fit cursor-pointer text-underscore"
                >
                  Her kan du laste opp et profilbilde
                </p>
              </div>
              {profilePic! && (
              <div className="w-[40%] rounded-md flex flex-col items-center justify-center p-4">
              <p>Forhåndsvisning av profilbilde:</p>
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-fit bg-white p-2"
              />
              <div className="flex w-full justify-between">
              <button
                onClick={handleUpload}
                className="mt-2 bg-primary text-white py-1 px-4 rounded-md"
              >
                Last opp bilde
              </button>
              <button
                onClick={()=>togglePreview()}
                className="mt-2 bg-primary text-white py-1 px-4 rounded-md"
              >
                Lukk?
              </button>
              </div>
            </div>
                )}
              {/* {previewUrl && (
                <Modal isOpen={isOpen}>
                  <>
                    <div className="">
                      <p>Forhåndsvisning av profilbilde:</p>
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-fit"
                      />
                      <div className="flex w-full justify-between">
                      <button
                        onClick={handleUpload}
                        className="mt-2 bg-primary text-white py-1 px-4 rounded-md"
                      >
                        Last opp bilde
                      </button>
                      <button
                        onClick={()=>toggleModal()}
                        className="mt-2 bg-primary text-white py-1 px-4 rounded-md"
                      >
                        Lukk?
                      </button>
                      </div>
                    </div>
                  </>
                </Modal>
              )} */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brukernavn</FormLabel>
              <FormControl>
                <Input placeholder={`@${user?.name}`} {...field} />
              </FormControl>
              <FormDescription>
                Dette er brukernavnet ditt. Dersom du endrer dette må du vente i
                30 dager for å kunne endre brukernavnet på nytt.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trinn</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg trinn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1.">1.</SelectItem>
                  <SelectItem value="2.">2.</SelectItem>
                  <SelectItem value="3.">3.</SelectItem>
                  <SelectItem value="4.">4.</SelectItem>
                  <SelectItem value="5.">5.</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Du kan endre trinnet ditt her </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Telefonnummer
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Legg til telefonnummer her
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Legg til nummer
          </Button>
        </div>
        <Button className="bg-[#001d21] hover:bg-[#2b666e]" type="submit">
          Oppdater profil
        </Button>
      </form>
    </Form>
  );
}
