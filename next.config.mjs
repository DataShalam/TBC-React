/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "t3.ftcdn.net",
      "cdn1.iconfinder.com",
      "dummyjson.com",
    ], // Add the hostname here
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signIn",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
