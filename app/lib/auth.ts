import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// HAPA NDIPO TUNAPOWEKA authOptions YETU KWA USALAMA
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Tafadhali jaza email na neno la siri.");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.password) {
          throw new Error("Akaunti haijapatikana.");
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Neno la siri sio sahihi.");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      }
    })
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

// HELPER FUNCTION YA KUVUTA SESSION KIURAHISI
export const auth = () => getServerSession(authOptions);