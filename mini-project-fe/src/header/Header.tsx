"use client";

export default function Header() {
  return (
    <div>
      <header className="p-5 bg-[url('assets/blue.jpg')] bg-center bg-cover">
        <nav aria-label="Global" className="flex p-5 justify-center">
          <div className="flex text-white text-center text-[75px] font-caveat font-bold">
            You can do it
          </div>
        </nav>
      </header>
      <div className=" text-black text-[35px] px-15 pt-5 font-inter font-bold">
        Habit Tracker
      </div>
      <div className="flex flex-row px-15 py-5">
        <div className="relative w-full h-15 flex items-center rounded-2xl  border-2 border-black">
          <div className="absolute inset-0 bg-primary opacity-40 rounded-2xl"></div>
          <div className="flex z-10 pl-5">
            <div className="flex">
              <img src="src/assets/leaf.png" className="h-11" />
            </div>
            <span className="opacity-100 text-black font-bold font-caveat text-[22px] flex items-center pl-2">
              Be the energy you want to attract
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
