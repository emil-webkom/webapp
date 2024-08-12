import { FC } from "react";

interface HeroProps {
  title: string;
  undertitle: string;
}

const Hero2: FC<HeroProps> = ({ title, undertitle }) => {
  return (
    <nav className="pt-24">
      <div className="flex items-center justify-center space-x-5 ">
        <div className="flex-col w-[65%] text-center">
          <p className="font-bold text-[2.7rem]  tracking-tighter">{title}</p>
          <p className="font-medium text-[1.2rem] tracking-tighter my-4">
            {undertitle}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Hero2;
