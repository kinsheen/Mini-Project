import { useEffect, useState } from "react";
import { getTodoPriorityList } from "../api/context";
import { toDoResponseArray } from "../interfaces/types";

const Priority = () => {
  const [lists, setList] = useState<toDoResponseArray | null>();

  const fetchData = async () => {
    const response = await getTodoPriorityList();
    setList(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const priorityTasks = lists
    ? lists.filter((list) => list.priority === true)
    : [];

  return (
    <div className="">
      <h3 className="w-full bg-primary text-white p-5 font-inter flex items-center justify-center font-bold rounded-2xl">
        Top Priority
      </h3>
      <div className="flex flex-col gap-1 mt-1">
        {priorityTasks.length === 0 ? (
          <div className="w-[100%] bg-secondary p-2 flex items-center justify-center font-inter font-bold">
            No priority tasks available.
          </div>
        ) : (
          priorityTasks.map((item, index) => (
            <div key={index} className="flex flex-row w-full">
              <div className="w-[15%] bg-primary p-2 flex items-center justify-center font-inter font-bold">
                <span className="text-white">{index + 1}</span>
              </div>
              <div className="w-[85%] bg-secondary p-2 font-inter">
                {item.task}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Priority;
