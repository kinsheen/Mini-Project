import React, { useState } from "react";
import Header from "../header/Header";
import SearchInput from "../helpers/searchInput";
import Achievements from "../pages/Achievements";
import Backlog from "../pages/Backlog";
import CreateTodo from "../pages/CreateTodo";
import TaskList from "../pages/TaskList";

export const OverView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main>
      <Header />
      <div className="mx-5 px-10 pb-5">
        <h3 className="text-primary text-6xl">Overview</h3>
      </div>
      <div className="flex flex-row justify-between">
        <span>
          <CreateTodo />
        </span>
        <span className="pr-16">
          <SearchInput onSearch={setSearchTerm} />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 m-5 px-10">
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
