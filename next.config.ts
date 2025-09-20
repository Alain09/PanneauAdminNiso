import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Si vous avez un projet spécifique, vous pouvez être plus précis :
      {
        protocol: 'https',
        hostname: 'https://shojvdlnrmgomzoljibj.supabase.co', // Remplacez par votre vraie URL
        port: '',
        pathname: '/storage/v1/object/public/Niso_image/**',
      }
    ],
  },
};

export default nextConfig;
