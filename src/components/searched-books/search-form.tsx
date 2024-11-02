import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type OwnProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchStr: string;
};

const SearchForm = ({ handleSubmit, handleChange, searchStr }: OwnProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        value={searchStr}
        onChange={handleChange}
        placeholder="Search for books..."
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
