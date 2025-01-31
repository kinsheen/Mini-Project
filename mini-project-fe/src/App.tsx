import { Route, Routes } from "react-router-dom"
import "./App.css"
import { LandingPage } from "./landing-page"
import Priority from "./pages/Priority"
import Achievement from "./pages/Achievement"
import Todo from "./pages/Todo"

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/achievement" element={<Achievement />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </main>
  )
}

export default App
