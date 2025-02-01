import { FaEdit } from "react-icons/fa"
import { FaList, FaPlus, FaTrashCan } from "react-icons/fa6"

const Achievement = () => {
  const achievement = [
    {
      id: 1,
      title: "Achievement 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Achievement 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Achievement 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Achievement 4",
      description: "Description 4",
    },
    {
      id: 5,
      title: "Achievement 5",
      description: "Description 5",
    },
    {
      id: 6,
      title: "Achievement 6",
      description: "Description 6",
    },
  ]

  return (
    <div className="achievement m-4 mt-7 p-7">
      <div className="flex flex-row gap-2 mb-13 -mt-11 text-white">
        <div className="flex w-40 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> ACHIEVEMENT</h3>
        </div>
        <div className="flex w-30 bg-[#0F4C5C] rounded-md p-2">
          <FaPlus className="mt-1 mx-1" />
          <h3 className="">CREATE</h3>
        </div>
      </div>

      <div className="achievement-box h-100 bg-[#0F4C5C]">
        {achievement.map((task) => {
          return (
            <ul className="list-disc list-inside p-2">
              <li className="text-white flex items-start">
                <span className="mr-2">•</span>
                <div className="flex flex-1">
                  <div className="flex-1">{task.description}</div>
                  <div className="w-5 flex-none relative group">
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
                  </div>
                </div>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default Achievement
