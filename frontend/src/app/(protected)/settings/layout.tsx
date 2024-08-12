"use client";

import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/sidebar-nav";
import { useCurrentUser } from "@/hooks/use-current-user";

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
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block max-w-[1200px] m-auto">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Innstillinger</h2>
          <p className="text-muted-foreground">
            Administrer kontoinnstillingene dine og sett e-postpreferanser.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}