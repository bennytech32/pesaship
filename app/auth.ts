import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Hardcoded Secret for Developer Mode
  secret: "developer-mode-secret-key-123", 
  
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  
  providers: [
    CredentialsProvider({
      name: "Developer Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Dev Login: Access Granted");
        
        // Use the typed email as the ID so we can simulate different users
        const userEmail = credentials?.email || "dev@test.com";
        const userName = userEmail.split('@')[0]; // e.g., 'buyer' from 'buyer@test.com'
        
        return {
          id: userEmail, 
          email: userEmail,
          name: userName,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Pass the custom ID to the session so the dashboard can read it
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  }
};