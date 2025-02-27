"use client";

export default function Header() {
  return (
    <div>
      <header className="bg-[url('assets/blue.jpg')] bg-center bg-cover flex flex-row p-3 justify-between items-center">
        <div className="text-white text-[40px] font-inter font-bold">
          Habit Tracker
        </div>
        <div className="text-white text-[60px] font-caveat font-bold">
          You can do it
        </div>
        <div className="text-white text-[30px] font-inter font-bold">
          Account
        </div>
      </header>

      <div className="flex flex-row px-1 md:px-5 lg:px-15 py-3">
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
  )
}
