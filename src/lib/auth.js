import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { connectToDatabase } from "@/lib/dbConfig";

const login = async (credentials) => {
  try {
    const db = await connectToDatabase();
    const pool = await db.connect();

    const result = await pool
      .request()
      .input("email", db.VarChar, credentials.email)
      .query("SELECT id, email, password, isAdmin FROM Users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { POST, GET },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },
    ...authConfig.callbacks,
  },
});

