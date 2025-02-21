import { useEffect, useState } from "react";
import { FaList, FaPlus, } from "react-icons/fa6"
import { getToDoByField, postCreateToDo } from "../api/context";
import AchievementList from "../components/AccomplishmentList";
import { DndContext, DragEndEvent, UniqueIdentifier, closestCorners } from "@dnd-kit/core"
import {arrayMove, SortableContext,verticalListSortingStrategy} from "@dnd-kit/sortable"
import AchievementModal from "../components/AchievementModal";
import Swal from "sweetalert2";

export type TodoResponse = {
  id: number
  userId: number
  day: string
  task: string
  note?: string
  status: string
  is_priority: boolean
  createdAt: string
  deletedAt?: string
  updatedAt?: string
}

const Accomplishment = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [accomplishments, setAccomplishments] =
    useState<TodoResponse[]>([])

  const date = new Date()
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

  const fetchAchievements = async () => {
    const response = await getToDoByField(
      "status",
      "Done"
    )
    const accomplishments = response?.filter((item) => item.day === dayName)
    setAccomplishments(accomplishments)
  }

  const handleSubmit = async (description?: string) => {
      await postCreateToDo(
        dayName,
        description || "",
        "Done",
        false
      )

      Swal.fire({
        title: "Successfully Added a Task!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#0F4C5C",
      })
    await fetchAchievements()
  }

  useEffect(() => {
    fetchAchievements()
  }, [])

  const getTaskPos = (id: UniqueIdentifier | undefined) =>
    accomplishments.findIndex((item: TodoResponse) => item.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) return

    setAccomplishments((tasks) => {
      const originalPos = getTaskPos(active?.id)
      const newPos = getTaskPos(over?.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <div className="achievement m-5 mt-7 p-7">
      <div className="flex flex-row gap-2 -mt-12 text-white">
        <div className="flex w-50 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> ACCOMPLISHMENT</h3>
        </div>
        <button
          onClick={async () => {
            setIsOpen(true)
          }}
          className="flex w-30 bg-[#0F4C5C] rounded-md p-2 hover:bg-[#0a3540] transition-colors"
        >
          <FaPlus className="mt-1 mx-1" />
          <h3 className="cursor-pointer">CREATE</h3>
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="achievement-box h-106 bg-[#0F4C5C] mt-8 p-3 overflow-auto">
          <SortableContext
            items={accomplishments.map((item: TodoResponse) => ({
              id: item.id,
            }))}
            strategy={verticalListSortingStrategy}
          >
            {accomplishments.length > 0 ? (
              <>
                {accomplishments.map((item: TodoResponse) => (
                  <AchievementList
                    id={item.id}
                    task={item.task}
                    note={item?.note}
                    key={item.id}
                    fetchAchievements={fetchAchievements}
                  />
                ))}
              </>
            ) : (
              <div className="text-center text-white text-2xl mt-10 border-2 border-white rounded-md p-3">
                No Achievement for Today!...
              </div>
            )}
          </SortableContext>
        </div>
      </DndContext>

      <AchievementModal
        isOpen={isOpen}
        task={""}
        note={""}
        isUpdate={false}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Accomplishment
