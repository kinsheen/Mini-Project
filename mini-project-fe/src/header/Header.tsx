"use client";
import { BsPersonCircle } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { swalWarning } from "../helpers/swalAlert";
import { getUserId } from "../api/context";
import { userResponse } from "../interfaces/types";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [user, setUser] = useState<userResponse | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const role = sessionStorage.getItem("userRole");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    const result = await swalWarning("Do you want to Logout?");
    if (result) {
      await sessionStorage.clear();
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  const getUser = async () => {
    const response = await getUserId();
    setUser(response as userResponse);
    return response;
  };

  useEffect(() => {
    getUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="bg-[url('assets/blue.jpg')] bg-center bg-cover flex flex-row p-3 justify-between items-center">
        <div className="text-white font-inter font-bold">
          <span className="text-[40px] hidden md:block">Habit Tracker</span>
          <span className="text-[40px] md:hidden">HT</span>
        </div>
        <div className="text-white text-[40px] font-caveat font-bold md:text-[60px]">
          You can do it
        </div>
        <div className="relative sm:block" ref={dropdownRef}>
          <div
            className="text-white text-[30px] font-inter font-bold cursor-pointer flex flex-row items-center gap-3"
            onClick={toggleDropdown}
          >
            <span className="text-2xl hidden md:block">
              {user?.firstname} {user?.lastname}
            </span>
            <span className="text-2xl md:hidden"></span>
            <span>
              <BsPersonCircle className="text-5xl hover:text-gray-300" />
            </span>
          </div>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-90 h-auto bg-[#D4E5EA] rounded-md shadow-lg z-20">
              <div className="flex flex-col items-center py-3 gap-3">
                <div className="flex flex-col items-center text-primary mb-2 gap-2">
                  <BsPersonCircle className="text-5xl mr-2" />
                  <span>
                    Hi! {user?.firstname} {user?.lastname}
                  </span>
                </div>
                {role == "admin" ? (
                  <Link to="/admin" className="">
                    <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4">
                      <BsPersonCircle className="text-xl text-primary" />
                      <span>Admin</span>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                <Link to="/changepassword" className="">
                  <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4">
                    <LiaUserEditSolid className="text-xl text-primary" />
                    <span>Change Password</span>
                  </div>
                </Link>
                <div
                  className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer w-80 text-center border-2 border-primary rounded-3xl flex justify-center items-center gap-4 mb-4"
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
  );
}
