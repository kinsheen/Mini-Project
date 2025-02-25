import React from "react";
import { FaList } from "react-icons/fa6";

export default function TaskList() {
  const tasks = [
    { id: 1, name: "Task 1", status: "Done" },
    { id: 2, name: "Task 2", status: "Unassigned" },
    { id: 3, name: "Task 3", status: "In Progress" },
  ];
  return (
    <div className="todo mt-7 px-7 py-7">
      <div className="flex flex-row text-white mb-5 -mt-11">
        <div className="flex w-30 bg-primary rounded-md p-2">
          <div className="flex flex-row justify-center items-center">
            <span className="px-2">
              <FaList />
            </span>
            <h3 className="">Task List</h3>
          </div>
        </div>
      </div>
      <div className="h-150">
        <div className=" h-full overflow-auto">
          <ul className="list-disc list-inside flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="text-white flex justify-between items-center p-3 bg-primary drop-shadow-xl py-5 rounded-md"
              >
                <input
                  type="checkbox"
                  className="transform scale-150 cursor-pointer"
                  defaultChecked={false}
                />
                <span className="mr-auto px-6">{task.name}</span>
                <span
                  className={`drop-shadow-2xl font-bold ${
                    task.status === "Done"
                      ? "text-green-500"
                      : task.status === "Unassigned"
                      ? "text-red-500"
                      : task.status === "In Progress"
                      ? "text-blue-500"
                      : "text-black"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
