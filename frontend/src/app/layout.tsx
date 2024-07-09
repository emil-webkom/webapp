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
      <body>
        <div>
          <NavBar />
        </div>
        {children}
        {/* <Toaster /> */}
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
