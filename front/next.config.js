const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
    ],
    [
      withAntdLess,
      {
        modifyVars: { '@primary-color': '#0076BB' },
      },
    ],
  ],
  nextConfig,
);
