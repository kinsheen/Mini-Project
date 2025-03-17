import Header from "../header/Header";

export const Page404: React.FC = () => {
  return (
    <main>
      <Header />
      <div className="flex justify-center items-center flex-col gap-3">
        <h3 className="text-primary text-4xl md:text-9xl">404</h3>
        <h4 className="text-primary text-3xl md:text-6xl">
          Oopss... Page Not Found
        </h4>
        <h5 className="text-primary text-xl md:text-3xl">
          We don't know how you ended up here, but you should go away now.
        </h5>
        <h5 className="text-primary text-lg md:text-xl">
          click Habit Tracker Logo to go Back
        </h5>
      </div>
    </main>
  );
};
