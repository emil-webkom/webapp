"use client";

import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Bruker from "./bruker";
import AeresEmiler from "./aeresemiler";
import AeresEmilerComponent from "./aeresemiler";
import BrukerComponent from "./brukere";

import HovedsamarbeidspartnereComponent from "./hovedsamarbeidspartnere";
import HovedsamarbeidspartnerComponent from "./hovedsamarbeidspartnere";
import SamarbeidspartnereComponent from "./samarbeidspartnere";
import BookingComponent from "./booking";
import KomiteComponent from "./komiteComponent";
import HovedstyreComponent from "./hovedstyret";
import LavterskelarrangementComponent from "./lavterskelarrangement";
import ArrangementComponent from "./arrangement";
import ArrangementComponentNew from "./arrangementForm";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col ">
        <div className="hidden lg:block p-16">
          <Tabs defaultValue="Bruker">
            <div className="flex items-center w-full">
              <TabsList className="w-full">
                <TabsTrigger value="Bruker">Bruker</TabsTrigger>
                <TabsTrigger value="Hovedstyret">Hovedstyret</TabsTrigger>
                <TabsTrigger value="Komité">Komité</TabsTrigger>
                <TabsTrigger value="Arrangement">Arrangement</TabsTrigger>
                <TabsTrigger value="Lavterskelarrangement">
                  Lavterskelarrangement
                </TabsTrigger>
                <TabsTrigger value="Booking">Booking</TabsTrigger>
                <TabsTrigger value="Samarbeidspartnere">
                  Samarbeidspartnere
                </TabsTrigger>
                <TabsTrigger value="Hovedsamarbeidspartnere">
                  Hovedsamarbeidspartnere
                </TabsTrigger>
                <TabsTrigger value="Æresemiler">Æresemiler</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2"></div>
            </div>
            <TabsContent value="Bruker">
              <BrukerComponent />
            </TabsContent>

            <TabsContent value="Hovedstyret">
              <HovedstyreComponent />
            </TabsContent>

            <TabsContent value="Komité">
              <KomiteComponent />
            </TabsContent>

            <TabsContent value="Arrangement">
              {/* <ArrangementComponent /> */}
              <ArrangementComponentNew />
            </TabsContent>

            <TabsContent value="Lavterskelarrangement">
              <LavterskelarrangementComponent />
            </TabsContent>

            <TabsContent value="Booking">
              <BookingComponent />
            </TabsContent>

            <TabsContent value="Samarbeidspartnere">
              <SamarbeidspartnereComponent></SamarbeidspartnereComponent>
            </TabsContent>

            <TabsContent value="Hovedsamarbeidspartnere">
              <HovedsamarbeidspartnerComponent />
            </TabsContent>

            <TabsContent value="Æresemiler">
              <div className="w-full">
                <AeresEmilerComponent />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div></div>
      </div>
    </div>
  );
}
