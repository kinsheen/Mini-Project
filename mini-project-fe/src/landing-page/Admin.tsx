import React, { useState } from "react";
import Header from "../header/Header";
import SearchInput from "../helpers/searchInput";
import AdminTable from "../pages/AdminTable";

export const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main>
      <Header />
      <div className="mx-5 px-10 pb-5">
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
