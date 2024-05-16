/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // 더미 이미지 서버
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        // 더미 이미지 서버
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
