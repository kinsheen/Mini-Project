import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: string, role: string, status: string) => void; // Callback to handle form submission
  userName: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
}) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUsername(userName); // Set the day to today's date when the modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, role, status); // Pass values to parent
    setUsername("");
    setRole("");
    setStatus("");
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg shadow-lg p-6 w-100 md:w-1/4">
        <h2 className="text-xl font-bold mb-4 font-medium">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 h-10 resize-none font-medium bg-white"
              placeholder="Enter your task here..."
            />
          </label>
          <label className="block mb-2 font-medium">
            Role:
            <select
              value={role} // Assuming you have a state variable for role
              onChange={(e) => setRole(e.target.value)} // Update the state handler accordingly
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 h-10 font-medium bg-white"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <label className="block mb-2 font-medium">
            Status:
            <select
              value={status} // Assuming you have a state variable for role
              onChange={(e) => setStatus(e.target.value)} // Update the state handler accordingly
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 h-10 font-medium bg-white"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black text-sm font-bold rounded px-4 py-2 hover:bg-gray-400 transition duration-200 font-medium"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded text-sm font-bold px-4 py-2 hover:bg-secondary transition duration-200 font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
