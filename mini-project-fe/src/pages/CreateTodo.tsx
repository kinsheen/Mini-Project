const CreateTodo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-2 w-110">
        <div className="flex row-auto gap-2">
          <div>
            <h3 className=" bg-primary text-white py-8 px-5 font-inter text-6xl">
              20
            </h3>
          </div>
          <h3 className=" bg-primary text-white py-8 px-5 font-inter text-6xl">
            25
          </h3>
        </div>
        <div className="bg-secondary w-full h-38">
          <div className="flex row items-center gap-2 px-3">
            <div className="bg-primary w-3 h-3 rounded-full" />
            <div className="py-1">
              <span className="font-crimson">Create New</span>
            </div>
          </div>
          <div className="px-6 flex flex-col gap-2 items-center">
            <button className="flex flex-row gap-2 bg-white text-black p-3 w-65 rounded hover:bg-primary  hover:text-white transition duration-200">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="font-crimson">Create New Day</div>
            </button>

            <button className="flex flex-row gap-2 bg-white text-black p-3 w-65 rounded hover:bg-primary  hover:text-white transition duration-200">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
              </div>
              <div className="font-crimson">Create New Month</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
