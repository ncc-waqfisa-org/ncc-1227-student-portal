const { i18n } = require("./next-i18next.config");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
};

module.exports = nextConfig;
