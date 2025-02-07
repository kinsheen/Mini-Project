import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: string) => void; // Callback to handle form submission
}

const ModalEdit: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(task); // Pass values to parent
    setTask("");
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg shadow-lg p-6 w-1/4">
        {/* Changed width to 50% */}
        <h2 className="text-xl font-bold mb-4 font-medium">Add Notes</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            Note:
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded p-2 mt-1 h-32 resize-none font-medium bg-white" // Added height and disabled resizing
              placeholder="Enter your notes here..."
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
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
