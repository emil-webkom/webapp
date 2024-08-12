"use client";

import ListView from "@/components/calendar/listView";
import Hero from "@/components/hero/hero1";
import { Button } from "@/components/ui/button";
import { Arrangement } from "@/schemas/arrangement";
import { fetchArrangementer } from "@/utils/arrangement/arrangement";
import { useEffect, useState } from "react";

const ForStudentenPage = () => {
  const [arrangementer, setArrangementer] = useState<Arrangement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/arrangementer");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setArrangementer(data.arrangementer);
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

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <Hero title={"Arrangementer"} undertitle={""} /> */}
      <ListView events={arrangementer} />
    </div>
  );
};

export default ForStudentenPage;
