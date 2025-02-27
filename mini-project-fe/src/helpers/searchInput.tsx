import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center bg-white border-primary border-3 rounded-xl w-auto px-3">
        <input
          type="text"
          className="flex flex-row justify-between gap-2 bg-white p-3 w-auto rounded-2xl border-none focus:outline-none focus:ring-0"
          placeholder="Search task..."
          onChange={handleChange}
        />
        <FaSearch className="text-2xl text-primary" />
      </div>
    </div>
  );
};

export default SearchInput;
