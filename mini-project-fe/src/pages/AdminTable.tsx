import React, { useEffect, useState } from "react";
import { userResponseArray } from "../interfaces/types";
import { getUser } from "../api/context";

interface TaskListProps {
  searchTerm: string;
}

const AdminTable: React.FC<TaskListProps> = ({ searchTerm }) => {
  const [lists, setList] = useState<userResponseArray | null>(null);

  // Function to fetch the priority tasks
  const fetchData = async () => {
    const response = await getUser();
    setList(response);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const priorityTasks = lists || [];

  const filteredTasks = priorityTasks.filter((task) =>
    task.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("USERSSSSSS", filteredTasks);

  return (
    <div className="bg-primary mx-15 my-5 p-5">
      <div className="flex justify-center p-10">
        <table className="w-full text-white border-2">
          <thead className="border-3 ">
            <tr>
              <th className="py-5 text-center w-1/5">USERNAME</th>
              <th className="py-2 text-center w-1/5">ROLE</th>
              <th className="py-2 text-center w-1/5">PASSWORD</th>
              <th className="py-2 text-center w-1/5">STATUS</th>
              <th className="py-2 text-center w-1/5">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((user) => (
              <tr className="border-2" key={user.id}>
                <td className="py-4 text-center w-1/5">{user.username}</td>
                <td className="py-2 text-center w-1/5">{user.role}</td>
                <td className="py-2 text-center font-bold w-1/5">********</td>
                <td className="py-2 text-center w-1/5">{user.status}</td>
                <td className="py-2 text-center w-1/5">
                  <button className="bg-white rounded-md py-1 px-4">
                    <span className="text-primary font-bold">Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
