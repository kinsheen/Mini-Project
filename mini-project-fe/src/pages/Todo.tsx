import { FaList } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { dateFormat, toDoResponseArray } from "../interfaces/types";
import {
  getTodoPriorityList,
  postCreateToDo,
  updateTodo,
} from "../api/context";
import { formatLocalDateToISO } from "../helpers/dateToLocal";
import { FaEdit } from "react-icons/fa";
import React from "react";
import Swal from "sweetalert2";
import { confirmation } from "../helpers/SwalDelete";
import ModalEdit from "../components/modalEdit";
import { IoMdAddCircleOutline } from "react-icons/io";

interface DisplayDateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: Date | any;
}

const Todo: React.FC<DisplayDateProps> = ({ date }) => {
  const [lists, setList] = useState<toDoResponseArray | null>(null);
  const formattedDate = formatLocalDateToISO(date);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    day: string;
    task: string;
  } | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (day: string, task: string) => {
    try {
      const date = new Date(day);

      // Get the day of the week as a string
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      const dayOfWeek = date.toLocaleDateString("en-US", options);

      console.log("Submitted Data:", { dayOfWeek, task });
      console.log("Submitted Data Date:", day);

      const response = await postCreateToDo(
        dayOfWeek,
        task,
        "In Progress",
        false,
        formatLocalDateToISO(day)
      );

      // Assuming the response contains the created data directly
      if (response) {
        setSubmittedData({ day, task });
        console.log("To-do created successfully:", response);
        Swal.fire({
          title: "Successfully Added to Priority!",
          icon: "success",
          draggable: true,
          confirmButtonColor: "#0f4c5c", // Customize button color
        }).then(() => {
          window.location.reload();
        });
      } else {
        // Handle the case where response does not contain expected data
        console.error("Failed to create to-do: No data returned");
        Swal.fire({
          title: "Failed Adding Task to Priority!",
          icon: "error", // Changed from "failure" to "error"
          draggable: true,
          confirmButtonColor: "#0f4c5c",
        });
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error occurred while creating to-do:", error);
      Swal.fire({
        title: "Failed Adding Task to Priority!",
        icon: "error", // Changed from "failure" to "error"
        draggable: true,
        confirmButtonColor: "#0f4c5c",
      });
    }
  };

  console.log("Submitted Data:", submittedData);

  // Function to fetch the priority tasks
  const fetchData = async () => {
    const response = await getTodoPriorityList();
    setList(response);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const priorityTasks = lists
    ? lists.filter((list) => {
        const createdAtDate = list.createdAt.split("T")[0]; // Get date part (YYYY-MM-DD)
        const inputDate = formattedDate.split("T")[0]; // Get date part (YYYY-MM-DD)
        console.log(createdAtDate, inputDate);
        return createdAtDate === inputDate && list.status === "In Progress"; // Compare dates and check priority
      })
    : [];

  const localTextDate = date.toLocaleDateString(undefined, dateFormat);

  return (
    <div className="todo m-4 mt-7 p-7">
      <div className="flex flex-row gap-2 text-white mb-7 -mt-11">
        <div className="flex w-30 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> TO DO</h3>
        </div>
      </div>
      <div className="h-106">
        <div className="bg-[#0F4C5C] h-full overflow-auto">
          <div className="font-medium text-white p-6 text-3xl sticky top-0 bg-[#0F4C5C] z-30">
            {localTextDate}
          </div>
          <ul className="list-disc list-inside px-7 py-2 flex flex-col gap-2">
            {priorityTasks.length === 0 ? (
              <div className="text-white flex items-center justify-center p-3 border border-white rounded-md font-bold">
                No tasks available.
              </div>
            ) : priorityTasks ? (
              priorityTasks.map((item, index) => (
                <li
                  key={index}
                  className="text-white flex items-center p-3 border border-white rounded-md"
                >
                  <div className="relative group">
                    <IoMdAddCircleOutline
                      className="transform scale-150 cursor-pointer"
                      // defaultChecked={false}
                      onClick={async (e) => {
                        const priorityTasks = lists
                          ? lists.filter((list) => list.priority === true)
                              .length
                          : 0;
                        console.log("Priority Tasks:", priorityTasks);
                        // Check if the checkbox is being checked
                        if (priorityTasks >= 5) {
                          e.preventDefault(); // Prevent the checkbox from being checked
                          await Swal.fire({
                            title: "You can only have 5 priority tasks!",
                            icon: "warning",
                            draggable: true,
                            confirmButtonColor: "#0f4c5c",
                          });
                        } else {
                          confirmation(
                            "Add this task to priority?",
                            item._id,
                            updateTodo,
                            true
                          );
                        }
                      }}
                    />
                    <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                      Add to Priority
                    </span>
                  </div>
                  <div className="px-4 flex flex-col">
                    <span className="font-bold text-lg">{item.task}</span>
                    <div className="flex-1 px-3">Notes</div>
                  </div>
                  <div className="flex flex-1 justify-end items-center pr-3 gap-2 relative group">
                    <FaEdit className="text-2xl" onClick={openModal} />
                    <input
                      type="checkbox"
                      className="transform scale-150 cursor-pointer flex items-center justify-center"
                      defaultChecked={false}
                      onClick={async (e) => {
                        if (e.currentTarget.checked) {
                          confirmation(
                            "Are you done with this task?",
                            item._id,
                            updateTodo,
                            false,
                            "Done"
                          );
                        }
                      }}
                    />
                    <span className="absolute left-full transform -translate-x-22 -top-8 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Done with this task?
                    </span>
                  </div>
                </li>
              ))
            ) : null}
          </ul>
          <ModalEdit
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
