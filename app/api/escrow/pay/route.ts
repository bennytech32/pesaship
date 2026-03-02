import NextAuth from "next-auth";
export { authOptions } from "@/app/api/auth/...nextauth/route";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };