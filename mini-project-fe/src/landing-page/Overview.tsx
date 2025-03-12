import React, { useState } from "react";
import Header from "../header/Header";
import SearchInput from "../helpers/searchInput";
import Achievements from "../pages/Achievements";
import Backlog from "../pages/Backlog";
import CreateTodo from "../pages/CreateTodo";
import TaskList from "../pages/TaskList";
import { IoArrowUndo } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const OverView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  return (
    <main>
      <Header />

      <div className="flex flex-row justify-between">
        <div className="mx-5 pb-5 flex flex-row justify-start items-center gap-1 md:px-10 md:gap-4">
          <span>
            <IoArrowUndo
              className="text-primary text-3xl hover:text-secondary md:text-5xl"
              onClick={() => navigate("/")}
            />
          </span>
          <h3 className="text-primary text-3xl md:text-6xl">Overview</h3>
        </div>

        <div className="flex flex-row pr-6 items-center gap-3 md:pr-16">
          <span>
            <CreateTodo />
          </span>
          <span className="">
            <SearchInput onSearch={setSearchTerm} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 mx-5 md:px-10">
        <div className="p-2 border-solid">
          <TaskList searchTerm={searchTerm} />
        </div>
        <div className="p-2 border-solid">
          <Backlog searchTerm={searchTerm} />
        </div>
        <div className="p-2 border-solid">
          <Achievements searchTerm={searchTerm} />
        </div>
      </div>
    </main>
  );
};
