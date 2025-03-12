import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import { LandingPage } from "./landing-page";
import { OverView } from "./landing-page/Overview";
import { Admin } from "./landing-page/Admin";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword";
import { useEffect, useState } from "react";
import { Page404 } from "./pages/404Page";

function App() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    sessionStorage.setItem("userRole", newRole);
  };
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleRoleChange} />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<OverView />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {role == "admin" ? (
            <>
              <Route path="/admin" element={<Admin />} />
            </>
          ) : (
            <Route path="/admin" element={<Page404 />} />
          )}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
