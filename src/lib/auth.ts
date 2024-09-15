import { AUTH_TOKEN_EXPIRATION_TIME } from "@/config/auth.config";
import prisma from "@/config/prisma.config";
import bcrypt from "bcryptjs";
import { NextAuthOptions, User, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SigninSchema } from "./zodSchema/signinSchema";
import { ErrorHandler } from "./error";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      hospitalName?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    hospitalName?: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "signin",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new ErrorHandler("No credentials provided", "VALIDATION_ERROR");
        }

        const result = SigninSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            "Input Validation failed",
            "VALIDATION_ERROR",
            {
              fieldErrors: result.error.flatten().fieldErrors,
            }
          );
        }

        const { email, password } = result.data;
        const user = await prisma.hospital.findUnique({
          where: { admin_email: email },
          select: {
            id: true,
            hospitalName: true,
            password: true,
          },
        });

        if (!user) {
          throw new ErrorHandler(
            "Email or password is incorrect",
            "AUTHENTICATION_FAILED"
          );
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new ErrorHandler(
            "Email or password is incorrect",
            "AUTHENTICATION_FAILED"
          );
        }

        return {
          id: user.id,
          hospitalName: user.hospitalName,
          email: email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.hospitalName = user.hospitalName;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.hospitalName = token.hospitalName as string | undefined;
        session.user.email = token.email as string | undefined;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  jwt: {
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  pages: {
    signIn: "/auth/signin",
  },
};
