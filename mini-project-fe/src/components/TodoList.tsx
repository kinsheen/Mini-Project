import { FaRegEdit } from "react-icons/fa"
import { MdOutlinePlaylistRemove } from "react-icons/md"
import { TiPlusOutline } from "react-icons/ti"
import { updateTask } from "../api/context"
import Swal from "sweetalert2"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import EditTaskModal from "../modals/ EditTaskModal"
import { TaskStatus, UpdateTaskProps } from "../interfaces/types"

type TodoListProps = {
  index: number
  task: string
  note?: string
  id: number
  fetchTodos: () => void
  is_priority: boolean
}

const TodoList = ({
  index,
  task,
  note,
  id,
  fetchTodos,
  is_priority,
}: TodoListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleUpdate = (data: UpdateTaskProps) => {
    Swal.fire({
      title: "Add this task to Priority?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0F4C5C",
      cancelButtonColor: "bg-gray-400",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTask(data)
        window.location.reload()

        Swal.fire({
          title: "Added!",
          text: "Your item has been added.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      }
    })
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = (data: UpdateTaskProps) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F4C5C",
      cancelButtonColor: "bg-gray-400",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTask(data)
        fetchTodos()
        window.location.reload()

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      }
    })
  }

  const handleCheckboxClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked

    Swal.fire({
      title: "Add this to accomplishments?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      confirmButtonColor: "#0F4C5C",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTask({ id, status: "Done", is_priority: false, updatedAt: new Date().toISOString() })
        fetchTodos()
        window.location.reload()

        Swal.fire({
          title: "Added!",
          text: "Your item has been added to accomplishments.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      } else {
        event.target.checked = !isChecked
      }
    })
  }

  const handleSubmit = async (task?: string, note?: string) => {
    await updateTask({ id, task, note })

    Swal.fire({
      title: "Succesfully Edited a Task!",
      icon: "success",
      draggable: true,
      confirmButtonColor: "#0F4C5C",
    })

    fetchTodos()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row my-2 rounded border-2 text-white mx-1 text-sm md:text-md lg:text-xl p-1 gap-2"
    >
      <input
        type="checkbox"
        className="w-4 h-4 accent-blue-500 cursor-pointer mt-[7px]"
        onChange={handleCheckboxClick}
      />
      <div {...attributes} {...listeners} className="flex-1 cursor-move">
        <div>
          {index + 1}. {task}
        </div>
        <div className="text-sm">{note ? `- ${note}` : null}</div>
      </div>
      <div className="flex relative group ">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => {
            handleUpdate({ id, is_priority: true })
          }}
        >
          {is_priority ? null : <TiPlusOutline className=" lg:h-6 lg:w-6 " />}
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Add to Priority
        </span> */}
      </div>
      <div className="flex relative group ">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <FaRegEdit className="" />
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Edit
        </span> */}
      </div>
      <div className="flex relative group ">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => handleRemove({ id, status: TaskStatus.UNASSIGNED })}
        >
          <MdOutlinePlaylistRemove className=" lg:h-7 lg:w-7" />
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Remove
        </span> */}
      </div>

      <EditTaskModal
        isOpen={isOpen}
        task={task}
        note={note}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default TodoList