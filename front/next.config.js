/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {};

module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#0076BB' },
  ...nextConfig,
  webpack(config) {
    return config;
  },
});
