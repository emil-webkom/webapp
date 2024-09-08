import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Emilweb",
  description: "Energi og miljøstudentenes linjeforening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <NavBar />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
