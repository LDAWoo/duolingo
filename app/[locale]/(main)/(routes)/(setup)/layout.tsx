import React from "react";
import Footer from "./footer";
import Header from "./header";
import { initialUser } from "@/lib/initialUser";
import { redirect, routing } from "@/i18n/routing";
import { getCourseProgress, getUserProgress } from "@/db/queries";
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
            return redirect({ href: "/courses", locale: routing.defaultLocale });
        }

        return redirect({
            href: "/learn",
            locale: routing.defaultLocale,
        });
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
