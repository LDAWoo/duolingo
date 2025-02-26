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
    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={className}>{children}</body>
        </html>
    );
}
