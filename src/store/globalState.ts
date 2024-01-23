import { Hits } from "@/types/searchData";
import { create } from "zustand";

interface AllGlobalState {
  favourites: Hits[];
  addToFavourites: (payload: Hits) => void;
  deleteFromFavourites: (payload: Hits) => void;
  downloadedImages: Hits[];
  addToDownloadedSection: (payload: Hits) => void;
  searchInput: string;
  addSearchInput: (payload: string) => void;
  clearHistory: () => void;
}

export const useGlobalStates = create<AllGlobalState>((set) => ({
  //zustand states
  favourites: [],
  downloadedImages: [],
  searchInput: "",
  addSearchInput: (data) => set(() => ({ searchInput: data })),
  addToFavourites: (payload: Hits) =>
    set((state) => ({
      favourites: [...state.favourites, payload],
    })),
  deleteFromFavourites: (payload: Hits) =>
    set((state) => ({
      favourites: state.favourites.filter(
        (favourite) => payload.id !== favourite.id
      ),
    })),
  addToDownloadedSection: (payload: Hits) =>
    set((state) => ({
      downloadedImages: [...state.downloadedImages, payload],
    })),
  clearHistory: () =>
    set(() => ({
      downloadedImages: [],
    })),
}));
