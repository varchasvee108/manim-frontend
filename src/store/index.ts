import { create } from "zustand";

type zustandStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
};

const useStore = create<zustandStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isGenerating: false,
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
}));

export default useStore;
