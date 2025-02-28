import { FaRegEdit } from "react-icons/fa"
import { MdOutlinePlaylistRemove, MdPlaylistRemove } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import { TiPlusOutline } from "react-icons/ti"

const TodoList = ({ task }: {task: string}) => {
  return (
    <div className="flex flex-row my-1 rounded border-2 text-white mx-1 text-sm md:text-md lg:text-xl p-1 gap-2">
      <div className="flex-1">{task}</div>
      <div className="flex relative group ">
        <button className="cursor-pointer transition-transform duration-200 hover:scale-140">
          <TiPlusOutline className=" lg:h-6 lg:w-6" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Add to Priority
        </span>
      </div>
      <div className="flex relative group ">
        <button className="cursor-pointer transition-transform duration-200 hover:scale-140">
          <FaRegEdit />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Edit
        </span>
      </div>
      <div className="flex relative group ">
        <button className="cursor-pointer transition-transform duration-200 hover:scale-140">
          <MdOutlinePlaylistRemove className=" lg:h-7 lg:w-7" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Remove
        </span>
      </div>
    </div>
  )
}

export default TodoList