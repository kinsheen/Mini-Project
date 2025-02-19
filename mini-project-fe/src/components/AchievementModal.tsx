import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"

interface AchievementModalProps {
  isOpen: boolean
  task: string
  note: string
  isUpdate: boolean
  isEditAchievement: boolean
  onClose: () => void
  onSubmit: (description?: string, note?: string) => void
}

const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  task,
  note,
  isUpdate,
  isEditAchievement,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("")
  const [newNote, setNewNote] = useState("")
  const [isEditTask, setIsEditTask] = useState(false)
  const [isEditNote, setIsEditNote] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(description, newNote)
    setIsEditTask(false)
    setIsEditNote(false)
    setDescription(task)
    setNewNote(note)
    onClose()
  }

  useEffect(() => {
    setDescription(task || "")
    setNewNote(note || "")
  }, [task, note])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        className="border-2 w-200 bg-[#B7C9CE] p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        {isEditAchievement === true ? (
          <>
            <div className="mt-2">
              <label className="block text-3xl font-semibold mb-15 text-center bg-[#0F4C5C] text-white p-5 rounded-md">
                Edit Achievements
              </label>
              <div className="flex items-center justify-between w-full bg-amber-50 rounded-md">
                <div className="flex items-center">
                  <span className="bg-[#0F4C5C]  text-xl font-bold text-white mr-3 px-2 py-3 rounded w-[120px]">
                    Task Title:
                  </span>
                  <span className="text-xl font-bold py-3">{task}</span>
                </div>

                <div className="relative group">
                  <FaEdit
                    onClick={() => setIsEditTask(!isEditTask)}
                    className="cursor-pointer text-2xl mr-5"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edit Task Title
                  </span>
                </div>
              </div>

              {isEditTask && (
                <textarea
                  autoFocus
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mb-3 p-2 mt-2 border border-gray-400 outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
                  placeholder="Edit Task Title..."
                />
              )}
            </div>
            <div className="mt-7">
              <div className="flex items-center justify-between w-full bg-amber-50 rounded-md">
                <div className="flex items-center">
                  <span className="bg-[#0F4C5C] text-xl font-bold text-white mr-3 px-2 py-3 rounded  w-[120px]">
                    Task Note:
                  </span>
                  <span className="text-xl font-bold py-3">{note}</span>
                </div>

                <div className="relative group">
                  <FaEdit
                    onClick={() => setIsEditNote(!isEditNote)}
                    className="cursor-pointer text-2xl mr-5"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-md rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Edit Task Note
                  </span>
                </div>
              </div>

              {isEditNote && (
                <textarea
                  autoFocus
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full mb-3 p-2 mt-2 border border-gray-400 outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
                  placeholder="Edit Task Note..."
                />
              )}
            </div>
          </>
        ) : isUpdate === true ? (
          <div className="mt-10">
            <label className="block text-3xl font-semibold mb-15 text-center bg-[#0F4C5C] text-white p-5 rounded-md">
              Add Notes
            </label>
            <textarea
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-400 outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
              placeholder="Enter achievement notes..."
              required
            />
          </div>
        ) : (
          <div className="mt-10">
            <label className="block text-3xl font-semibold mb-2">
              Enter New Achievement
            </label>
            <textarea
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-400 outline-none bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
              placeholder="Enter achievement description..."
              required
            />
          </div>
        )}

        <hr className="my-5" />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              onClose()
              setDescription(task)
              setNewNote(note)
              setIsEditNote(false)
              setIsEditTask(false)
            }}
            type="button"
            className="cursor-pointer font-bold mr-2 px-4 py-2 text-md  text-gray-700 bg-amber-100 rounded-md hover:bg-gray-200 cursor-pinter"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-md font-medium text-white bg-[#0F4C5C] rounded-md hover:bg-[#0a3540] cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AchievementModal
