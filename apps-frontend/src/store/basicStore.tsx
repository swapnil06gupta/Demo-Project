import { create } from "zustand";

interface TBaseStore {
  loader: boolean;
  setLoader: (action: boolean) => void;
}

export const useBaseStore = create<TBaseStore>((set) => ({
  loader: false,
  setLoader: (action: boolean) => set(() => ({ loader: action })),
}));
