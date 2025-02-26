import MobileSidebar from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";
import { users } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
    const user = (await currentUser()) as typeof users.$inferSelect;
    return (
        <>
            <MobileSidebar />
            <Sidebar user={user} />
            <main className="pl-0 md:pl-[86px] lg:pl-[256px] h-full">
                <div className="max-w-[1056px] mx-auto h-full">{children}</div>
            </main>
        </>
    );
};

export default MainLayout;
