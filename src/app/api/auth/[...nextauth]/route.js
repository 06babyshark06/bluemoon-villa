import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Mật khẩu", type: "password" }
        },
        async authorize(credentials, req) {
          const user = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
          if (user&&(await bcrypt.compare(credentials.password, user.password))) {
            return user
          }
          return null
        }
      })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user = user || token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };