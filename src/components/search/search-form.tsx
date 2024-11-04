import { ChangeEvent, FormEvent } from "react";
import { Button, Flex } from "../common";

type OwnProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchStr: string;
};

const SearchForm = ({ handleSubmit, handleChange, searchStr }: OwnProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Flex gap="gap-4" direction="col">
        <input
          type="text"
          value={searchStr}
          onChange={handleChange}
          placeholder="Search for books..."
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Flex>
    </form>
  );
};

export default SearchForm;
