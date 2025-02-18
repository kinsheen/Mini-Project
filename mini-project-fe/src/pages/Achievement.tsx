import { useState, useEffect } from "react"
import { FaList, FaPlus, FaRegNoteSticky, FaTrashCan } from "react-icons/fa6"
import {
  deleteTodo,
  getToDoByField,
  getTodoById,
  postCreateToDo,
  updateAchievement,
  updateTodo,
} from "../api/context"
import AchievementModal from "../components/AchievementModal"
import { toDoResponseArray } from "../interfaces/types"
import { FaEdit } from "react-icons/fa"
import Swal from "sweetalert2"

const Achievement = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isEditAchievement, setIsEditAchievement] = useState(false)
  const [id, setId] = useState(0)
  const [achievements, setAchievements] = useState<toDoResponseArray>([])
  const [task, setTask] = useState("")
  const [note, setNote] = useState("")
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const fetchAchievements = async () => {
    const response = await getToDoByField("status", "Done")
    setAchievements(response || [])
  }

  const handleSubmit = async (description?: string, notes?: string) => {
    if (isUpdate === true) {
      await updateTodo(id, false, "Done", description)
      Swal.fire({
        title: "Successfully Updated a Task!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#0F4C5C",
      })
    } else if (isEditAchievement === true) {
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
    } else {
      await postCreateToDo(
        new Date().toLocaleDateString(),
        description || "",
        "Done",
        false,
        new Date().toLocaleDateString()
      )

      Swal.fire({
        title: "Successfully Added a Task!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#0F4C5C",
      })
    }

    fetchAchievements()
  }

  const handleDelete = (itemId: string) => {
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
        await deleteTodo(itemId)
        setShouldRefetch((prev) => !prev)
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
          confirmButtonColor: "#0F4C5C",
        })
      }
    })
  }

  useEffect(() => {
    fetchAchievements()
  }, [shouldRefetch])

  return (
    <div className="achievement mt-7 p-7">
      <div className="flex flex-row gap-2 -mt-12 text-white">
        <div className="flex w-40 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> ACHIEVEMENT</h3>
        </div>
        <button
          onClick={async () => {
            setIsOpen(true)
            setIsUpdate(false)
            setIsEditAchievement(false)
          }}
          className="flex w-30 bg-[#0F4C5C] rounded-md p-2 hover:bg-[#0a3540] transition-colors"
        >
          <FaPlus className="mt-1 mx-1" />
          <h3 className="cursor-pointer">CREATE</h3>
        </button>
      </div>

      <div className="achievement-box min-h-106 bg-[#0F4C5C] mt-8 p-3">
        {achievements.length > 0 ? (
          <>
            {achievements &&
              achievements?.map((item, index) => (
                <ul
                  key={index}
                  className="p-2 border-2 border-white rounded-md mb-3"
                >
                  <li className="text-white flex items-start">
                    <div className="flex flex-1">
                      <div className="flex-1">
                        <p className="font-bold text-xl">
                          {index + 1}. {item.task}
                        </p>
                        <span className="text-md ml-5 italic">
                          {item.note ? `- ${item.note}` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="relative group inline-block mt-2">
                      <button
                        className="text-white py-2 mx-2 rounded  hover:scale-135"
                        onClick={async () => {
                          setIsOpen(true)
                          setIsEditAchievement(true)
                          setIsUpdate(false)
                          setId(+item.id)
                          const [data] =
                            (await getTodoById(item.id.toString())) ?? []
                          const { task, note } = data
                          setTask(task)
                          setNote(note)
                        }}
                      >
                        <FaEdit className="text-xl cursor-pointer" />
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Edit Achievements
                      </span>
                    </div>
                    <div className="relative group inline-block mt-2">
                      <button
                        className="text-white py-2 mx-2 rounded  hover:scale-135"
                        onClick={async () => {
                          setIsOpen(true)
                          setIsUpdate(true)
                          setIsEditAchievement(false)
                          setId(+item.id)
                          const [data] =
                            (await getTodoById(item.id.toString())) ?? []
                          const { task, note } = data
                          setTask(task)
                          setNote(note)
                        }}
                      >
                        <FaRegNoteSticky className="text-xl cursor-pointer" />
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Add notes
                      </span>
                    </div>
                    <div className="relative group inline-block mt-2 mr-3 ml-2">
                      <button
                        className="text-white py-2 rounded  hover:scale-135"
                        onClick={async () => handleDelete(item.id.toString())}
                      >
                        <FaTrashCan className="text-xl cursor-pointer" />
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Delete
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
          </>
        ) : (
          <div className="text-center text-white text-3xl mt-10">
            No Achievement for Today!...
          </div>
        )}
      </div>

      <AchievementModal
        isOpen={isOpen}
        task={task}
        note={note}
        isUpdate={isUpdate}
        isEditAchievement={isEditAchievement}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Achievement
