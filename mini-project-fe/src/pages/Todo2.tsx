import  { useEffect, useState } from 'react'
import { TodoResponse } from './Accomplishment'
import { getToDoByField } from '../api/context'
import TodoList from "../components/TodoList"
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

const Todo2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [todos, setTodos] = useState<TodoResponse[]>([])

  const fetchTodos = async () => {
    const response = await getToDoByField("status", "In Progress")
    console.log("todo res=>", response)
    setTodos(response)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

    const getTaskPos = (id: UniqueIdentifier | undefined) =>
      todos.findIndex((item: TodoResponse) => item.id === id)

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event

      if (active.id === over?.id) return

      setTodos((tasks) => {
        const originalPos = getTaskPos(active?.id)
        const newPos = getTaskPos(over?.id)

        return arrayMove(tasks, originalPos, newPos)
      })
    }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="border-2 w-full p-3">
        <SortableContext
          items={todos.map((item: TodoResponse) => ({
            id: item.id,
          }))}
          strategy={verticalListSortingStrategy}
        >
          <div className="border-2 w-full h-full bg-[#0F4C5C]  rounded-xl">
            {todos?.length > 0 ? (
              <>
                {todos?.map((item) => {
                  return (
                    <TodoList
                      task={item.task}
                      key={item.id}
                      id={item.id}
                      fetchTodos={fetchTodos}
                    />
                  )
                })}
              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm md:text-md lg:text-lg text-white w-full text-center border-2 p-1 mx-1 rounded-md">
                    No Task for Today!...
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

export default Todo2