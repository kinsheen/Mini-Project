import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../api/context";
import { loadingButton } from "../helpers/swalAlert";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword === confirmNewPassword) {
      const response = changePassword(currentPassword, newPassword);
      if (!response) {
        loadingButton(
          "error",
          "Changing Password Failed",
          "Please Contact Admin",
          false
        );
      } else {
        loadingButton("success", "Success", "Please Login Again", true);
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      loadingButton(
        "error",
        "Confirm Password is not correct",
        "Please re-write your password",
        false
      );
    }

    console.log({ currentPassword, newPassword, confirmNewPassword });
  };

  const UserRole = sessionStorage.getItem("userRole");

  return (
    <div className="bg-[url('assets/blue.jpg')] bg-cover w-full h-screen bg-no-repeat flex items-center justify-center loginpage">
      <form
        onSubmit={handleChangePassword}
        className="w-full max-w-md py-10 px-6 rounded-xl logincard"
      >
        <div className="w-full mb-4">
          <h1 className="text text-white font-semibold mb-1 text-2xl text-center">
            Change Password
          </h1>
          <p className="text-sm text-white font-normal mb-4 text-center">
            Please enter your new password.
          </p>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="currentPassword" className="block text-white mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full mb-5">
          <label htmlFor="newPassword" className="block text-white mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full mb-5">
          <label htmlFor="confirmNewPassword" className="block text-white mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
            placeholder="Confirm your new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black/90 font-medium mb-7 hover:bg-white/30 ease-out duration-500"
        >
          Change Password
        </button>
        <div className="w-full flex items-center justify-center gap-x-1">
          <p className="text-black/80 text-sm font-medium">Back to</p>
          <Link
            to={UserRole === "admin" ? "/admin" : "/"}
            className="text-black/80 text-sm font-medium hover:underline hover:text-white ease-out duration-500"
          >
            Profile
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
