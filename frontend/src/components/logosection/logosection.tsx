import React from "react";

const logos = [

    { src: "/image/sponsorer/asplanviak.svg", alt: "GK", url:"https://www.asplanviak.no/" },
    { src: "/image/sponsorer/cowi.jpg", alt: "cowi", url:"https://www.cowi.com/" },
    { src: "/image/sponsorer/DNV.svg", alt: "DNV", url:" https://www.dnv.no/" },
    { src: "/image/sponsorer/equinor.svg", alt: "equinor", url:"https://www.equinor.com/no " },
    { src: "/image/sponsorer/GK.svg", alt: "GK", url:"https://www.gk.no/ " },
    { src: "/image/sponsorer/lyse.png", alt: "lyse", url: "https://www.lyse.no/ " },
    { src: "/image/sponsorer/nexans.svg", alt: "nexans", url: "https://www.nexans.no/no/" },
    { src: "/image/sponsorer/sit.webp", alt: "sit", url:"https://www.sit.no/" },
  ];

  const LogoSection: React.FC = () => {
    return (
      <div className="text-center pt-2 pb-5 bg-white">
        <h2 className="text-2xl font-bold mb-10 pb-20">En stor takk til alle våre samarbeidspartnere!</h2>
        <div className="grid grid-cols-4 gap-36 py-4 px-35">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center py-4">
              <a href={logo.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition duration-300 ease-in-out">
                <img src={logo.src} alt={logo.alt} className="h-16 w-auto" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
