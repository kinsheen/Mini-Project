import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (day: string, task: string) => void; // Callback to handle form submission
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [day, setDay] = useState("");
  const [task, setTask] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(day, task); // Pass values to parent
    setDay("");
    setTask("");
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create New Day</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Day:
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Task:
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-primary text-white rounded px-4 py-2 hover:bg-secondary transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
