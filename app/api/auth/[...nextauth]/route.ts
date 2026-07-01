import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Tunapitisha mipangilio yetu tuliyotengeneza kwenye lib/auth.ts
const handler = NextAuth(authOptions);

// Next.js App Router inaruhusu ku-export GET na POST pekee hapa
export { handler as GET, handler as POST };