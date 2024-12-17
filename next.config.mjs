/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "img.clerk.com", "uploadthing.com", "utfs.io", "hush.shop", "picsum.photos", "source.unsplash.com", "d2pur3iezf4d1j.cloudfront.net"],
    },
    reactStrictMode: false,
};

export default withNextIntl(nextConfig);
