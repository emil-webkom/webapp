type BigCardProps = {};

const BigCard = ({}: BigCardProps) => {
  return (
    <>
      <div className="p-10 flex flex-row w-[58.5rem] rounded-md border bg-rose-400">
        <div className="flex flex-col gap-y-4 justify-center items-center p-8 bg-slate-400">
          <div className="bg-white">Header</div>
          <div className="bg-slate-500">Text</div>
          <div className="bg-emerald-300">Footer</div>
        </div>
        <div className="flex-grow bg-white">hero</div>
      </div>
    </>
  );
};

export default BigCard;
