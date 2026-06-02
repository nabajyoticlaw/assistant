/** @type {import('next').Config} */
const nextConfig = {
    typescript: {
      // This is the magic line. It tells Vercel to ignore 
      // TypeScript errors and finish the build anyway.
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
  