import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type ErrorStore = {
  errors: { message: string; id: string }[];
  addError: (message: string) => void;
  removeError: () => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  errors: [],
  addError: (message) =>
    set((state) => ({
      errors: [...state.errors, { message, id: uuidv4() }],
    })),
  removeError: () => set((state) => ({ errors: state.errors.slice(1) })),
}));

export default useErrorStore;
