import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BaseLayout from "@/components/base-layout";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";

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
    params: { locale: string };
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
    // Ensure `params` is awaited before accessing `locale`
    const { locale } = await params;

    // If `locale` is undefined or invalid, handle appropriately
    if (!locale) {
        throw new Error("Locale is missing in route parameters.");
    }

    const t = await getTranslations({ locale, namespace: "LOCAL_LAYOUT" });

    return {
        title: t("LBL_TITLE"),
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <BaseLayout className={lingo.className} locale={locale}>
            {children}
        </BaseLayout>
    );
}
