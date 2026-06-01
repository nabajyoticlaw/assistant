/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // !! WARN !!
      // This allows deployment even if your types are slightly wrong
      ignoreBuildErrors: true,
    },
  }
  
  module.exports = nextConfig
  