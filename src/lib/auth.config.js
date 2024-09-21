export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 180, // 3 minutes session expiration (in seconds)
    updateAge: 60, // Session will be updated every minute (in seconds)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        // console.log("Session updated:", session); // Debug log

      }
      return session;
    },
    authorized({ auth, request }) {
      //   console.log(auth);
      //   return true;
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname?.startsWith("/admin");
      // const isOnBlogPage = request.nextUrl?.pathname?.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname?.startsWith("/login");
      const isOnRegisterPage = request.nextUrl?.pathname?.startsWith(
        "/register"
      );

      // only admins page
      if (isOnAdminPanel && (!user || !user.isAdmin)) {
        return false;
      }
      //only auth users can reach blog page
      // if (isOnBlogPage && !user) {
      //   return false;
      // }
      // only unauth users can reach login
      if ((isOnLoginPage || isOnRegisterPage) && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
};
