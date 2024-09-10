"use client";

import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/sidebar-nav";
import { useCurrentUser } from "@/hooks/use-current-user";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import TransissionIn from "@/components/hero/transissions/transissionIn";

// export const metadata: Metadata = {
//   title: "Innstillinger",
//   description: "Endre dine innstillinger",
// }

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/settings",
  },
  {
    title: "Konto",
    href: "/settings/account",
  },
  {
    title: "Varslinger",
    href: "/settings/notifications",
  },
];

const debug = {
  title: "Debug",
  href: "/settings/debug",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const user = useCurrentUser();
  if (sidebarNavItems.length <= 3) {
    if (user && user.role === "ADMIN") {
      sidebarNavItems.push(debug);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center lg:p-8">
        <div className="space-y-6 flex flex-col items-center justify-center p-6 md:block w-[95%] lg:max-w-[60%] bg-[#003A42] rounded-lg text-white">
          <div>
            <h3 className="text-lg font-medium">Profil</h3>
            <p className="text-sm ">
              Dette er hvordan andre vil se deg på nettstedet.
            </p>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="text-white min-h-[400px]">{children}</div>
          </div>
        </div>
      </div>
      <TransissionIn />
    </>
  );
}
