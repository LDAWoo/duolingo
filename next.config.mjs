/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "img.clerk.com", "uploadthing.com", "utfs.io", "hush.shop", "picsum.photos", "source.unsplash.com", "d2pur3iezf4d1j.cloudfront.net"],
    },
    reactStrictMode: false,
    webpack: (config) => {
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
