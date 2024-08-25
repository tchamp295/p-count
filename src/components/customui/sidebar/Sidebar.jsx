import { navItems } from "@/lib/data";
import NavItem from "./navitem/NavItem";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen border-r bg-muted/40 hidden lg:block">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">P-count</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <nav className="flex flex-col items-start px-4 py-2 text-sm font-medium">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount}
            title={item.title}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
