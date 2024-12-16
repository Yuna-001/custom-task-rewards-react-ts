import { create } from "zustand";
import AuthMode from "../models/authMode";

type AuthModeStore = {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
};

const useAuthModeStore = create<AuthModeStore>((set) => ({
  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),
}));

export default useAuthModeStore;
