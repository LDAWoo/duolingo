import { create } from "zustand";

type ExitModalState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useExitModal = create<ExitModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
