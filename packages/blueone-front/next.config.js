/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  transpilePackages: [
    'antd',
    '@ant-design',
    '@ant-design/icons',
    'rc-util',
    'rc-picker',
    'rc-tree',
    'rc-pagination',
    'rc-table',
  ],
  compiler: {
    emotion: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
