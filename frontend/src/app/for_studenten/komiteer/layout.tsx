'use client'

import InfoAndScrollbarWithButton from "@/components/ForStudenten/InfoAndScrollbarWithButton";
import { Komite } from "@/schemas/komite";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [komiteData, setKomiteData] = useState<Komite[] | null>(null);
    const fetchData = async () => {
        try {
          const response = await fetch("/api/komite");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
    
          setKomiteData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(`Failed to fetch arrangementer: ${err.message}`);
          } else {
            setError("Failed to fetch arrangementer: Unknown error");
          }
        } finally {
          setLoading(false);
        }
      };
      // API call to fetch arrangements from DB
      useEffect(() => {
        fetchData();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
  return (
    <div className="text-white w-full">
        {/* Render only if komiteData is defined */}
        {komiteData && <InfoAndScrollbarWithButton komiteer={komiteData}/>}
        {children}
    </div>
  );
}
