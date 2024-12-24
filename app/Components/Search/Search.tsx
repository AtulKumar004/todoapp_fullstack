"use client";
import React, { ChangeEvent, useCallback } from "react";
import { debounce } from "@/app/utils/helpers";

interface SearchProps {
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
}

const Search = ({
  icon,
  placeholder = "Search...",
  className = "",
  onSearch,
  debounceTime = 300
}: SearchProps) => {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <div className="absolute left-3">
          {icon}
        </div>
      )}
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 
          ${icon ? 'pl-10' : 'pl-3'}`}
      />
    </div>
  );
};

export default Search; 