import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa6";
import { toDoResponseArray } from "../interfaces/types";
import { getTodoPriorityList, updateTodo } from "../api/context";
import { confirmation } from "../helpers/SwalDelete";

export default function TaskList() {
  const [lists, setList] = useState<toDoResponseArray | null>(null);

  // Function to fetch the priority tasks
  const fetchData = async () => {
    const response = await getTodoPriorityList();
    setList(response);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  //   const priorityTasks = lists
  //     ? lists.filter((list) => list.status === status.unassigned)
  //     : [];

  const priorityTasks = lists ? lists : [];

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
            {priorityTasks.length === 0 ? (
              <div className="text-white font-bold flex justify-center items-center p-3 bg-primary drop-shadow-xl py-5 rounded-md">
                NO TASK AVAILABLE
              </div>
            ) : (
              priorityTasks.map((task) => (
                <li
                  key={task.id}
                  className="text-white flex justify-between items-center p-3 bg-primary drop-shadow-xl py-5 rounded-md"
                >
                  <input
                    type="checkbox"
                    className="transform scale-150 cursor-pointer"
                    defaultChecked={false}
                    onClick={async (e) => {
                      if (e.currentTarget.checked) {
                        confirmation(
                          "Add this to To Do page?",
                          task.id,
                          updateTodo,
                          false,
                          "In Progress"
                        );
                      }
                    }}
                  />
                  <span className="mr-auto px-6">{task.task}</span>
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
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
