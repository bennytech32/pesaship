import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the magic fix. It forces Prisma to run only on the server.
  serverExternalPackages: ['@prisma/client', 'bcrypt'], 
};

export default nextConfig;