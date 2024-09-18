import { create } from "zustand";

type UserStore = {
  isLoggedIn: boolean;
  id: string;
  logout: () => void;
  login: (id: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  id: "",
  logout: () =>
    set({
      isLoggedIn: false,
      id: "",
    }),
  login: (id: string) =>
    set({
      isLoggedIn: true,
      id,
    }),
}));

export default useUserStore;
