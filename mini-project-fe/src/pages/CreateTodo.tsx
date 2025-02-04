import { useState } from "react";
import Modal from "../components/modal";
import { postCreateToDo } from "../api/context";
import { IoArrowForwardCircle } from "react-icons/io5";
import Swal from "sweetalert2";

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

      const response = await postCreateToDo(
        dayOfWeek,
        task,
        "In Progress",
        false
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
      <div className="flex flex-col gap-2 w-full px-11">
        <div className="flex flex-col justify-start gap-2 md:flex-row ">
          <div>
            <h3 className="bg-primary text-white py-8 px-5 font-inter text-6xl">
              20
            </h3>
          </div>
          <div>
            <h3 className="bg-primary text-white py-8 px-5 font-inter text-6xl">
              25
            </h3>
          </div>
        </div>
        <div className="bg-secondary w-full h-38">
          <div className="flex row items-center gap-2 p-3">
            <div className="bg-primary w-3 h-3 rounded-full" />
            <div className="py-1">
              <span className="font-crimson text-primary">Create New</span>
            </div>
          </div>
          <div className="px-6 flex items-center justify-center">
            <button
              className="flex flex-row gap-2 bg-white text-primary p-3 w-65 rounded hover:bg-primary hover:text-white transition duration-200"
              onClick={openModal}
            >
              <IoArrowForwardCircle className="text-2xl" />

              <div className="font-crimson">Add To Do</div>
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
