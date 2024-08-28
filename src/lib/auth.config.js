export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emai
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname?.startsWith("/admin");

      console.log("Auth:", auth);
      console.log("Is Admin Panel:", isOnAdminPanel);
      console.log("User:", user);

      if (isOnAdminPanel && (!user || !user.isAdmin)) {
        console.log("Unauthorized access attempt.");
        return false;
      }
      console.log("Authorized.");
      return true;
    },
  },
};