import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import { LandingPage } from "./landing-page";
import { OverView } from "./landing-page/Overview";
import { Admin } from "./landing-page/Admin";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<OverView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
