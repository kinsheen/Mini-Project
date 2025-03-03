import { useEffect, useState } from "react"
import { getToDoByField } from "../api/context"
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
import { TaskField, TaskProps, TaskStatus } from "../interfaces/types"
import {
  formattedSelectedDate,
  formattedTaskDate,
} from "../helpers/dateToLocal"

const Todo = () => {
  const [todos, setTodos] = useState<TaskProps[]>([])

  const fetchTodos = async () => {
    const response = await getToDoByField(
      TaskField.STATUS,
      TaskStatus.IN_PROGRESS
    )
    const filteredResponse = response?.filter(
      (item) => formattedTaskDate(item.createdAt) === formattedSelectedDate()
    )
    setTodos(filteredResponse)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const getTaskPos = (id: UniqueIdentifier | undefined) =>
    todos.findIndex((item: TaskProps) => item.id === id)

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
          items={todos.map((item: TaskProps) => ({
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
                      note={item?.note}
                      key={item.id}
                      id={item.id}
                      fetchTodos={fetchTodos}
                      is_priority={item.is_priority}
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

export default Todo
