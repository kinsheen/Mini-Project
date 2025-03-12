import { useState } from "react";
import Modal from "../components/modal";
import { postCreateToDo } from "../api/context";
import { FaTasks } from "react-icons/fa";
import Swal from "sweetalert2";
import { formatLocalDateToISO } from "../helpers/dateToLocal";

const CreateTodo = () => {
  //   const handelAddTodo = () = {

  // // const response = await postCreateToDo(day, task, status, priority);
  //   }
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
      console.log("Submitted Data Date:", formatLocalDateToISO(day));

      const response = await postCreateToDo(
        dayOfWeek,
        task,
        "Unassigned",
        false,
        formatLocalDateToISO(day)
      );

      // Assuming the response contains the created data directly
      if (response) {
        setSubmittedData({ day, task });
        console.log("To-do created successfully:", response);
        Swal.fire({
          title: "Successfully Added a Task!",
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
          title: "Failed Adding a Task!",
          icon: "error", // Changed from "failure" to "error"
          draggable: true,
          confirmButtonColor: "#0f4c5c",
        });
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error occurred while creating to-do:", error);
      Swal.fire({
        title: "Failed Adding a Task!",
        icon: "error", // Changed from "failure" to "error"
        draggable: true,
        confirmButtonColor: "#0f4c5c",
      });
    }
  };

  console.log("Submitted Data:", submittedData);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button
          className="flex flex-row justify-between gap-2 bg-primary p-3 w-23 rounded hover:bg-primary hover:bg-primary/70 transition duration-200 md:w-65"
          onClick={openModal}
        >
          <div className="font-inter flex items-center font-bold text-[9px] text-white mx-auto md:text-lg">
            Add Task
          </div>
          <FaTasks className="text-md text-white md:text-2xl" />
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateTodo;
