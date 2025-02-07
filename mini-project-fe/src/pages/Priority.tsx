import { useEffect, useState } from "react";
import { getTodoPriorityList, updateTodo } from "../api/context";
import { toDoResponseArray } from "../interfaces/types";
import { FaTrashCan } from "react-icons/fa6";
import { formatLocalDateToISO } from "../helpers/dateToLocal";
import { confirmation } from "../helpers/SwalDelete";

interface DisplayDateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: Date | any;
}

const Priority: React.FC<DisplayDateProps> = ({ date }) => {
  const [lists, setList] = useState<toDoResponseArray | null>(null);

  const formattedDate = formatLocalDateToISO(date);

  console.log("Local Date:", formattedDate); // Local time representation

  // Function to fetch the priority tasks
  const fetchData = async () => {
    const response = await getTodoPriorityList();
    setList(response);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  //Filter priority tasks
  const priorityTasks = lists
    ? lists.filter((list) => list.is_priority == true)
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
              <div className="w-[85%] bg-secondary p-2 font-inter flex col justify-between">
                {item.task}
                <span className="flex items-center justify-end pr-2">
                  <FaTrashCan
                    className="text-primary hover:text-primary/60"
                    onClick={async () => {
                      confirmation(
                        "Are you sure to delete this priority?",
                        item.id,
                        updateTodo,
                        false
                      );
                    }}
                  />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Priority;
