"use client";

export default function NavigationBar() {
  return (
    <div className="bg-white-100">
      <header className="absolute inset-x-0 p-7 bg-[url('assets/blue.jpg')]">
        <nav aria-label="Global" className="flex p-6 justify-center">
          <div className="flex text-white text-center text-5xl font-mono">
            You can do it
          </div>
        </nav>
      </header>
    </div>
  );
}
