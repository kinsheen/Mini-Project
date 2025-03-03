import React, { useState } from "react";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add registration logic here
    console.log({ firstName, lastName, email, password, confirmPassword });
  };

  return (
    <div className="bg-[url('assets/blue.jpg')] bg-cover w-full h-screen bg-no-repeat flex items-center justify-center loginpage">
      <form
        onSubmit={handleRegistration}
        className="w-[25%] h-auto py-10 px-12 rounded-xl logincard"
      >
        <div className="w-full h-auto">
          <h1 className="text text-white font-semibold mb-1 text-2xl">
            Create Account
          </h1>
          <p className="text-sm text-white font-normal mb-4">
            Join us today. Tracking your task made Easier!
          </p>
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="firstName" className="block text-white mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="lastName" className="block text-white mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="email" className="block text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="w-full h-auto mb-5">
          <label htmlFor="confirmPassword" className="block text-white mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black/90 font-medium mb-7 hover:bg-white/30 ease-out duration-500"
        >
          Register
        </button>
        <div className="w-full h-auto flex items-center justify-center gap-x-1">
          <p className="text-black/80 text-sm font-medium">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="text-black/80 text-sm font-medium hover:underline hover:text-white ease-out duration-500"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
