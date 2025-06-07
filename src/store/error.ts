import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type ErrorStore = {
  errors: { message: string; id: string }[];
  addError: (message: string) => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  errors: [],
  addError: (message) => {
    const id = uuidv4();
    set((state) => ({
      errors: [...state.errors, { message, id }],
    }));

    // 4초 후 자동 제거
    setTimeout(() => {
      set((state) => ({
        errors: state.errors.filter((err) => err.id !== id),
      }));
    }, 4000);
  },
}));

export default useErrorStore;
