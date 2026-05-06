/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:route',
                destination: (process.env.API_URL ?? 'http://127.0.0.1:8000') + '/:route',
            },
        ]
    },
    env: {
        api: process.env.API_URL ?? 'http://127.0.0.1:8000',
        MATOMO_URL: process.env.MATOMO_URL,
        MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
    },
    // Docker configuration
    output: "standalone",
}

module.exports = nextConfig
