import { useEffect, useState } from 'react'
import { getToDoByField, } from '../api/context'
import AccomplishmentList2 from "../components/AccomplishmentList2"
import { TodoResponse } from "./Accomplishment"
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

const Accomplishment2 = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const [accomplishments, setAccomplishments] =
          useState<TodoResponse[]>([])
    
      const fetchAccomplishments = async () => {
        const response = await getToDoByField("status", "Done")
        console.log("acc res=>", response)
        setAccomplishments(response)
      }

      useEffect(() => {
        fetchAccomplishments()
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
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="border-2 w-full p-3 ">
            <SortableContext
              items={accomplishments.map((item: TodoResponse) => ({
                id: item.id,
              }))}
              strategy={verticalListSortingStrategy}
            >
              <div className="border-2 w-full h-full bg-[#0F4C5C]  rounded-xl">
                {accomplishments?.length > 0 ? (
                  <>
                    {accomplishments.map((item) => {
                      return (
                        <AccomplishmentList2
                          task={item.task}
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

export default Accomplishment2