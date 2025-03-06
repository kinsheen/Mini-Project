import Header from "../header/Header";
import { useEffect, useState } from "react";
import { getUserId } from "../api/context";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { TiExportOutline } from "react-icons/ti";
import { FaList, FaListCheck, FaListOl } from "react-icons/fa6";
import Priority from "../pages/Priority";
import Todo from "../pages/Todo";
import Accomplishment from "../pages/Accomplishment";
import CalendarModal from "../modals/CalendarModal";
import { formattedSelectedDate } from "../helpers/dateToLocal";
import ExportCsvModal from "../modals/ExportCsvModal";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [isCalendarModalOpen, setIsCalendarModalOpen] =
    useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  // const handleDateChange = (date: Date) => {
  //   console.log("selectedDate", date)
  //   setSelectedDate(date)
  // }

  const fetchData = async () => {
    const response = await getUserId();
    sessionStorage.setItem("userRole", String(response?.role));
    sessionStorage.setItem("userId", String(response?.id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <Header />

      <div className="flex flex-row m-1 mb-10 lg:my-8 md:mx-20 lg:mx-15 gap-3">
        <div className="flex-1 text-white text-center text-sm md:text-md lg:text-xl">
          <button
            className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2 rounded-md md:p-2 lg:p-3 hover:bg-transparent hover:text-[#0F4C5C] hover:font-bold hover:scale-90 hover:border-4"
            onClick={() => setIsCalendarModalOpen(true)}
          >
            <IoCalendarNumberSharp className="mt-[2px]" />
            {formattedSelectedDate()}
          </button>
        </div>
        <div className="flex text-white text-center  text-sm md:text-md lg:text-xl">
          <button
            className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2  rounded-md md:p-2 lg:p-3  hover:bg-transparent hover:text-[#0F4C5C] hover:font-bold hover:scale-90 hover:border-4"
            onClick={() => navigate("/overview")}
          >
            <LiaPagerSolid className="mt-[1px] h-5 w-5 lg:h-7 lg:w-7" />
            Overview
          </button>
        </div>
        <div className="flex text-white text-center  text-sm md:text-md lg:text-xl">
          <button
            className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2  rounded-md md:p-2 lg:p-3  hover:bg-transparent hover:text-[#0F4C5C] hover:font-bold hover:scale-90 hover:border-4"
            onClick={() => setIsExportModalOpen(true)}
          >
            <TiExportOutline className="h-5 w-5  lg:h-7 lg:w-7" />
            ExportCsv
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mx-1 md:mx-20 lg:mx-15 lg:mt-20  gap-3 h-180 mb-20 ">
        <div className="flex flex-col  rounded-lg h-full w-full bg-[#87A5AD] mb-10">
          <div className="flex w-35 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-3 -mt-5 mb-12 rounded-md ml-4 justify-center">
            <FaListCheck className="h-5 w-5 mx-2 mt-1" />
            Priority
          </div>
          <div className="flex h-full">
            <Priority />
          </div>
        </div>
        <div className="flex flex-col rounded-lg  h-full w-full bg-[#87A5AD]  mb-10">
          <div className="flex w-35 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-3 -mt-5 mb-12 rounded-md ml-4 justify-center">
            <FaList className="h-5 w-5 mx-2 mt-1" />
            Todo
          </div>
          <div className="flex h-full">
            <Todo />
          </div>
        </div>
        <div className="flex flex-col rounded-lg  h-full w-full bg-[#87A5AD] mb-10">
          <div className="flex w-55 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-3 -mt-5 mb-12 rounded-md ml-4 justify-center">
            <FaListOl className="h-5 w-5 mx-2 mt-1" />
            Accomplishment
          </div>
          <div className="flex h-full">
            <Accomplishment />
          </div>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />

      <ExportCsvModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </main>
  );
};
