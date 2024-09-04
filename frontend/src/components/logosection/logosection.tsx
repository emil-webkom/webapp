import useFetch from "@/hooks/use-fetch";
import { Samarbeidspartner } from "@/schemas/samarbeidspartner";
import React, { useEffect, useState } from "react";

const LogoSection: React.FC = () => {
  const [logos, setLogos] = useState<Samarbeidspartner[]>([]);
  const { data, loading, error } = useFetch<{
    samarbeidspartnere: Samarbeidspartner[];
  }>("/api/samarbeidspartner");

  useEffect(() => {
    if (data) {
      setLogos(data.samarbeidspartnere);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="text-center pt-24 bg-white">
        <h2 className="text-2xl font-bold pb-10">Loading...</h2>
        <div className="flex justify-center items-center py-4">
          <div className="loader"></div>{" "}
          {/* You might want to style this loader */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center pt-24 bg-white">
        <h2 className="text-2xl font-bold pb-10">Error loading logos</h2>
        <p className="text-lg">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="text-center pt-24 bg-white">
      <h2 className="text-2xl font-bold pb-10">
        En stor takk til alle våre samarbeidspartnere!
      </h2>
      <div className="grid grid-cols-2 gap-20 lg:grid-cols-4 lg:gap-36 p-6">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center py-4">
            <a
              href={logo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-50 transition duration-300 ease-in-out"
            >
              <img src={logo.logo} alt={logo.navn} className="h-16 w-auto" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSection;
