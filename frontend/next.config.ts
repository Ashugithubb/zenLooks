/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "aonetheme.com",
      },
      {
        protocol: "https",
        hostname: "haires.like-themes.com",
      },
    ],
  },
};

module.exports = nextConfig;
