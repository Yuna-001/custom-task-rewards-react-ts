import { create } from "zustand";
import AuthModeType from "../models/authModeType";

type AuthModeStore = {
  authMode: AuthModeType;
  setAuthMode: (mode: AuthModeType) => void;
};

const useAuthModeStore = create<AuthModeStore>((set) => ({
  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),
}));

export default useAuthModeStore;
