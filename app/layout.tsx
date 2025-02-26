import BaseLayout from "@/components/base-layout";
import localFont from "next/font/local";
import React from "react";
import "@/styles/globals.css";
import "@/styles/reset.css";

const lingo = localFont({
    src: [
        {
            path: "./fonts/font-lingo.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/font-lingo.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "./fonts/font-lingo-bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/font-lingo-bold.woff2",
            weight: "700",
            style: "italic",
        },
    ],
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    return {
        title: "Duolingo",
    };
}

export default async function RootLayout({ children }: Props) {
    return (
        <BaseLayout className={lingo.className} locale={"en"}>
            {children}
        </BaseLayout>
    );
}
