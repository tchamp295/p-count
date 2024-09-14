"use client";
import { useState } from "react";
import { navItems } from "@/utils/data";
import NavItem from "./navitem/NavItem";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="fixed w-64 top-[60px] left-0  h-screen border-r bg-muted/40 hidden lg:block">
      
      <nav className="flex flex-col items-start px-4 py-2 text-sm font-medium">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount}
            title={item.title}
            links={item.links}
            isActiveAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
