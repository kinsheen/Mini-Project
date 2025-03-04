import React, { useEffect, useState } from "react";
import { status, toDoResponseArray } from "../interfaces/types";
import { getTodoPriorityList } from "../api/context";

interface TaskListProps {
  searchTerm: string;
}

const AdminTable: React.FC<TaskListProps> = ({ searchTerm }) => {
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

  const priorityTasks = lists
    ? lists.filter((list) => list.status === status.unassigned)
    : [];

  const filteredTasks = priorityTasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredTasks);

  return (
    <div className="bg-primary mx-15 my-5 p-5">
      <div className="flex justify-center p-10">
        <table className="w-full text-white border-2">
          <thead className="border-3 ">
            <tr>
              <th className="py-5 text-center">USERNAME</th>
              <th className="py-2 text-center">ROLE</th>
              <th className="py-2 text-center">PASSWORD</th>
              <th className="py-2 text-center">STATUS</th>
              <th className="py-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2">
              <td className="py-4 text-center">Data 1</td>
              <td className="py-2 text-center">Data 2</td>
              <td className="py-2 text-center font-bold">********</td>
              <td className="py-2 text-center">Data 4</td>
              <td className="py-2 text-center">
                <button className="bg-white rounded-md py-1 px-4">
                  <span className="text-primary font-bold">Edit</span>
                </button>
              </td>
            </tr>
            <tr className="border-2">
              <td className="py-4 text-center">Data 5</td>
              <td className="py-2 text-center">Data 6</td>
              <td className="py-2 text-center font-bold">********</td>
              <td className="py-2 text-center">Data 8</td>
              <td className="py-2 text-center">
                <button className="bg-white rounded-md py-1 px-4">
                  <span className="text-primary font-bold">Edit</span>
                </button>
              </td>
            </tr>
            <tr className="border-2">
              <td className="py-4 text-center">Data 9</td>
              <td className="py-2 text-center">Data 10</td>
              <td className="py-2 text-center font-bold">********</td>
              <td className="py-2 text-center">Data 12</td>
              <td className="py-2 text-center">
                <button className="bg-white rounded-md py-1 px-4">
                  <span className="text-primary font-bold">Edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
