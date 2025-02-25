import Header from "../header/Header";
import Achievements from "../pages/Achievements";
import Backlog from "../pages/Backlog";
import CreateTodo from "../pages/CreateTodo";
import TaskList from "../pages/TaskList";

export const OverView = () => {
  return (
    <main>
      <Header />
      <div className="mx-5 px-10 pb-5">
        <h3 className="text-primary text-6xl">Overview</h3>
      </div>
      <CreateTodo />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 m-5 px-10">
        <div className=" p-2 border-solid ">
          <TaskList />
        </div>
        <div className=" p-2 border-solid">
          <Backlog />
        </div>
        <div className=" p-2 border-solid ">
          <Achievements />
        </div>
      </div>
    </main>
  );
};
