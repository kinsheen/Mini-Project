const Todo = () => {
  return (
    <div className="todo m-4 mt-7 p-7 borde">
      <div className="flex flex-row gap-2 mb-7 -mt-11">
        <h3 className="todo-header text-center bg-[#0F4C5C] rounded-md w-28 p-2">
          Todo
        </h3>
        {/* <div className="bg-[#0F4C5C] p-2 rounded-md w-28">Create</div> */}
      </div>
      <div className="flex flex-row gap-2">
        <div className="basis-1/5">
          <h5>Monday</h5>
          <div className="bg-[#0F4C5C] h-100"></div>
        </div>
        <div className="basis-1/5">
          <h5>Tuesday</h5>
          <div className="bg-[#0F4C5C] h-100"></div>
        </div>
        <div className="basis-1/5">
          <h5>Wednesday</h5>
          <div className="bg-[#0F4C5C] h-100"></div>
        </div>
        <div className="basis-1/5">
          <h5>Thursday</h5>
          <div className="bg-[#0F4C5C] h-100"></div>
        </div>
        <div className="basis-1/5">
          <h5>Friday</h5>
          <div className="bg-[#0F4C5C] h-100"></div>
        </div>
      </div>
    </div>
  )
}

export default Todo
