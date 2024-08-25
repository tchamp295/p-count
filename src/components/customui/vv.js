"use client";
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavItem = ({ href, icon, label, badgeCount }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all w-full",
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      <span className="flex items-center h-4 w-4">{icon}</span>

      {label}
      {badgeCount && (
        <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          {badgeCount}
        </span>
      )}
    </Link>
  );
};

export default NavItem;
