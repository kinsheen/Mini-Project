import Calendar from "react-calendar"
import "../components/Calendar.css"
import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

type CalendarModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  // Load the stored date from localStorage
  const getStoredDate = () => {
    const storedDate = localStorage.getItem("selectedDate")
    return storedDate ? new Date(JSON.parse(storedDate)) : new Date()
  }

  const [value, setValue] = useState<Value>(getStoredDate())

  const onDateChange = (newValue: Value) => {
    setValue(newValue)
  }

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (value) {
      const myDate = new Date(value as Date)
      const formattedDate = myDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })

      const prevStoredDate = localStorage.getItem("selectedDate")

      // Only update localStorage and reload if the date has actually changed
      if (prevStoredDate !== JSON.stringify(formattedDate)) {
        localStorage.setItem("selectedDate", JSON.stringify(formattedDate))
        window.location.reload()
      }
    }
  }, [value])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="border-2 w-150 h-130 bg-[#B7C9CE] p-5 rounded-md text-2xl">
        <Calendar onChange={onDateChange} value={value} />
        <hr className="mt-5" />
        <button
          className=" flex bg-[#0F4C5C] text-white p-2 rounded-md mt-2 float-end px-4 cursor-pointer  hover:bg-transparent hover:text-[#0F4C5C] hover:font-bold hover:scale-90 hover:border-4"
          onClick={handleClose}
        >
          <FaX className="mt-2 w-5 h-5 mr-1" />
          Close
        </button>
      </div>
    </div>
  )
}

export default CalendarModal
