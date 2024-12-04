import { create } from "zustand";

interface RequiredCoinStore {
  requiredCoin: number;
  setRequiredCoin: (input: number) => void;
}

const useRequiredCoinStore = create<RequiredCoinStore>((set) => ({
  requiredCoin: 0,
  setRequiredCoin: (input) => set({ requiredCoin: input }),
}));

export default useRequiredCoinStore;
