import { FC } from "react";

interface HeroProps {
  title: string;
  undertitle: string;
}

const Hero: FC<HeroProps> = ({ title, undertitle }) => {
  return (
    <nav>
      <div className="flex-col">
        <p className="font-bold text-[4.3rem] text-left tracking-tighter">
          {title}
        </p>
        <p className="font-medium text-[2rem] text-left tracking-tighter">
          {undertitle}
        </p>
      </div>
    </nav>
  );
};

export default Hero;
