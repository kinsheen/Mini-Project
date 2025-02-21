import {useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FaEdit } from "react-icons/fa"
import { FaTrashCan } from "react-icons/fa6"
import Swal from "sweetalert2"
import { updateAchievement, updateTodo } from "../api/context"
import { useState } from "react"
import AchievementModal from "./AchievementModal"

type AccomplishmentProps = {
  id: number,
  task: string,
  note?: string, 
  fetchAchievements: () => void
}

const AccomplishmentList = ({ id, task, note, fetchAchievements }: AccomplishmentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const handleDelete = (itemId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F4C5C",
      cancelButtonColor: "bg-gray-400",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTodo(+itemId, false, "In Progress")
        // await deleteTodo(itemId.toString())

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      }

      fetchAchievements()
    })
  }

  const handleSubmit = async (description?: string, notes?: string) => {
  if (isUpdate === true) {
      if (!description && !notes) {
        return
      } else if (!description) {
        await updateAchievement(id, false, "Done", task, notes)
      } else if (!notes) {
        await updateAchievement(id, false, "Done", description, note)
      } else {
        await updateAchievement(id, false, "Done", description, notes)
      }

      Swal.fire({
        title: "Succesfully Edited a Task!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#0F4C5C",
      })
    } 

  fetchAchievements()
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }


  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2 text-white mb-2 rounded-md p-3 flex items-center justify-between"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex-1 flex flex-col items-start cursor-move"
      >
        <p className="font-bold text-xl">{task ? `${task}` : ""}</p>
        <p className="text-md ml-5 italic">{note ? `- ${note}` : ""}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative group inline-block">
          <button
            className="text-white py-2 rounded hover:scale-130"
            onClick={async () => {
              setIsOpen(true)
              setIsUpdate(true)
            }}
          >
            <FaEdit className="text-xl cursor-pointer" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Edit Achievement
          </span>
        </div>

        <div className="relative group inline-block mr-3">
          <button
            className="text-white py-2 rounded hover:scale-130"
            onClick={async () => handleDelete(id)}
          >
            <FaTrashCan className="text-xl cursor-pointer" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Delete Task
          </span>
        </div>
      </div>

      <AchievementModal
        isOpen={isOpen}
        task={task}
        note={note}
        isUpdate={isUpdate}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AccomplishmentList