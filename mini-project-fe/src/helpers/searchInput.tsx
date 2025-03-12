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
      <div className="flex items-center bg-white border-primary border-2 rounded-xl w-auto px-3 md:border-3">
        <input
          type="text"
          className="flex flex-row justify-between gap-2 bg-white w-13 h-9 rounded-2xl border-none focus:outline-none focus:ring-0 placeholder:-translate-y-1 md:w-55 md:p-3 md:h-11 placeholder:text-[10px] md:placeholder:text-[17px] "
          placeholder="Search task..."
          onChange={handleChange}
        />
        <FaSearch className="text-lg text-primary md:text-2xl" />
      </div>
    </div>
  );
};

export default SearchInput;
