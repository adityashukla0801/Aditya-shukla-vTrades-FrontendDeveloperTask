import { getUser } from "@/lib/store";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        console.log("credentials::", credentials);
        const user = getUser(credentials!.email);
        console.log("userStore::", user);
        if (user && user.password === credentials!.password) {
          return { id: user.email, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
export { handler as GET, handler as POST };
