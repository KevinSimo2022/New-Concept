/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
