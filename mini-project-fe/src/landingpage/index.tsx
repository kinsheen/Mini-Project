import React from "react";
import Header from "../header/Header"
import Priority from "../components/Priority"
import CreateTodo from "../components/CreateTodo"
import MyCalendar from "../components/Calendar"
import Achievement from "../components/Achievement"
import Todo from "../components/Todo"

export const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-5">
        <div className="border-1 p-2 border-solid ">
          <Priority />
        </div>
        <div className="border-1 p-2 border-solid ">
          <CreateTodo />
        </div>
        <div className="border-1 p-2 border-solid ">
          <MyCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-5">
        <div className="border-1 p-2 border-solid ">
          <Achievement />
        </div>
        <div className="border-1 p-2 border-solid ">
          <Todo />
        </div>
      </div>
    </div>
  )
};
