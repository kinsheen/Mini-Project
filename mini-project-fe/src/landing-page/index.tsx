import Header from "../header/Header";
import Priority from "../pages/Priority";
import CreateTodo from "../pages/CreateTodo";
import MyCalendar from "../pages/Calendar";
import Todo from "../pages/Todo";
import { useState } from "react";
import Accomplishment from "../pages/Accomplishment"

export const LandingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <main>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-5 px-10">
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
      </div>
    </main>
  )
};
