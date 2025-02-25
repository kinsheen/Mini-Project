import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./landing-page";
import Priority from "./pages/Priority";
import Achievement from "./pages/Achievement";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Accomplishment from "./pages/Accomplishment";
import { OverView } from "./landing-page/Overview";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/achievement" element={<Achievement />} />
        <Route path="/accomplishment" element={<Accomplishment />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </main>
  );
}

export default App;
