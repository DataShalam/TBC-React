/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "t3.ftcdn.net",
      "cdn1.iconfinder.com",
      "dummyjson.com",
      "lh3.googleusercontent.com",
    ], // Add the hostname here
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
