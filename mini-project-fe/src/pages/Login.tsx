import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserId, logIn } from "../api/context";
import { Loading, loadingButton } from "../helpers/swalAlert";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email is stored in localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true); // Check the checkbox if an email is found
    }
  }, []);

  const fetchData = async () => {
    const response = await getUserId();
    sessionStorage.setItem("userRole", String(response?.role));
    sessionStorage.setItem("userId", String(response?.id));
    console.log(response);
  };

  const handleLogin = async () => {
    Loading("Please Wait...");
    try {
      const response = await logIn(email, password);
      if (response?.message === "Login successful") {
        sessionStorage.setItem("token", response.token);
        // Store email in localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }
        navigate("/");
        Swal.close();
        await fetchData();
      } else {
        loadingButton("error", "Login Failed", "Please login again", true);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      loadingButton("error", "Login Failed", "Please login again", true);
    }
  };

  return (
    <div className="bg-[url('assets/blue.jpg')] bg-cover w-full h-screen bg-no-repeat flex items-center justify-center loginpage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-[25%] h-auto py-10 px-12 rounded-xl logincard"
      >
        <div className="w-full h-auto">
          <h1 className="text text-white font-semibold mb-1 text-2xl">
            Sign In
          </h1>
          <p className="text-sm text-white font-normal mb-4">
            Welcome back, to Habit Tracker
          </p>
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="username" className="block text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="password" className="block text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full h-auto flex items-center justify-between mb-5">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-gray-200/20 border border-gray-200/20 rounded-md text-white"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="text-[0.875rem] text-white">
              Remember me
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black/90 font-medium mb-7 hover:bg-white/30 ease-out duration-500"
        >
          Sign In
        </button>
        <div className="w-full h-auto flex items-center justify-center gap-x-1">
          <p className="text-black/80 text-sm font-medium">
            Don't have an account?
          </p>
          <Link
            to="/registration"
            className="text-black/80 text-sm font-medium hover:underline hover:text-white ease-out duration-500"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
}
