import { useEffect, useState } from "react"
import { getToDoByField } from "../api/context"
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import AccomplishmentList from "../components/AccomplishmentList"
import { TaskField, TaskProps, TaskStatus } from "../interfaces/types"
import {
  formattedSelectedDate,
  formattedTaskDate,
} from "../helpers/dateToLocal"

const Accomplishment = () => {
  const [accomplishments, setAccomplishments] = useState<TaskProps[]>([])

  const fetchAccomplishments = async () => {
    const response = await getToDoByField(TaskField.STATUS, TaskStatus.DONE)
    const filteredResponse = response?.filter(
      (item: TaskProps) =>
        formattedTaskDate(item.createdAt) === formattedSelectedDate()
    )

    setAccomplishments(filteredResponse)
  }

  useEffect(() => {
    fetchAccomplishments()
  }, [])

  const getTaskPos = (id: UniqueIdentifier | undefined) =>
    accomplishments.findIndex((item: TaskProps) => item.id === id)

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
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="w-full p-3 min-h-100">
        <SortableContext
          items={accomplishments.map((item: TaskProps) => ({
            id: item.id,
          }))}
          strategy={verticalListSortingStrategy}
        >
          <div className="border-2 w-full h-full bg-[#0F4C5C]  rounded-xl">
            {accomplishments?.length > 0 ? (
              <>
                {accomplishments.map((item, index) => {
                  return (
                    <AccomplishmentList
                      index={index}
                      task={item.task}
                      note={item?.note}
                      key={item.id}
                      id={item.id}
                      fetchAccomplishments={fetchAccomplishments}
                    />
                  )
                })}
              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm md:text-md lg:text-lg text-white w-full text-center border-2 p-1 mx-1 rounded-md">
                    No Achievement for Today!...
                  </p>
                </div>
              </>
            )}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Accomplishment
