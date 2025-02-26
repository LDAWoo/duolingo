import React from "react";
import Footer from "./footer";
import Header from "./header";
import { initialUser } from "@/lib/initialUser";
import { getCourseProgress, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
type Props = {
    children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
    const user = await initialUser();

    if (user) {
        const userProgressData = getUserProgress();
        const courseProgressData = getCourseProgress();
        const [userProgress, courseProgress] = await Promise.all([userProgressData, courseProgressData]);

        if (!userProgress || !userProgress.activeCourse || !courseProgress) {
            return redirect("/courses");
        }

        return redirect("/learn");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
