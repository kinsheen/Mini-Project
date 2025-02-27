import { useState } from "react";
import { Link } from "react-router-dom";
import { logIn } from "../api/context";
import { Loading, loadingButton } from "../helpers/swalAlert";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    Loading("Please Wait...");
    try {
      const response = await logIn(email, password);
      if (response?.message === "Login successful") {
        sessionStorage.setItem("token", response.token);
        window.location.href = "/";
        Swal.close();
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
      <div className="w-[25%] h-auto py-10 px-12 rounded-xl logincard">
        <div className="w-full h-auto">
          <h1 className="text text-white font-semibold mb-1 text-2xl">
            Sign In
          </h1>
          <p className="text-sm text-white font-normal mb-4">
            Welcome back, you've been missed
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="username" className="block text-white mb-1">
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
            />
            <label htmlFor="remember" className="text-[0.875rem] text-white">
              Remember me
            </label>
          </div>
          <div className="w-auto h-auto"></div>
          <Link
            to="/"
            className="text-white text-sm font-medium hover:underline ease-out duration-500"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black/90 font-medium mb-7 hover:bg-white/30 ease-out duration-500"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <div className="w-full h-auto flex items-center justify-center gap-x-1">
          <p className="text-black/80 text-sm font-medium">
            Don't have an account?
          </p>
          <Link
            to="/"
            className="text-black/80 text-sm font-medium hover:underline ease-out duration-500"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
