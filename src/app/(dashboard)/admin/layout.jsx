"use client";
import Navbar from "@/components/customui/navbar/Navbar";
import Sidebar from "@/components/customui/sidebar/Sidebar";
import SessionProvider from "@/lib/SessionProvider";
import Breadcrumb from "@/utils/Breadcrumb";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const generateBreadcrumbItems = (pathname) => {
    const pathArray = pathname.split("/").filter((x) => x); // Split the pathname and filter empty parts
  
    const breadcrumbItems = [];
  
    // Always include 'Dashboard' as the first breadcrumb
    // breadcrumbItems.push({ label: "Dashboard", href: "/admin" });
  
    // Iterate through pathArray to generate breadcrumb items dynamically
    pathArray.forEach((segment, index) => {
      // Create a URL for each segment leading up to the current one
      const href = `/${pathArray.slice(0, index + 1).join("/")}`;
  
      // Capitalize the label and push it to breadcrumb items
      breadcrumbItems.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      });
    });
  
    return breadcrumbItems;
  };
  
  const breadcrumbItems = generateBreadcrumbItems(pathname);
  console.log(pathname);
  return (
    <SessionProvider>
      <div className="w-full min-h-screen flex flex-col ">
        <Navbar />

        <div className="flex">
          <div className="hidden lg:flex w-64">
            <Sidebar />
          </div>

          <main className="w-full md:flex-1 px-4 lg:px-6 pt-4 overflow-hidden ">
            <div className="mb-4">
              {" "}
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
