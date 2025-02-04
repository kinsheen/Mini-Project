import { FaPlus, FaList, FaTrashCan } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import { useEffect, useState } from "react"
import { toDoResponseArray } from "../interfaces/types"
import {
  addToDoPriority,
  getTodoPriorityList,
  updateToDo,
} from "../api/context"

const Todo = () => {
  const [todos, setTodos] = useState<toDoResponseArray | undefined>([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodoPriorityList()
        setTodos(response)
      } catch (error) {
        console.log("first error", error)
        setError("An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCurrentDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const currentDay = days[new Date().getDay()]
    return currentDay
  }

  const addToPriority = (id: string) => {
    return (
      <div className="w-5 ml-2 flex-none relative group">
        <FaPlus
          className="cursor-pointer"
          onClick={async () => {
            await addToDoPriority(id)
            window.location.reload()
          }}
        />
        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
          Add to Priority
        </span>
      </div>
    )
  }

  return (
    <div className="todo m-4 mt-7 p-7">
      <div className="flex flex-row gap-2 text-white mb-7 -mt-11">
        <div className="flex w-30 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> TO DO</h3>
        </div>
        {/* <div className="flex w-30 bg-[#0F4C5C] rounded-md p-2">
          <FaPlus className="mt-1 mx-1" />
          <h3 className="">CREATE</h3>
        </div> */}
      </div>

      <div className="flex  flex-row flex-nowrap gap-2 overflow-auto">
        <div className="min-w-85 basis-1/5">
          <h5>Monday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {todos
              ?.filter((todo) => todo.day === "Monday")
              .map((item) => {
                return (
                  <ul className="list-disc list-inside p-2">
                    <li className="text-white flex items-start">
                      <span className="mr-2">•</span>
                      <div className="flex flex-1">
                        <div className="flex-1">{item.task}</div>
                        {/* <div className="w-5 flex-none relative group">
                        <FaEdit className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Edit
                        </span>
                      </div>
                      <div className="w-5 ml-2 flex-none relative group">
                        <FaTrashCan className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Delete
                        </span>
                      </div> */}
                        {getCurrentDay() == "Monday"
                          ? addToPriority(item._id)
                          : null}
                      </div>
                    </li>
                  </ul>
                )
              })}
          </div>
        </div>

        <div className="min-w-85 basis-1/5">
          <h5>Tuesday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {todos
              ?.filter((todo) => todo.day === "Tuesday")
              .map((item) => {
                return (
                  <ul className="list-disc list-inside p-2">
                    <li className="text-white flex items-start">
                      <span className="mr-2">•</span>
                      <div className="flex flex-1">
                        <div className="flex-1">{item.task}</div>
                        {/* <div className="w-5 flex-none relative group">
                        <FaEdit className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Edit
                        </span>
                      </div>
                      <div className="w-5 ml-2 flex-none relative group">
                        <FaTrashCan className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Delete
                        </span>
                      </div> */}
                        {getCurrentDay() == "Tuesday"
                          ? addToPriority(item._id)
                          : null}
                      </div>
                    </li>
                  </ul>
                )
              })}
          </div>
        </div>

        <div className="min-w-85 basis-1/5">
          <h5>Wednesday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {todos
              ?.filter((todo) => todo.day === "Wednesday")
              .map((item) => {
                return (
                  <ul className="list-disc list-inside p-2">
                    <li className="text-white flex items-start">
                      <span className="mr-2">•</span>
                      <div className="flex flex-1">
                        <div className="flex-1">{item.task}</div>
                        {/* <div className="w-5 flex-none relative group">
                        <FaEdit className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Edit
                        </span>
                      </div>
                      <div className="w-5 ml-2 flex-none relative group">
                        <FaTrashCan className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Delete
                        </span>
                      </div> */}
                        {getCurrentDay() == "Wednesday"
                          ? addToPriority(item._id)
                          : null}
                      </div>
                    </li>
                  </ul>
                )
              })}
          </div>
        </div>

        <div className="min-w-85 basis-1/5">
          <h5>Thursday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {todos
              ?.filter((todo) => todo.day === "Thursday")
              .map((item) => {
                return (
                  <ul className="list-disc list-inside p-2">
                    <li className="text-white flex items-start">
                      <span className="mr-2">•</span>
                      <div className="flex flex-1">
                        <div className="flex-1">{item.task}</div>
                        {/* <div className="w-5 flex-none relative group">
                        <FaEdit className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Edit
                        </span>
                      </div>
                      <div className="w-5 ml-2 flex-none relative group">
                        <FaTrashCan className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Delete
                        </span>
                      </div> */}
                        {getCurrentDay() == "Thursday"
                          ? addToPriority(item._id)
                          : null}
                      </div>
                    </li>
                  </ul>
                )
              })}
          </div>
        </div>

        <div className="min-w-85 basis-1/5">
          <h5>Friday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {todos
              ?.filter((todo) => todo.day === "Friday")
              .map((item) => {
                return (
                  <ul className="list-disc list-inside p-2">
                    <li className="text-white flex items-start">
                      <span className="mr-2">•</span>
                      <div className="flex flex-1">
                        <div className="flex-1">{item.task}</div>
                        {/* <div className="w-5 flex-none relative group">
                        <FaEdit className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Edit
                        </span>
                      </div>
                      <div className="w-5 ml-2 flex-none relative group">
                        <FaTrashCan className="cursor-pointer" />
                        <span className="absolute left-1/2 -top-8 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                          Delete
                        </span>
                      </div> */}
                        {getCurrentDay() == "Friday"
                          ? addToPriority(item._id)
                          : null}
                      </div>
                    </li>
                  </ul>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
