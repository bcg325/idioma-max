/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/course",
        permanent: true,
      },
      {
        source: "/es",
        destination: "/es/course",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
