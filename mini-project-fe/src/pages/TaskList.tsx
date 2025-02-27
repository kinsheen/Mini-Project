import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa6";
import { toDoResponseArray } from "../interfaces/types";
import { getTodoPriorityList, updateTodo } from "../api/context";
import { confirmation } from "../helpers/SwalDelete";

interface TaskListProps {
  searchTerm: string;
}

const TaskList: React.FC<TaskListProps> = ({ searchTerm }) => {
  const [lists, setList] = useState<toDoResponseArray | null>(null);

  const fetchData = async () => {
    const response = await getTodoPriorityList();
    setList(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const priorityTasks = lists ? lists : [];

  // Filter tasks based on the search term
  const filteredTasks = priorityTasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="h-full overflow-auto">
          <ul className="list-disc list-inside flex flex-col gap-2">
            {filteredTasks.length === 0 ? (
              <div className="text-white font-bold flex justify-center items-center p-3 bg-primary drop-shadow-xl py-5 rounded-md">
                NO TASK AVAILABLE
              </div>
            ) : (
              filteredTasks.map((task) => (
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
};

export default TaskList;
