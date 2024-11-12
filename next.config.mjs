/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['assets.aceternity.com', "cloud.appwrite.io"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io',
                pathname: '/v1/storage/buckets/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // Disables ESLint during production builds
    },
};

export default nextConfig;
