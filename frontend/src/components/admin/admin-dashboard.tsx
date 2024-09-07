"use client";

import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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


export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            
            <Tabs defaultValue="Bruker">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Bruker">Bruker</TabsTrigger>
                  <TabsTrigger value="Hovedstyret">Hovedstyret</TabsTrigger>
                  <TabsTrigger value="Komité">Komité</TabsTrigger>
                  <TabsTrigger value="Arrangement">Arrangement</TabsTrigger>
                  <TabsTrigger value="Lavterskelarrangement">Lavterskelarrangement</TabsTrigger>
                  <TabsTrigger value="Booking">Booking</TabsTrigger>
                  <TabsTrigger value="Samarbeidspartnere">Samarbeidspartnere</TabsTrigger>
                  <TabsTrigger value="Hovedsamarbeidspartnere">Hovedsamarbeidspartnere</TabsTrigger>
                  <TabsTrigger value="Æresemiler">Æresemiler</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  
                </div>
              </div>
              <TabsContent value="Bruker">
                <BrukerComponent/>
                </TabsContent>

                <TabsContent value="Hovedstyret">
                <HovedstyreComponent></HovedstyreComponent>
                </TabsContent>

                <TabsContent value="Komité">
                <KomiteComponent></KomiteComponent>
                </TabsContent>
                <TabsContent value="Arrangementer">
                <div>Arrangementer</div>
                </TabsContent>

                <TabsContent value="Lavterskelarrangement">
                <LavterskelarrangementComponent></LavterskelarrangementComponent>
                </TabsContent>

                <TabsContent value="Booking">
                <BookingComponent></BookingComponent>
                </TabsContent>

                <TabsContent value="Samarbeidspartnere">
               <SamarbeidspartnereComponent></SamarbeidspartnereComponent>
                </TabsContent>

                <TabsContent value="Hovedsamarbeidspartnere">
                  <HovedsamarbeidspartnerComponent/>
                </TabsContent>

                <TabsContent value="Æresemiler">
                <div className="w-full">
                  <AeresEmilerComponent/>
                </div>
                </TabsContent>

            {/*     <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-accent">
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card> */}
            </Tabs>
          </div>
          <div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
