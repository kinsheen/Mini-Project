import React, { useEffect, useState } from "react";
import { userResponseArray } from "../interfaces/types";
import { getUser, updateUser } from "../api/context";
import Swal from "sweetalert2";
import Modal from "../components/modalAccountEdit";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface TaskListProps {
  searchTerm: string;
}

const AdminTable: React.FC<TaskListProps> = ({ searchTerm }) => {
  const [lists, setList] = useState<userResponseArray | null>(null);
  const [id, setId] = useState<number>(0);
  const [user, setUser] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    username: string;
    role: string;
    status: string;
  } | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7; // Adjust the number of items per page as needed

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleSubmit = async (
    username: string,
    role: string,
    status: string
  ) => {
    try {
      const response = await updateUser(id, username, role, status);

      // Assuming the response contains the created data directly
      if (response) {
        setSubmittedData({ username, role, status });
        console.log("To-do created successfully:", response);
        Swal.fire({
          title: "Success",
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
          title: "Failed to Edit User!",
          icon: "error", // Changed from "failure" to "error"
          draggable: true,
          confirmButtonColor: "#0f4c5c",
        });
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error occurred while creating to-do:", error);
      Swal.fire({
        title: "Failed to Edit User!",
        icon: "error", // Changed from "failure" to "error"
        draggable: true,
        confirmButtonColor: "#0f4c5c",
      });
    }
  };

  console.log(submittedData);

  const fetchData = async () => {
    const response = await getUser();
    setList(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const priorityTasks = lists || [];
  const filteredTasks = priorityTasks.filter((task) =>
    task.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <div className="bg-primary mx-5 my-5 md:mx-15">
      <div className="flex justify-center p-10">
        <table className="w-full text-white border-2">
          <thead className="border-3 ">
            <tr>
              <th className="py-5 px-1 text-center w-1/5">USERNAME</th>
              <th className="py-2 px-1 text-center w-1/5">ROLE</th>
              <th className="py-2 px-1 text-center w-1/5">PASSWORD</th>
              <th className="py-2 px-1 text-center w-1/5">STATUS</th>
              <th className="py-2 px-1 text-center w-1/5">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr className="border-2" key={user.id}>
                <td className="py-4 text-center w-1/5">{user.username}</td>
                <td className="py-2 text-center w-1/5">{user.role}</td>
                <td className="py-2 text-center font-bold w-1/5">********</td>
                <td className="py-2 text-center w-1/5">{user.status}</td>
                <td className="py-2 text-center w-1/5">
                  <button className="bg-white rounded-md py-1 px-4">
                    <span
                      className="text-primary font-bold"
                      onClick={() => {
                        setId(user.id);
                        openModal();
                        setUser(user.username);
                        setRole(user.role);
                        setStatus(user.status);
                      }}
                    >
                      Edit
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          userName={user}
          staTus={status}
          roLe={role}
        />
      </div>
      <div className="flex justify-end flex-row gap-3 mr-4 pb-3">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-primary text-white text-3xl rounded px-4 py-2"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        <span className="self-center text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="bg-primary text-white text-3xl rounded px-4 py-2"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
