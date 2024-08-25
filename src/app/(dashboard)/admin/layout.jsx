import Navbar from "@/components/customui/Navbar";
import Sidebar from "@/components/customui/Sidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
