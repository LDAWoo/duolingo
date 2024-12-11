"use client";

import AuthenticationModal from "@/components/modals/authentication-modal";
import { ExitModal } from "@/components/modals/exit-modal";
import React, { createContext, useState, ReactNode } from "react";

export type ModalType = "authentication";

interface ModalData {}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

const ModalContext = createContext<ModalStore | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState<ModalType | null>(null);
    const [data, setData] = useState<ModalData>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = (type: ModalType, data?: ModalData) => {
        setType(type);
        setData(data || {});
        setIsOpen(true);
    };

    const onClose = () => {
        setType(null);
        setData({});
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ type, data, isOpen, onOpen, onClose }}>
            {children}
            <AuthenticationModal />
            <ExitModal />
        </ModalContext.Provider>
    );
};

export default ModalContext;

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
