"use client";
import Navbar from "@/components/customui/navbar/Navbar";
import Sidebar from "@/components/customui/sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session status:", status); // Check session status
    console.log("Session data:", session); // Log session data

    if (status === "authenticated") {
      const now = Date.now();
      const sessionExpiry = new Date(session.expires).getTime();
      console.log("Session expiry time:", sessionExpiry);

      if (now >= sessionExpiry) {
        toast.error("Session expired. Please log in again.");
        
        // Save the current URL before logging out
        const currentUrl = window.location.href;
        console.log("Current URL before sign out:", currentUrl); // Add more logging
        
        localStorage.setItem("redirectAfterLogin", currentUrl);
        signOut({ redirect: true, callbackUrl: `/login` });
      }
    }
  }, [session, status]);

  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Navbar />

      <div className="flex">
        <div className="hidden lg:flex w-64">
          <Sidebar />
        </div>

        <main className="w-full md:flex-1 px-4 lg:px-6 pt-4 overflow-hidden ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
