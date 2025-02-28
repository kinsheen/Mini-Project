import { FaRegEdit } from "react-icons/fa"
import { MdOutlinePlaylistRemove } from "react-icons/md"
import Swal from "sweetalert2"
import { updateTask, UpdateTaskProps } from "../api/context"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"

const AccomplishmentList2 = ({
  task,
  id,
  fetchAccomplishments,
}: {
  task: string
  id: number
  fetchAccomplishments: () => void
}) => {
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
        fetchAccomplishments()
        window.location.reload()

        Swal.fire({
          title: "Removed!",
          text: "Your item has been removed.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      }
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row my-1 rounded border-2 text-white mx-1 text-sm md:text-md lg:text-xl p-1 gap-2"
    >
      <div {...attributes} {...listeners} className="flex-1  cursor-move">
        {task}
      </div>
      <div className="flex relative group">
        <button className="cursor-pointer transition-transform duration-200 hover:scale-140">
          <FaRegEdit />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Edit
        </span>
      </div>
      <div className="flex relative group">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-140"
          onClick={() => handleRemove({ id, status: "In Progress" })}
        >
          <MdOutlinePlaylistRemove className=" lg:h-7 lg:w-7" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Remove
        </span>
      </div>
    </div>
  )
}

export default AccomplishmentList2