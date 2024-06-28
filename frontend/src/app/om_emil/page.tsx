"use client";

import Hero2 from "@/components/hero/hero2";
import { Button } from "@/components/ui/button";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";
import React from "react";

const omEmilPage = () => {
  // Function to scroll to the target section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col ">
        <Hero2
          title="Energi og miljøstudentenes linjeforening"
          undertitle="Her finner du informasjon om linjeforeningen Emil"
        />
        <div
          className="flex justify-center pt-10 items-center space-x-24"
          style={{ height: "35vh" }}
        >
          <div style={{ width: "30vw" }} className="tracking-tighter">
            Energi og miljø-studiet er et sivilingeniørstudie (Master of
            technology) ved Norges teknisk-naturvitenskapelige universitet,
            NTNU. Studiet ble først introdusert våren 1998 og med et engasjert
            første kull ble linjeforeningen{" "}
            <span className="font-bold">Emil</span> stiftet den 28. september
            1998 kort tid etter første immatrikulering.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => scrollToSection("om_studiet")}>
              Om studiet
            </Button>
            <Button onClick={() => scrollToSection("historie")}>
              Historie
            </Button>
            <Button onClick={() => scrollToSection("hovedstyret")}>
              Hovedstyret
            </Button>
            <Button onClick={() => scrollToSection("kontak_oss")}>
              Kontakt oss{" "}
            </Button>
          </div>
        </div>
        <TransissionIn />
        <div
          id="om_studiet"
          style={{ height: "100vh" }}
          className="bg-primary"
        ></div>
      </div>
      <TransissionOut />
      <div id="historie" style={{ height: "100vh" }} className=""></div>
      <TransissionIn />
      <div
        id="hovedstyret"
        style={{ height: "100vh" }}
        className="bg-primary"
      ></div>
      <TransissionOut />
      <div id="kontak_oss" style={{ height: "100vh" }} className=""></div>
      <TransissionIn />
    </div>
  );
};

export default omEmilPage;
