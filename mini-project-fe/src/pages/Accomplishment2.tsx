import { useEffect, useState } from 'react'
import { getToDoByField, } from '../api/context'
import { TodoResponse } from '../interfaces/types'

const Accomplishment2 = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const [accomplishments, setAccomplishments] =
          useState<TodoResponse[]>([])
    
      const fetchAchievements = async () => {
          const response = await getToDoByField("status", "Done")
          console.log('res=>', response)
        setAccomplishments(response)
      }
    
      useEffect(() => {
        fetchAchievements()
      }, [])
    
  return (
    <div className="border-2 w-full p-3 ">
      <div className="border-2 w-full h-full bg-[#0F4C5C]  rounded-xl">
        {accomplishments?.length < 0 ? (
          <></>
        ) : (
          <>
            <div className='flex items-center justify-center h-full'>
              <p className='text-sm md:text-md lg:text-lg text-white w-full text-center border-2 p-1 mx-1 rounded-md'> No Achievement for Today!...</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Accomplishment2