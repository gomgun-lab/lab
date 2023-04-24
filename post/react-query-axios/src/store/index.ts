import { create } from "zustand";
import { IUser } from "../api/types";

type Store = {
  authUser: IUser | null;
  requestLoading: boolean;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (loading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (loading) =>
    set((state) => ({ ...state, requestLoading: loading })),
}));

export default useStore;
