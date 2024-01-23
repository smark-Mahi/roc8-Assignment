"use server";
import { SearchData } from "@/types/searchData";
import axios from "axios";

const API_KEY = "41886470-72e129485a2afe6a524b07275";

export async function getAllSearchResuslts(searquery: string) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searquery}&image_type=photo&per_page=50&safeSearch=true`
  );
  const data = await response.data;
  return data as SearchData;
}
