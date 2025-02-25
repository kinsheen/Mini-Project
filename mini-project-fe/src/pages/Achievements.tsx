import React from "react";
import { TbMessage2Star } from "react-icons/tb";

export default function Achievements() {
  const tasks = [
    { id: 1, name: "Task 1", status: "Completed" },
    { id: 2, name: "Task 2", status: "Completed" },
    { id: 3, name: "Task 3", status: "Completed" },
  ];
  return (
    <div className="todo mt-7 px-7 py-7">
      <div className="flex flex-row text-white mb-5 -mt-11">
        <div className="flex w-auto bg-primary rounded-md p-2 pr-4">
          <div className="flex flex-row justify-center items-center">
            <span className="px-2">
              <TbMessage2Star />
            </span>
            <h3 className="">Achievements</h3>
          </div>
        </div>
      </div>
      <div className="h-150">
        <div className=" h-full overflow-auto">
          <ul className="list-disc list-inside flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="text-white flex justify-between items-center p-3 bg-primary drop-shadow-xl py-5 px-5 rounded-md"
              >
                <span className="">{task.name}</span>
                <span className="text-green-500 drop-shadow-2xl font-bold">
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
