import React from "react";

const logos = [
  { src: "/image/asplanviak.svg", alt: "GK" },
  { src: "/image/cowi.jpg", alt: "cowi" },
  { src: "/image/DNV.svg", alt: "DNV" },
  { src: "/image/equinor.svg", alt: "equinor" },
  { src: "/image/GK.svg", alt: "GK" },
  { src: "/image/lyse.png", alt: "lyse" },
  { src: "/image/nexans.svg", alt: "nexans" },
  { src: "/image/sit.webp", alt: "sit" },
];

const LogoSection: React.FC = () => {
  return (
    <div className="text-center pt-2 pb-60 bg-white  ">
      <h2 className="text-3xl font-bold mb-10 ">
        En stor takk til alle våre samarbeidspartnere!
      </h2>
      <p className="text-lg text-[#3A766C] mb-6 pb-36" ay->
        For bedrifter:{" "}
        <a
          href="https://www.emil-link.no/for-bedrifter"
          className="text-[#3A766C] font-semibold  "
        >
          {" "}
          Trykk her
        </a>{" "}
        dersom du ønsker å ta kontakt med oss.
      </p>
      <div className="grid grid-cols-4 gap-36 px-35">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center p-4">
            <img src={logo.src} alt={logo.alt} className="h-16 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSection;
