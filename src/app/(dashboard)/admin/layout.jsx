import Navbar from "@/components/customui/navbar/Navbar";
import Sidebar from "@/components/customui/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Navbar />

      <div className="flex  ">
        <div className="hidden md:flex w-64">
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
