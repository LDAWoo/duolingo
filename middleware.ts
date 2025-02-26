import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/", "/not-found"];

// Tạo regex kiểm tra trang public
const publicPathnameRegex = RegExp(`^(${publicPages.join("|")})/?$`, "i");

// Middleware xác thực
const authMiddleware = withAuth(
    async function middleware(req) {
        const token = await getToken({ req, secret: process.env.JWT_SECRET });
        const isAuth = !!token;

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }
            return NextResponse.redirect(new URL(`/?from=${encodeURIComponent(from)}`, req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            async authorized() {
                return true; // Luôn gọi middleware, quyền truy cập sẽ được kiểm tra bên trong
            },
        },
    }
);

// Middleware chính
export default function middleware(req: NextRequest) {
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return NextResponse.next();
    } else {
        return (authMiddleware as any)(req);
    }
}

// Config matcher để áp dụng middleware cho các đường dẫn phù hợp
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
