import Header from "../header/Header";
import Priority from "../pages/Priority";
import CreateTodo from "../pages/CreateTodo";
import MyCalendar from "../pages/Calendar";
import Todo from "../pages/Todo";
import { useEffect, useState } from "react";
import Accomplishment from "../pages/Accomplishment";
import { getUserId } from "../api/context";
import { IoCalendarNumberSharp } from "react-icons/io5"
import { LiaPagerSolid } from "react-icons/lia"
import { TiExportOutline } from "react-icons/ti"
import Accomplishment2 from "../pages/Accomplishment2"
import Todo2 from "../pages/Todo2"
import Prio from "../pages/Prio"
import { FaList, FaListCheck, FaListOl } from "react-icons/fa6"

export const LandingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const fetchData = async () => {
    const response = await getUserId()
    sessionStorage.setItem("userRole", String(response?.role))
    sessionStorage.setItem("userId", String(response?.id))
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <Header />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-5 px-10">
        <div className=" p-2 border-solid ">
          <Priority date={selectedDate} />
        </div>
        <div className=" p-2 border-solid">
          <CreateTodo />
        </div>
        <div className=" p-2 border-solid ">
          <MyCalendar onDateChange={setSelectedDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-5 px-10">
        <div className=" p-2 border-solid overflow-hidden">
          <Todo date={selectedDate} />
        </div>
        <div className=" p-2 border-solid ">
          <Accomplishment />
        </div>
      </div> */}

      <div className="flex flex-row m-1 mb-10 lg:my-8 lg:mx-15 gap-3">
        <div className="flex-1 text-white text-center text-sm md:text-md lg:text-xl">
          <button className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2 rounded-md md:p-2 lg:p-3 ">
            <IoCalendarNumberSharp className="mt-[2px]" />
            Calendar
          </button>
        </div>
        <div className="flex text-white text-center  text-sm md:text-md lg:text-xl">
          <button className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2  rounded-md md:p-2 lg:p-3 ">
            <LiaPagerSolid className="mt-[1px] h-5 w-5 lg:h-7 lg:w-7" />
            Overview
          </button>
        </div>
        <div className="flex text-white text-center  text-sm md:text-md lg:text-xl">
          <button className="flex gap-1 cursor-pointer  bg-[#0F4C5C] p-1 px-2  rounded-md md:p-2 lg:p-3 ">
            <TiExportOutline className="h-5 w-5  lg:h-7 lg:w-7" />
            ExportCsv
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mx-1 lg:mx-15 border-2 gap-3 h-150 mb-20 ">
        <div className="flex flex-col border-2 h-full w-full bg-[#87A5AD] mb-10">
          <div className="flex w-35 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-2 -mt-5 mb-5 rounded-md ml-4 justify-center">
            <FaListCheck className="h-5 w-5 mx-2 mt-1" />
            Priority
          </div>
          <div className="flex h-full">
            <Prio />
          </div>
        </div>
        <div className="flex flex-col border-2 h-full w-full bg-[#87A5AD]  mb-10">
          <div className="flex w-35 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-2 -mt-5 mb-5 rounded-md ml-4 justify-center">
            <FaList className="h-5 w-5 mx-2 mt-1" />
            Todo
          </div>
          <div className="flex h-full">
            <Todo2 />
          </div>
        </div>
        <div className="flex flex-col border-2 h-full w-full bg-[#87A5AD] mb-10">
          <div className="flex w-55 border-2 border-none bg-[#0F4C5C] text-sm md:text-md lg:text-xl text-white p-2 -mt-5 mb-5 rounded-md ml-4 justify-center">
            <FaListOl className="h-5 w-5 mx-2 mt-1" />
            Accomplishment
          </div>
          <div className="flex h-full">
            <Accomplishment2 />
          </div>
        </div>
      </div>
    </main>
  )
}
