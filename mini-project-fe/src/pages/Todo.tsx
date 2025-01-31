const Todo = () => {
  const tasks = [
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
    { id: 3, title: "Task 3", description: "Description 3" },
    { id: 4, title: "Task 4", description: "Description 4" },
    { id: 5, title: "Task 5", description: "Description 5" },
    { id: 6, title: "Task 6", description: "Description 6" },
    { id: 7, title: "Task 7", description: "Description 7" },
  ]
  return (
    <div className="todo m-4 mt-7 p-7">
      <div className="flex flex-row gap-2 mb-7 -mt-11">
        <h3 className="todo-header text-center text-white bg-[#0F4C5C] rounded-md w-28 p-2">
          TO DO
        </h3>
      </div>
      <div className="flex  flex-row flex-nowrap gap-2 overflow-auto">
        <div className="min-w-64 basis-1/5">
          <h5>Monday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {tasks.map((task) => {
              return (
                <ul className="list-disc list-inside p-2">
                  <li className="text-white">{task.description}</li>
                </ul>
              )
            })}
          </div>
        </div>
        <div className="min-w-64 basis-1/5">
          <h5>Tuesday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {tasks.map((task) => {
              return (
                <ul className="list-disc list-inside p-2">
                  <li className="text-white">{task.description}</li>
                </ul>
              )
            })}
          </div>
        </div>
        <div className="min-w-64 basis-1/5">
          <h5>Wednesday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {tasks.map((task) => {
              return (
                <ul className="list-disc list-inside p-2">
                  <li className="text-white">{task.description}</li>
                </ul>
              )
            })}
          </div>
        </div>
        <div className="min-w-64 basis-1/5">
          <h5>Thursday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {tasks.map((task) => {
              return (
                <ul className="list-disc list-inside p-2">
                  <li className="text-white">{task.description}</li>
                </ul>
              )
            })}
          </div>
        </div>
        <div className="min-w-64 basis-1/5">
          <h5>Friday</h5>
          <div className="bg-[#0F4C5C] h-100">
            {tasks.map((task) => {
              return (
                <ul className="list-disc list-inside p-2">
                  <li className="text-white">{task.description}</li>
                </ul>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
