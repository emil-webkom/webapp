'use client'

import { Dashboard } from "@/components/admin/admin-dashboard";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import { useCurrentRole } from "@/hooks/use-current-role";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const rolle = useCurrentRole()
  if(rolle !=="ADMIN"){
    redirect("/");
  }
  return (
    <div>
      <Dashboard />
    <TransissionIn/>
    </div>
);
};

export default AdminPage;
