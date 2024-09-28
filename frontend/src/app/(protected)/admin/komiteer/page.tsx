'use client'

import { Dashboard } from "@/components/admin/admin-dashboard";
import AeresEmilerComponent from "@/components/admin/aeresemiler";
import ArrangementComponentNew from "@/components/admin/arrangementForm";
import BookingComponent from "@/components/admin/booking";
import BrukerComponent from "@/components/admin/brukere";
import HovedsamarbeidspartnerComponent from "@/components/admin/hovedsamarbeidspartnere";
import KomiteComponent from "@/components/admin/komiteComponent";
import LavterskelarrangementComponent from "@/components/admin/lavterskelarrangement";
import SamarbeidspartnereComponent from "@/components/admin/samarbeidspartnere";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const rolle = useCurrentRole()
  if(rolle !=="SUPER_USER"){
    redirect("/");
  }
  return (
    <div>
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col ">
        <div className="hidden lg:block p-16">
          <KomiteComponent/>
        </div>
      </div>
    </div>
    <TransissionIn/>
    </div>
);
};

export default AdminPage;
