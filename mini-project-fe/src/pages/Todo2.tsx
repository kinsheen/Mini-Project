import  { useEffect, useState } from 'react'
import { TodoResponse } from './Accomplishment'
import { getToDoByField } from '../api/context'
import TodoList from "../components/TodoList"

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

  return (
    <div className="border-2 w-full p-3">
      <div className="border-2 w-full h-full bg-[#0F4C5C]  rounded-xl">
        {todos?.length > 0 ? (
          <>
            {todos?.map((item) => {
              return (
                <>
                  <TodoList task={item.task} key={item.id} />
                </>
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
    </div>
  )
}

export default Todo2