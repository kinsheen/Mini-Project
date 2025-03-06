import React, { useState } from "react";
import Header from "../header/Header";
import SearchInput from "../helpers/searchInput";
import AdminTable from "../pages/AdminTable";
import { IoArrowUndo } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  return (
    <main>
      <Header />
      <div className="mx-5 px-10 pb-5 flex flex-row items-center gap-4">
        <span>
          <IoArrowUndo
            className="text-primary text-5xl hover:text-secondary"
            onClick={() => navigate("/")}
          />
        </span>
        <h3 className="text-primary text-6xl">User List</h3>
      </div>
      <div className="flex flex-row justify-start mx-5 px-10">
        <span className="pr-16">
          <SearchInput onSearch={setSearchTerm} />
        </span>
      </div>
      <AdminTable searchTerm={searchTerm} />
    </main>
  );
};
