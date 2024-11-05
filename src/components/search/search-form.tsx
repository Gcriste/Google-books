import { ChangeEvent, FormEvent } from "react";
import { Box, Button, Flex } from "../common";

type OwnProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchStr: string;
};

const SearchForm = ({ handleSubmit, handleChange, searchStr }: OwnProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Flex gap="gap-0" className='w-full'>
        <input
          type="text"
          value={searchStr}
          onChange={handleChange}
          placeholder="Search for books..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Button type="submit" variant="primary" className="min-w-[150px]">
          Search
        </Button>
      </Flex>
    </form>
  );
};

export default SearchForm;
