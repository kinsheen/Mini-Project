import React from "react";
import { ImParagraphRight } from "react-icons/im";

export default function Backlog() {
  const tasks = [
    { id: 1, name: "Task 1", status: "Unassigned" },
    { id: 2, name: "Task 2", status: "Unassigned" },
    { id: 3, name: "Task 3", status: "Unassigned" },
  ];
  return (
    <div className="todo mt-7 px-7 py-7">
      <div className="flex flex-row text-white mb-5 -mt-11">
        <div className="flex w-30 bg-primary rounded-md p-2">
          <div className="flex flex-row justify-center items-center">
            <span className="px-2">
              <ImParagraphRight />
            </span>
            <h3 className="">Backlog</h3>
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
                <span className="text-red-500 drop-shadow-2xl font-bold">
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
