"use client";

export interface EventProps {
  title: string;
  decscription: string;
  date?: Date;
  icon?: any;
}

const Event = ({ title, decscription, date }: EventProps) => {
  return (
    <>
      <div className="flex flex-row w-40">{title}</div>
    </>
  );
};

export default Event;
