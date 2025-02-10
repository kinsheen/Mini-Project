import { useState } from "react"

interface AchievementModalProps {
  isOpen: boolean
  isUpdate: boolean
  onClose: () => void
  onSubmit: (description: string) => void
}

const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  isUpdate,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(description)
    setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        className="border-2 w-200 bg-[#B7C9CE] p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        {!isUpdate ? (
          <div className="mt-10">
            <label className="block text-3xl font-semibold mb-2">
              Enter New Achievement
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-400 bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
              placeholder="Enter achievement description..."
              required
            />
          </div>
        ) : (
          <div className="mt-10">
            <label className="block text-3xl font-semibold mb-2">
              Add Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-400 bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[20px] font-sm"
              placeholder="Enter achievement notes..."
              required
            />
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="mr-2 px-4 py-2 text-md font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pinter"
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
