import { create } from "zustand";

interface ShareModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useShareModalStore = create<ShareModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
