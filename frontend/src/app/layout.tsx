import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";

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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NavBar />
        <div className="w-full flex-grow">{children}</div>
        {/* <Toaster /> */}
        <Footer />
      </body>
    </html>
  );
}
