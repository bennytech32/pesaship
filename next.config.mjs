/** @type {import('next').NextConfig} */
const nextConfig = {
  // This forces the database to run on the server only
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
};

export default nextConfig;