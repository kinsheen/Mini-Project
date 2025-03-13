import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../api/context";
import { loadingButton } from "../helpers/swalAlert";

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const UserRole = sessionStorage.getItem("userRole");

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ firstName, lastName, email, password, confirmPassword });
    if (password === confirmPassword) {
      const response = createUser(
        firstName,
        lastName,
        username,
        email,
        password,
        "inactive"
      );
      if (!response) {
        loadingButton(
          "error",
          "Registration Failed",
          "Please Contact Admin",
          false
        );
      } else {
        if (!UserRole) {
          loadingButton(
            "success",
            "Registration Success",
            "Please Contact Admin for Activation",
            true
          );
          navigate("/");
        } else {
          loadingButton(
            "success",
            "Registration Success",
            "Please Activate the Account",
            false
          );
          navigate("/admin");
        }
      }
    } else {
      loadingButton(
        "error",
        "Confirm Password is not correct",
        "Please re-write your password",
        false
      );
    }
  };

  return (
    <div className="bg-[url('assets/blue.jpg')] bg-cover w-full h-screen bg-no-repeat flex items-center justify-center loginpage">
      <form
        onSubmit={handleRegistration}
        className="w-full max-w-md py-10 px-6 rounded-xl logincard"
      >
        <div className="w-full mb-4 text-center">
          {!UserRole ? (
            <h1 className="text text-white font-semibold mb-1 text-2xl">
              Create Account
            </h1>
          ) : (
            <h1 className="text text-white font-semibold mb-1 text-2xl">
              Add Account
            </h1>
          )}

          <p className="text-sm text-white font-normal mb-4">
            Join us today. Tracking your task made easier!
          </p>
        </div>
        <div className="w-full mb-5">
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
        <div className="w-full mb-5">
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
        <div className="w-full mb-5">
          <label htmlFor="username" className="block text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="w-full mb-5">
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
        <div className="w-full mb-5">
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
        <div className="w-full mb-5">
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
        {!UserRole ? (
          <div className="w-full flex items-center justify-center gap-x-1">
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
        ) : (
          <div className="w-full flex items-center justify-center gap-x-1">
            <p className="text-black/80 text-sm font-medium">Want to</p>
            <Link
              to="/admin"
              className="text-black/80 text-sm font-medium hover:underline hover:text-white ease-out duration-500"
            >
              Go Back?
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Registration;
