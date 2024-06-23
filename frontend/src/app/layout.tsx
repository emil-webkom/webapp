import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Energi og Miljø",
  description: "Linjeforeningen til Energi og Miljø",
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
        {/* <div>
          <Footer/>
        </div> */}
      </body>
    </html>
  );
}
