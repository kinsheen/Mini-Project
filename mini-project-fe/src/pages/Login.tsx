import { Link } from "react-router-dom";

export default function Login() {
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
        {/* <div className="w-full h-auto flex items-center gap-7">
          <div className="w-1/2 h-auto">
            <button className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/20 text-white rounded-md flex items-center gap-x-2 hover:bg-gray-100/40 ease-out duration-700"></button>
          </div>
          <div className="w-1/2 h-auto">
            <button className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/20 text-white rounded-md flex items-center gap-x-2 hover:bg-gray-100/40 ease-out duration-700"></button>
          </div>
        </div> */}
        {/* <div className="w-full h-auto flex items-center gap-x-1 my-5">
          <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
          <p className="text-sm text-gray-300 font-normal px-2">OR</p>
          <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
        </div> */}
        <div className="w-full h-auto mb-5">
          <label htmlFor="username" className="block text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your username"
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

        <button className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black/90 font-medium mb-7 hover:bg-white/30 ease-out duration-500">
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
