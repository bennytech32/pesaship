import { getServerSession, NextAuthOptions } from "next-auth";

// Hapa ndipo unapoweka mipangilio yako ya Login (Google, Credentials, n.k.)
export const authOptions: NextAuthOptions = {
  providers: [
    // Weka providers wako hapa baadaye
  ],
};

// Hii inatengeneza function ya 'auth()' ambayo kurasa zako zinaitafuta!
export function auth() {
  return getServerSession(authOptions);
}