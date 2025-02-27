"use client";
import { BsPersonCircle } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    await sessionStorage.clear();
    window.location.href = "/";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="bg-[url('assets/blue.jpg')] bg-center bg-cover flex flex-row p-3 justify-between items-center">
        <div className="text-white text-[40px] font-inter font-bold">
          Habit Tracker
        </div>
        <div className="text-white text-[60px] font-caveat font-bold">
          You can do it
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="text-white text-[30px] font-inter font-bold cursor-pointer flex flex-row items-center gap-3"
            onClick={toggleDropdown}
          >
            <span>Kin Sheen De Leon</span>
            <span>
              <BsPersonCircle className="text-5xl hover:text-gray-300" />
            </span>
          </div>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-90 h-70 bg-[#D4E5EA] rounded-md shadow-lg z-20">
              <div className="flex flex-col items-center py-2 gap-3">
                <div className="flex flex-col items-center text-primary mb-2 gap-2">
                  <BsPersonCircle className="text-5xl mr-2" />
                  <span>Hi! Kin Sheen</span>
                </div>
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4">
                  <BsPersonCircle className="text-xl text-primary" />
                  <span>Profile</span>
                </div>
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4">
                  <LiaUserEditSolid className="text-xl text-primary" />
                  <span>Change Password</span>
                </div>
                <div
                  className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4"
                  onClick={handleLogout}
                >
                  <PiSignOutBold className="text-xl text-primary" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
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
