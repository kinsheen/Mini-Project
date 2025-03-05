import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"
import { TiExportOutline } from "react-icons/ti"
import {
  formatDate,
  formattedSelectedDate,
  formattedTaskDate,
  getHourMinute,
} from "../helpers/dateToLocal"
import { getToDoByField } from "../api/context"
import { TaskField, TaskProps, TaskStatus } from "../interfaces/types"

const ExportCsvModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [todos, setTodos] = useState<TaskProps[]>([])
  const [accomplishments, setAccomplishments] = useState<TaskProps[]>([])
  const [priorities, setPriorities] = useState<TaskProps[]>([])

  const fetchAccomplishments = async () => {
    const response = await getToDoByField(TaskField.STATUS, TaskStatus.DONE)
    const filteredResponse = response?.filter(
      (item: TaskProps) =>
        formattedTaskDate(item.createdAt) === formattedSelectedDate()
    )

    setAccomplishments(filteredResponse)
  }

  const getPriorities = async () => {
    const response = await getToDoByField(
      TaskField.STATUS,
      TaskStatus.IN_PROGRESS
    )
    const filteredResponse = response?.filter(
      (item) =>
        item.is_priority === true &&
        formattedTaskDate(item.createdAt) === formattedSelectedDate()
    )
    setPriorities(filteredResponse)
  }

  const fetchTodos = async () => {
    const response = await getToDoByField(
      TaskField.STATUS,
      TaskStatus.IN_PROGRESS
    )
    const filteredResponse = response?.filter(
      (item) => formattedTaskDate(item.createdAt) === formattedSelectedDate()
    )
    setTodos(filteredResponse)
  }

  useEffect(() => {
    fetchAccomplishments()
    getPriorities()
    fetchTodos()
  }, [])

  // Function to export CSV
  const exportToCsv = () => {
    const headers = ["Task Id", "Time", "Task", "Note", "Status"]
    const combinedArray = todos.concat(priorities, accomplishments)
    const rows = combinedArray.map((task) => [
      task.id,
      task.createdAt,
      task.task,
      task.note,
      task.status,
    ])

    // Add headers to rows
    const csvContent = [headers, ...rows]
      .map((e) => e.join(",")) // Convert each row to CSV format
      .join("\n")

    // Create a Blob and trigger download
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    }) // UTF-8 BOM
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    const timestamp = Date.now()
    link.setAttribute("download", `${timestamp}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderTable = (data: TaskProps[], title: string) => (
    <div className="w-full p-2 mb-10">
      <h2 className="text-xl font-bold text-center bg-[#0F4C5C] text-white p-3 rounded-md">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#B7C9CE]">
              <th className="p-3 border w-15">#</th>
              <th className="p-3 border">Task Id</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Task</th>
              <th className="p-3 border">Note</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index} className="text-center border bg-white">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{task.id}</td>
                <td className="p-2 border">{getHourMinute(task.createdAt)}</td>
                <td className="p-2 border">{task.task}</td>
                <td className="p-2 border">{task.note}</td>
                <td
                  className={`p-2 border ${
                    task.status === TaskStatus.DONE
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-1">
      <div className="border-2 w-400 h-[90%] bg-[#B7C9CE] p-5 rounded-md overflow-auto">
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-4">
            📊 Daily Task Report - {formatDate(new Date() as unknown as string)}
          </h2>
          <div className="flex flex-wrap justify-center gap-5">
            {renderTable(priorities, "Priority Task")}
            {renderTable(todos, "Todo Task")}
            {renderTable(accomplishments, "Accomplishment Task")}
          </div>
        </div>

        <hr className="my-5" />

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="flex gap-1 items-center bg-trasparent text-[#0F4C5C] text-bold border-4 px-4 py-2 rounded-md hover:bg-[#0a3540]  hover:text-white hover:font-bold hover:scale-90 hover:border-4"
            onClick={onClose}
          >
            <FaX className="h-5 w-5" /> Cancel
          </button>
          <button
            className="flex gap-1 items-center bg-[#0F4C5C] text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-[#0F4C5C] hover:font-bold hover:scale-90 hover:border-4"
            onClick={exportToCsv}
          >
            <TiExportOutline className="h-7 w-7" /> Export CSV
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportCsvModal
