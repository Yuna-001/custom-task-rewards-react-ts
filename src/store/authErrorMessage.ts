import { create } from "zustand";

type AuthErrorMessageStore = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
};

const useAuthErrorMessageStore = create<AuthErrorMessageStore>((set) => ({
  errorMessage: "",
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: "" }),
}));

export default useAuthErrorMessageStore;
