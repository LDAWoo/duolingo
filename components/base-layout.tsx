import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

declare module "react" {
    interface CSSProperties {
        "--path-lever-color"?: string;
        "--path-speaker-color"?: string;
        "--start-x"?: string;
        "--start-y"?: string;
        "--end-x"?: string;
        "--end-y"?: string;
    }
}

type Props = {
    children: React.ReactNode;
    locale: string;
    className?: string;
};

export default async function BaseLayout({ children, locale, className }: Props) {
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={className}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
