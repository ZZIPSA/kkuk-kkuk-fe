/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // 더미 이미지 서버
        protocol: "https",
        hostname: "item.kakaocdn.net",
        port: "",
        pathname: "/do/**",
      },
    ],
  },
};

export default nextConfig;
