/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    domains: ["dummyjson.com"],
  },
};

export default nextConfig;
