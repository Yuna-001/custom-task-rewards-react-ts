import { create } from "zustand";

type ErrorMessageStore = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
};

const useErrorMessageStore = create<ErrorMessageStore>((set) => ({
  errorMessage: "",
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: "" }),
}));

export default useErrorMessageStore;
