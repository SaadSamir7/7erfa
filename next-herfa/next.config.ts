import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("http://localhost:8000/api/v1/uploads/**")],
    },
};

export default nextConfig;
