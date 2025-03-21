import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (day: string, task: string) => void; // Callback to handle form submission
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [day, setDay] = useState("");
  const [task, setTask] = useState("");

  // Helper function to format today's date as YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const date = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    if (isOpen) {
      setDay(getCurrentDate()); // Set the day to today's date when the modal opens
    }
  }, [isOpen]);

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
      <div className="bg-secondary rounded-lg shadow-lg p-6 w-100 md:w-1/4">
        <h2 className="text-xl font-bold mb-4 font-medium">
          Create To Do Task
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            Day:
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 font-medium bg-white"
            />
          </label>
          <label className="block mb-2 font-medium">
            Task:
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 h-32 resize-none font-medium bg-white"
              placeholder="Enter your task here..."
            />
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
              Add to do task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
