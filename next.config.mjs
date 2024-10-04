/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set up the image domain for Next.js Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dbafxcvrwjbyeulkunmo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
