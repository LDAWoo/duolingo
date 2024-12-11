"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/providers/modal-provider";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ModalProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </ModalProvider>
        </SessionProvider>
    );
};

export default Layout;
