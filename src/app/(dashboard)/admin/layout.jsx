import Navbar from "@/components/customui/navbar/Navbar";
import Sidebar from "@/components/customui/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        {/* Navbar */}
        <Navbar />
        <Toaster position="top-center" /> {/* Position the toaster globally */}
        {/* Page content */}
        <main className="flex-1 px-4 lg:px-6 pt-4 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
