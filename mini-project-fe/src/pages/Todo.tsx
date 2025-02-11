import { FaList } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { dateFormat, toDoResponseArray } from "../interfaces/types";
import { getTodoPriorityList, updateTodo } from "../api/context";
import { formatLocalDateToISO } from "../helpers/dateToLocal";
import React from "react";
import Swal from "sweetalert2";
import { confirmation } from "../helpers/SwalDelete";
import ModalEdit from "../components/modalEdit";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineSpeakerNotes } from "react-icons/md";

interface DisplayDateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: Date | any;
}

const Todo: React.FC<DisplayDateProps> = ({ date }) => {
  const [lists, setList] = useState<toDoResponseArray | null>(null);
  const [noteId, setNoteId] = useState<number>(0);
  const formattedDate = formatLocalDateToISO(date);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    task: string;
  } | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (task: string) => {
    try {
      const response = await updateTodo(+noteId, false, "In Progress", task);

      // Assuming the response contains the created data directly
      if (response) {
        setSubmittedData({ task });
        console.log("Note Added successfully:", response);
        Swal.fire({
          title: "Successfully Added to Note!",
          icon: "success",
          draggable: true,
          confirmButtonColor: "#0f4c5c", // Customize button color
        }).then(() => {
          window.location.reload();
        });
      } else {
        // Handle the case where response does not contain expected data
        console.error("Failed to create Note: No data returned");
        Swal.fire({
          title: "Failed Adding Note",
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
        // Ensure created_at is a valid string before splitting
        if (!list.created_at) return false;

        const createdAtDate = list.created_at.split("T")[0]; // Get date part (YYYY-MM-DD)
        const inputDate = formattedDate.split("T")[0]; // Get date part (YYYY-MM-DD)
        console.log(createdAtDate, inputDate);

        return createdAtDate === inputDate && list.status === "In Progress"; // Compare dates and check priority
      })
    : [];

  console.log("PRIORITY ATSDISD", priorityTasks);

  const localTextDate = date.toLocaleDateString(undefined, dateFormat);

  return (
    <div className="todo mt-7 px-7 py-7">
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
                          ? lists.filter((list) => list.is_priority === true)
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
                            item.id,
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
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <MdOutlineSpeakerNotes />
                      </div>
                      <div>{item.note}</div>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end items-center pr-3 gap-2 ">
                    <div className="relative group">
                      <MdOutlineSpeakerNotes
                        className="text-2xl mt-0.5 cursor-pointer"
                        onClick={() => {
                          setNoteId(item.id); // Set the note ID
                          openModal(); // Open the modal
                        }}
                      />
                      <span className="absolute left-full transform -translate-x-12 -top-8 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Add Notes
                      </span>
                    </div>

                    <div className="relative group">
                      <input
                        type="checkbox"
                        className="transform scale-150 cursor-pointer"
                        defaultChecked={false}
                        onClick={async (e) => {
                          if (e.currentTarget.checked) {
                            confirmation(
                              "Are you done with this task?",
                              item.id,
                              updateTodo,
                              false,
                              "Done"
                            );
                          }
                        }}
                      />
                      <span className="absolute left-full transform -translate-x-18 -top-8 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Done with this task?
                      </span>
                    </div>
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
