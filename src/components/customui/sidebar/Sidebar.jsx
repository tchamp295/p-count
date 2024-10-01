"use client";
import { useState } from "react";
import { navItems } from "@/utils/data";
import NavItem from "./navitem/NavItem";

const Sidebar = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="fixed w-64 top-[60px] bottom-5 left-0 h-screen border-r bg-slate-200 shadow-md hidden lg:block p-6 overflow-y-auto scrollbar-none">
      <nav className="flex flex-col gap-2 text-sm font-medium">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            {...item}
            isActiveAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
