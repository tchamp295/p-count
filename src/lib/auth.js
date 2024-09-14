import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { connectMongoDB } from "./mongoose";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { User } from "@/models/user";

const login = async (credentials) => {
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("wrong credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new Error("wrong credentials");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("failed to login");
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
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('User:', user);
      // console.log('Account:', account);
      // console.log('Profile:', profile);

      if (account.provider === "github") {
        connectMongoDB();
        try {
          const user = await User.findOne({
            email: profile.email,
          });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
