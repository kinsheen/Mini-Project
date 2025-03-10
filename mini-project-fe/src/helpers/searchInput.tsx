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
          className="flex flex-row justify-between gap-2 bg-white w-22 h-10 rounded-2xl border-none focus:outline-none focus:ring-0 md:w-55 md:p-3 md:h-11"
          placeholder="Search task..."
          onChange={handleChange}
        />
        <FaSearch className="text-xl text-primary md:text-2xl" />
      </div>
    </div>
  );
};

export default SearchInput;
