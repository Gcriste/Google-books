import { FormEvent, useCallback, useEffect, useState } from "react";
import SearchForm from "./search-form";
import { useBookContext } from "@/context/use-book-context";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/api";
import { SubmitHandler } from "react-hook-form";
import { FormValues } from "@/app/types";

type OwnProps = {
  handleSubmit: SubmitHandler<FormValues>;
  isLoading: boolean;
  error: Error | null;
};
const SearchFormContainer = ({ handleSubmit, isLoading, error }: OwnProps) => {
  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </>
  );
};

export default SearchFormContainer;
