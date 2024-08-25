import { FC } from "react";

interface HeroProps {
  title: string;
  undertitle: string;
}

const Hero: FC<HeroProps> = ({ title, undertitle }) => {
  return (
    <nav>
      <div className="flex-col">
        <p className="font-bold text-[2rem] lg:text-[4rem] text-center lg:text-left tracking-tighter">
          {title}
        </p>
        <p className="font-medium text-[1rem] lg:text-[2rem] text-center tracking-tighter">
          {undertitle}
        </p>
      </div>
    </nav>
  );
};

export default Hero;
