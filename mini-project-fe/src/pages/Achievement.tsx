import { useState, useEffect } from "react"
import { FaList, FaPlus, FaTrashCan } from "react-icons/fa6"
import {
  deleteTodo,
  getToDoByField,
  getTodoById,
  postCreateToDo,
  updateTodo,
} from "../api/context"
import AchievementModal from "../components/AchievementModal"
import { toDoResponseArray } from "../interfaces/types"
import { FaEdit } from "react-icons/fa"

const Achievement = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [id, setId] = useState(0)
  const [achievements, setAchievements] = useState<toDoResponseArray>([])
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const fetchAchievements = async () => {
    const response = await getToDoByField("status", "Done")
    fetchTodo()
    setAchievements(response || [])
  }

  const fetchTodo = async () => {
    const response = await getTodoById("9")
    console.log(response)
  }

  const handleSubmit = async (description: string) => {
    if (isUpdate === true) {
      await updateTodo(id, false, "Done", description)
    } else {
      await postCreateToDo(
        new Date().toLocaleDateString(),
        description,
        "Done",
        false,
        new Date().toLocaleDateString()
      )
    }

    fetchAchievements()
  }

  useEffect(() => {
    fetchAchievements()
  }, [shouldRefetch])

  return (
    <div className="achievement mt-7 p-7">
      <div className="flex flex-row gap-2 mb-13 -mt-11 text-white">
        <div className="flex w-40 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> ACHIEVEMENT</h3>
        </div>
        <button
          onClick={async () => {
            setIsOpen(true)
            setIsUpdate(false)
          }}
          className="flex w-30 bg-[#0F4C5C] rounded-md p-2 hover:bg-[#0a3540] transition-colors"
        >
          <FaPlus className="mt-1 mx-1" />
          <h3 className="cursor-pointer">CREATE</h3>
        </button>
      </div>

      <div className="achievement-box h-100 bg-[#0F4C5C]">
        {achievements?.map((item, index) => (
          <ul key={index} className="p-2">
            <li className="text-white flex items-start">
              <div className="flex flex-1">
                <div className="flex-1">
                  <p className="font-bold text-xl">
                    {index + 1}. {item.task}
                  </p>
                  <span className="text-md ml-5 italic">- {item.note}</span>
                </div>
              </div>
              <div className="relative group inline-block">
                <button
                  className="text-white py-2 mx-2 rounded"
                  onClick={() => {
                    setIsOpen(true)
                    setIsUpdate(true)
                    setId(+item.id)
                  }}
                >
                  <FaEdit className="text-xl cursor-pointer" />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Add notes
                </span>
              </div>
              <div className="relative group inline-block">
                <button className="text-white py-2 rounded">
                  <FaTrashCan
                    className="text-xl cursor-pointer"
                    onClick={async () => {
                      await deleteTodo(item.id)
                      setShouldRefetch((prev) => !prev)
                    }}
                  />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Delete
                </span>
              </div>
            </li>
          </ul>
        ))}
      </div>

      <AchievementModal
        isOpen={isOpen}
        isUpdate={isUpdate}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Achievement
