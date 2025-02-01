const Priority = () => {
  return (
    <div className="">
      <h3 className="w-full bg-primary text-white p-5 font-inter flex items-center justify-center font-bold rounded-2xl">
        Top Priority
      </h3>
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex flex-row w-full">
          <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
            <span className="text-white">1</span>
          </div>
          <div className="w-[85%] bg-secondary p-2">02</div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
            <span className="text-white">2</span>
          </div>
          <div className="w-[85%] bg-secondary p-2">04</div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
            <span className="text-white">3</span>
          </div>
          <div className="w-[85%] bg-secondary p-2">06</div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
            <span className="text-white">4</span>
          </div>
          <div className="w-[85%] bg-secondary p-2">08</div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
            <span className="text-white">5</span>
          </div>
          <div className="w-[85%] bg-[#B7C9CE] p-2">10</div>
        </div>
      </div>
    </div>
  );
};

export default Priority;
