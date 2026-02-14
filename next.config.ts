// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vibexx-be.onrender.com/api/:path*",
      },
    ];
  },
};