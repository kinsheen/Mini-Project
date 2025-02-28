import { FaRegEdit } from "react-icons/fa"
import { MdOutlinePlaylistRemove } from "react-icons/md"
import { TiPlusOutline } from "react-icons/ti"
import { updateTask, UpdateTaskProps } from "../api/context"
import Swal from "sweetalert2"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const TodoList = ({
  task,
  id,
  fetchTodos,
}: {
  task: string
  id: number
  fetchTodos: () => void
}) => {
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
        await updateTask({ id, status: "Done", is_priority: false })
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row my-1 rounded border-2 text-white mx-1 text-sm md:text-md lg:text-xl p-1 gap-2"
    >
      <input
        type="checkbox"
        className="w-4 h-4 accent-blue-500 cursor-pointer mt-[5px]"
        onChange={handleCheckboxClick}
      />
      <div {...attributes} {...listeners} className="flex-1 cursor-move">
        {task}
      </div>
      <div className="flex relative group ">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => {
            handleUpdate({ id, is_priority: true })
          }}
        >
          <TiPlusOutline className=" lg:h-6 lg:w-6" />
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Add to Priority
        </span> */}
      </div>
      <div className="flex relative group ">
        <button className="cursor-pointer transition-transform duration-200 hover:scale-140">
          <FaRegEdit />
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Edit
        </span> */}
      </div>
      <div className="flex relative group ">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => handleRemove({ id, status: "Unassigned" })}
        >
          <MdOutlinePlaylistRemove className=" lg:h-7 lg:w-7" />
        </button>
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Remove
        </span> */}
      </div>
    </div>
  )
}

export default TodoList