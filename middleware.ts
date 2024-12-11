import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const publicPages = ["/", "/not-found"];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
    async function middleware(req) {
        const token = await getToken({ req, secret: process.env.JWT_SECRET });
        const pathName = req.nextUrl.pathname;
        const locale = pathName.split("/")[1];

        const isAuth = !!token;

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }
            return NextResponse.redirect(new URL(`/${locale}/?from=${encodeURIComponent(from)}`, req.url));
        }

        // if (isAuth) {
        //     return NextResponse.redirect(new URL(`/${locale}`, req.url));
        // }

        return null;
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

export default function middleware(req: NextRequest) {
    const locale = routing.locales.join("|");
    const publicPathnameRegex = RegExp(`^(/(${locale}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")}|/not-found)/?$`, "i");
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/(de|en)/:path*"],
};