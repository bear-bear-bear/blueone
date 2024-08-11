/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const theme = require('./globalStyles/theme');

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
      withAntdLess,
      {
        modifyVars: { '@primary-color': theme.primaryColor },
      },
    ],
  ],
  nextConfig,
);
