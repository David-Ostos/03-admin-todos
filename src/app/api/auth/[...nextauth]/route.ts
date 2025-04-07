/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth";

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? ''
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Correo electronico", type: "email", placeholder: "usuario@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "*********" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        );
        console.log({user})
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })

  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      // console.log({user});
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // console.log({ token });
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if ( dbUser?.isActive === false ) {
        throw Error('Usuario no está activo');
      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id    = dbUser?.id ?? 'no-uuid';

      return token;
    },

    async session({ session, token, user }) {
      
      if ( session && session.user ) {
        session.user.roles = Array.isArray(token.roles) ? token.roles : ['no-roles'];
        session.user.id = typeof token.id === 'string' ? token.id : 'no-uuid'; // Validación explícita

      }

      return session;
    }

  }

}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }