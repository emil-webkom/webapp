import { FC } from "react";

interface HeroProps {
  title: string;
  undertitle: string;
}

const Hero2: FC<HeroProps> = ({ title, undertitle }) => {
  return (
    <nav>
      <div className="flex  items-center justify-center space-x-5 ">
        <div className="flex-col">
          <p className="font-bold text-[2.7rem] text-left tracking-tighter m-4">
            {title}
          </p>
          <p className="font-medium text-[1.2rem] text-left tracking-tighter m-4">
            {undertitle}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Hero2;
