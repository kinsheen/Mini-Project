const Achievement = () => {
  const achievement = [
    {
      id: 1,
      title: "Achievement 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Achievement 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Achievement 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Achievement 4",
      description: "Description 4",
    },
    {
      id: 5,
      title: "Achievement 5",
      description: "Description 5",
    },
    {
      id: 6,
      title: "Achievement 6",
      description: "Description 6",
    },
  ]

  return (
    <div className="achievement m-4 mt-7 p-7">
      <div className="flex flex-row gap-2 mb-7 -mt-11">
        <h3 className="todo-header text-center text-white bg-[#0F4C5C] rounded-md w-40 p-2 mb-7">
          ACHIEVEMENT
        </h3>
      </div>
      <div className="achievement-box h-100 bg-[#0F4C5C]">
        {achievement.map((task) => {
          return (
            <ul className="list-disc list-inside p-2">
              <li className="text-white">{task.description}</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default Achievement
