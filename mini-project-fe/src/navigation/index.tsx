export default function NavigationBar() {
  return (
    <>
      <div>
        <header className="p-7 bg-[url('assets/blue.jpg')]">
          <nav aria-label="Global" className="flex p-6 justify-center">
            <div className="flex text-white text-center text-5xl font-mono">
              You can do it
            </div>
          </nav>
        </header>
        <div className=" text-black text-3xl p-5 font-mono">Habit Tracker</div>
        <div className="flex flex-row px-5">
          <div className="relative w-full h-15 flex items-center rounded-2xl">
            <div className="absolute inset-0 bg-[#0F4C5C] opacity-40 rounded-2xl"></div>
            <div className="flex z-10 px-5 gap-2">
              <div className="flex">logo</div>
              <span className="opacity-100 text-black font-bold">
                Be the energy you want to attract
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
