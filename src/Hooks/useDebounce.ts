"use client";
import { useGlobalStates } from "@/store/globalState";
import { useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const { searchInput, addSearchInput } = useGlobalStates();
  useEffect(() => {
    const searchQuery = setTimeout(() => {
      addSearchInput(value);
    }, delay);
    return () => {
      clearTimeout(searchQuery);
    };
  }, [value, delay]);
  return searchInput;
};

export default useDebounce;
