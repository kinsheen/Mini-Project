import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"
import { TiExportOutline } from "react-icons/ti"
import { formatDate, formattedSelectedDate, formattedTaskDate } from "../helpers/dateToLocal"
import { getToDoByField } from "../api/context"
import { TaskField, TaskProps, TaskStatus } from "../interfaces/types"

const ExportCsvModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
    }) => {
      // Sample data
      const initialTodos: TaskProps[] = [
        {
          id: 1,
          userId: 101,
          task: "Fix UI bugs",
          note: "Check button alignment",
          status: "Pending",
          is_priority: false,
          day: "2025-03-03",
          createdAt: "2025-03-02T08:00:00Z",
          updatedAt: "2025-03-02T10:00:00Z",
        },
        // {
        //   id: 2,
        //   userId: 102,
        //   task: "Write unit tests",
        //   note: "Cover all API functions",
        //   status: "In Progress",
        //   is_priority: false,
        //   day: "2025-03-03",
        //   createdAt: "2025-03-02T09:00:00Z",
        //   updatedAt: "2025-03-02T11:00:00Z",
        // },
        // {
        //   id: 3,
        //   userId: 103,
        //   task: "Refactor codebase",
        //   note: "Improve maintainability",
        //   status: "Pending",
        //   is_priority: false,
        //   day: "2025-03-04",
        //   createdAt: "2025-03-03T07:30:00Z",
        //   updatedAt: "2025-03-03T09:00:00Z",
        // },
        // {
        //   id: 4,
        //   userId: 104,
        //   task: "Fix login issue",
        //   note: "Investigate session bug",
        //   status: "In Progress",
        //   is_priority: false,
        //   day: "2025-03-04",
        //   createdAt: "2025-03-03T08:00:00Z",
        //   updatedAt: "2025-03-03T10:00:00Z",
        // },
        // {
        //   id: 5,
        //   userId: 105,
        //   task: "Review PRs",
        //   note: "Merge approved pull requests",
        //   status: "Pending",
        //   is_priority: false,
        //   day: "2025-03-05",
        //   createdAt: "2025-03-04T10:30:00Z",
        //   updatedAt: "2025-03-04T12:00:00Z",
        // },
      ]

      const initialPriorities: TaskProps[] = [
        {
          id: 6,
          userId: 106,
          task: "Optimize database queries",
          note: "Reduce query execution time",
          status: "In Progress",
          is_priority: true,
          day: "2025-03-03",
          createdAt: "2025-03-02T10:00:00Z",
          updatedAt: "2025-03-02T12:00:00Z",
        },
        {
          id: 7,
          userId: 107,
          task: "Implement caching",
          note: "Reduce server load",
          status: "Pending",
          is_priority: true,
          day: "2025-03-04",
          createdAt: "2025-03-03T11:00:00Z",
          updatedAt: "2025-03-03T13:00:00Z",
        },
        {
          id: 8,
          userId: 108,
          task: "Enhance security",
          note: "Add rate limiting",
          status: "In Progress",
          is_priority: true,
          day: "2025-03-04",
          createdAt: "2025-03-03T12:00:00Z",
          updatedAt: "2025-03-03T14:00:00Z",
        },
        {
          id: 9,
          userId: 109,
          task: "Fix payment gateway",
          note: "Ensure transactions are smooth",
          status: "Pending",
          is_priority: true,
          day: "2025-03-05",
          createdAt: "2025-03-04T13:00:00Z",
          updatedAt: "2025-03-04T15:00:00Z",
        },
        {
          id: 10,
          userId: 110,
          task: "Reduce API latency",
          note: "Optimize response times",
          status: "In Progress",
          is_priority: true,
          day: "2025-03-06",
          createdAt: "2025-03-05T14:00:00Z",
          updatedAt: "2025-03-05T16:00:00Z",
        },
      ]

      const initialAccomplishments: TaskProps[] = [
        {
          id: 11,
          userId: 111,
          task: "Deployed new feature",
          note: "Live on production",
          status: "Completed",
          is_priority: false,
          day: "2025-03-03",
          createdAt: "2025-03-02T11:00:00Z",
          updatedAt: "2025-03-02T13:00:00Z",
        },
        {
          id: 12,
          userId: 112,
          task: "Fixed major bug",
          note: "Resolved critical issue",
          status: "Completed",
          is_priority: false,
          day: "2025-03-04",
          createdAt: "2025-03-03T12:00:00Z",
          updatedAt: "2025-03-03T14:00:00Z",
        },
        {
          id: 13,
          userId: 113,
          task: "Completed API documentation",
          note: "Detailed API guide added",
          status: "Completed",
          is_priority: false,
          day: "2025-03-04",
          createdAt: "2025-03-03T13:00:00Z",
          updatedAt: "2025-03-03T15:00:00Z",
        },
        {
          id: 14,
          userId: 114,
          task: "Improved CI/CD pipeline",
          note: "Automated deployment process",
          status: "Completed",
          is_priority: false,
          day: "2025-03-05",
          createdAt: "2025-03-04T14:00:00Z",
          updatedAt: "2025-03-04T16:00:00Z",
        },
        {
          id: 15,
          userId: 115,
          task: "Added dark mode",
          note: "User preference saved",
          status: "Completed",
          is_priority: false,
          day: "2025-03-06",
          createdAt: "2025-03-05T15:00:00Z",
          updatedAt: "2025-03-05T17:00:00Z",
        },
      ]
      const [todos, setTodos] = useState<TaskProps[]>(initialTodos)
      const [accomplishments, setAccomplishments] = useState<TaskProps[]>(
        initialAccomplishments
      )
      const [priorities, setPriorities] = useState<TaskProps[]>( 
        initialPriorities
      )
      const [tasks] = useState([
        {
          date: "Mar 3, 2025",
          task: "Fix UI bugs",
          type: "Todo",
          status: "Pending",
        },
        {
          date: "Mar 3, 2025",
          task: "Refactor API",
          type: "Priority",
          status: "In Progress",
        },
        {
          date: "Mar 3, 2025",
          task: "Completed Login Flow",
          type: "Accomplishment",
          status: "Completed",
        },
        {
          date: "Mar 4, 2025",
          task: "Write test cases",
          type: "Todo",
          status: "Pending",
        },
        {
          date: "Mar 4, 2025",
          task: "Optimize DB queries",
          type: "Priority",
          status: "In Progress",
        },
        {
          date: "Mar 4, 2025",
          task: "Deployed new feature",
          type: "Accomplishment",
          status: "Completed",
        },
      ])

    //   const fetchAccomplishments = async () => {
    //     const response = await getToDoByField(TaskField.STATUS, TaskStatus.DONE)
    //     const filteredResponse = response?.filter(
    //       (item: TaskProps) =>
    //         formattedTaskDate(item.createdAt) === formattedSelectedDate()
    //     )

    //     setAccomplishments(filteredResponse)
    //   }

    //   const getPriorities = async () => {
    //     const response = await getToDoByField(
    //       TaskField.STATUS,
    //       TaskStatus.IN_PROGRESS
    //     )
    //     const filteredResponse = response?.filter(
    //       (item) =>
    //         item.is_priority === true &&
    //         formattedTaskDate(item.createdAt) === formattedSelectedDate()
    //     )
    //     setPriorities(filteredResponse)
    //   }

    //   const fetchTodos = async () => {
    //     const response = await getToDoByField(
    //       TaskField.STATUS,
    //       TaskStatus.IN_PROGRESS
    //     )
    //     const filteredResponse = response?.filter(
    //       (item) =>
    //         formattedTaskDate(item.createdAt) === formattedSelectedDate()
    //     )
    //     setTodos(filteredResponse)
    //   }

      useEffect(() => {
        // fetchAccomplishments()
        // getPriorities()
        // fetchTodos()
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
      (
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
                    <td className="p-2 border">{task.createdAt}</td>
                    <td className="p-2 border">{task.task}</td>
                    <td className="p-2 border">{task.note}</td>
                    <td
                      className={`p-2 border ${
                        task.status === "Completed"
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
    )

      if (!isOpen) return null

      return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="border-2 w-400 h-[90%] bg-[#B7C9CE] p-5 rounded-md overflow-auto">
            <div className="p-5">
              <h2 className="text-2xl font-bold mb-4">
                📊 Daily Task Report -{" "}
                {formatDate(new Date() as unknown as string)}
              </h2>
              <div className="flex flex-wrap justify-center gap-5">
                {renderTable(todos, "Todo Task")}
                {renderTable(priorities, "Priority Task")}
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
