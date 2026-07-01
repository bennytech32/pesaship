// lib/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // Mfano wa provider, weka unaotumia
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Weka providers wako hapa (Google, Credentials, nk.)
    GitHub, 
    Google
  ],
  // Unaweza kuongeza session strategy kama unatumia JWT
});