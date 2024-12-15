"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <QueryProvider>
                <ModalProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </ModalProvider>
            </QueryProvider>
        </SessionProvider>
    );
};

export default Layout;
