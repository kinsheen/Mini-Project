import { useEffect, useState } from 'react'
import { getToDoByField } from '../api/context'
import { TodoResponse } from './Accomplishment'

const Prio = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [priorities, setPriorities] =
        useState<TodoResponse[]>([])

    const getPriorities = async () => {
        const response = await getToDoByField("status", "Unassigned")
        console.log('res=>', response)
        setPriorities(response)
    }

    useEffect(() => {
    getPriorities()
    }, [])
    
  return (
    <div className="border-2 w-full p-3">
      <div className="border-2 w-full h-full bg-[#0F4C5C] rounded-xl">
        {priorities?.length < 0 ? (
          <></>
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
  )
}

export default Prio