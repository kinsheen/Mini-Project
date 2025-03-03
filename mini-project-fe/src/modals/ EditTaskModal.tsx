import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

type EditTaskModalProps = {
        isOpen: boolean;
        task: string;
        note?: string;
        onClose: () => void;
        onSubmit: (task: string, note?: string) => void
    };

const EditTaskModal = ({ isOpen, task, note, onClose, onSubmit }: EditTaskModalProps) => {
    const [newTask, setNewTask] = useState<string>("")
    const [newNote, setNewNote] = useState<string>("")
    const [isEditTask, setIsEditTask] = useState<boolean>(false)
    const [isEditNote, setIsEditNote] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(newTask, newNote)
        setIsEditTask(false)
        setIsEditNote(false)
        onClose()
    }
    
    useEffect(() => {
        setNewTask(task || "")
        setNewNote(note || "")
    }, [task, note])

    if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        className="border-2 w-200 bg-[#B7C9CE] p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        {
          <>
            <div className="mt-2">
              <label className="block text-3xl font-semibold mb-15 text-center bg-[#0F4C5C] text-white p-5 rounded-md">
                Edit Task
              </label>
              <div className="flex items-center justify-between w-full  text-black bg-amber-50 rounded-md">
                <div className="flex items-center">
                  <span className="bg-[#0F4C5C]  text-xl font-bold text-white mr-3 px-2 py-3 rounded w-[130px]">
                    Task Name:
                  </span>
                  <span className="text-xl font-bold py-3">{task}</span>
                </div>

                <div className="relative group">
                  <FaEdit
                    className="cursor-pointer text-2xl mr-5"
                    onClick={() => setIsEditTask(!isEditTask)}
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edit Task Title
                  </span>
                </div>
              </div>

              {isEditTask && (
                <textarea
                  autoFocus
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full mb-3 p-2 mt-2 border text-black border-gray-400 outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
                  placeholder="Edit Task Title..."
                />
              )}
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between w-full  text-black bg-amber-50 rounded-md">
                <div className="flex items-center">
                  <span className="bg-[#0F4C5C] text-xl font-bold text-white mr-3 px-2 py-3 rounded  w-[130px]">
                    Task Note:
                  </span>
                  <span className="text-xl font-bold py-3">{note}</span>
                </div>

                <div className="relative group">
                  <FaEdit
                    className="cursor-pointer text-2xl mr-5"
                    onClick={() => setIsEditNote(!isEditNote)}
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edit Task Note
                  </span>
                </div>
              </div>
                          
              {isEditNote && (
                <textarea
                  autoFocus
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full mb-3 p-2 mt-2 border border-gray-400  text-black outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
                  placeholder="Edit Task Note..."
                />
                )}
                          
            </div>
          </>
        }

        <hr className="my-5" />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
                setIsEditTask(false)
                setIsEditNote(false)
                onClose()
            }}
            type="button"
            className="cursor-pointer font-bold mr-2 px-4 py-2 text-md  text-gray-700 bg-amber-100 rounded-md hover:bg-gray-200 cursor-pinter"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-md font-medium text-white bg-[#0F4C5C] rounded-md hover:bg-[#0a3540] cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default  EditTaskModal