import { useEffect, useState } from 'react'
import { getToDoByField } from '../api/context'
import { TodoResponse } from './Accomplishment'
import PriorityList from "../components/PriorityList"
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

const Prio = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [priorities, setPriorities] = useState<TodoResponse[]>([])

  const getPriorities = async () => {
    const response = await getToDoByField("status", "In Progress")
    const filteredResponse = response?.filter(
      (item) => item.is_priority === true
    )
    setPriorities(filteredResponse)
  }

  useEffect(() => {
    getPriorities()
  }, [])

  const getTaskPos = (id: UniqueIdentifier | undefined) =>
    priorities.findIndex((item: TodoResponse) => item.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) return

    setPriorities((tasks) => {
      const originalPos = getTaskPos(active?.id)
      const newPos = getTaskPos(over?.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="border-2 w-full p-3">
          <SortableContext
            items={priorities.map((item: TodoResponse) => ({
              id: item.id,
            }))}
            strategy={verticalListSortingStrategy}
          >
            <div className="border-2 w-full h-full bg-[#0F4C5C] rounded-xl">
              {priorities?.length > 0 ? (
                <>
                  {priorities?.map((item) => {
                    return (
                      <PriorityList
                        task={item.task}
                        key={item.id}
                        id={item.id}
                        getPriorities={getPriorities}
                      />
                    )
                  })}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm md:text-md lg:text-lg text-white w-full text-center border-2 p-1 mx-1 rounded-md">
                      No Priority for Today!...
                    </p>
                  </div>
                </>
              )}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </>
  )
}

export default Prio