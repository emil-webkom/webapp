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
    <div className="text-center pt-2 pb-36 bg-white  ">
      <h2 className="text-2xl font-bold mb-10 pb-20 ">
        En stor takk til alle våre samarbeidspartnere!
      </h2>
      <div className="grid grid-cols-4 gap-36 py-4 px-35">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center py-4">
            <img src={logo.src} alt={logo.alt} className="h-16 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSection;
