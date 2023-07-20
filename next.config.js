/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/course",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
