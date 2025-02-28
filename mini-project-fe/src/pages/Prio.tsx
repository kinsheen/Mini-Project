import { useEffect, useState } from 'react'
import { getToDoByField } from '../api/context'
import { TodoResponse } from './Accomplishment'
import PriorityList from "../components/PriorityList"

const Prio = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [priorities, setPriorities] = useState<TodoResponse[]>([])

  const getPriorities = async () => {
    const response = await getToDoByField("status", "In Progress")
    console.log("res=>", response)
    setPriorities(response)
  }

  useEffect(() => {
    getPriorities()
  }, [])

  return (
    <>
      <div className="border-2 w-full p-3">
        {/* <div className="mb-10 -mt-10 border-2 border-none rounded-md text-center w-30 text-sm md:text-md lg:text-lg p-2 bg-[#0F4C5C] text-white">
            Priority
          </div> */}
        <div className="border-2 w-full h-full bg-[#0F4C5C] rounded-xl">
          {priorities?.length > 0 ? (
            <>
              {priorities?.map((item) => {
                return <PriorityList task={item.task} key={item.id} />
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
      </div>
    </>
  )
}

export default Prio