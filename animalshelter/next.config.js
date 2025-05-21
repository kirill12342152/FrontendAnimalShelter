/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '7230',
                pathname: '/uploads/**',
            }
        ],
        unoptimized: true
    },
};

module.exports = nextConfig; 