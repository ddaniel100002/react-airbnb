import { create } from "zustand";

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useRegisterModal = create<RegisterModalStore>((set) => ({
    //CHANGE TO TRUE TO SHOW THE MODAL
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useRegisterModal;