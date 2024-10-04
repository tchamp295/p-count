"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Adjust the import path as necessary

const NavItem = ({
  href,
  icon,
  label,
  badgeCount,
  title,
  links,
  isActiveAccordion,
  setActiveAccordion,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleToggle = (value) => {
    if (value === isActiveAccordion) {
      setActiveAccordion(null); // Collapse if already active
    } else {
      setActiveAccordion(value); // Open the selected accordion
    }
  };

  // If there are no links, render a simple navigation item
  if (!links || links.length === 0) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded px-3 py-2 transition-all w-full",
          isActive
            ? "bg-[#4B49AC] text-white"
            : "text-slate-700 hover:text-blue-500"
        )}
      >
        <span className="flex items-center text-[#4B49AC] h-5 w-5">{icon}</span>
        <span className="text-base font-robotoFlex  ">{title}</span>
        {badgeCount && (
          <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            {badgeCount}
          </span>
        )}
      </Link>
    );
  }

  // If there are links, render the Accordion
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full font-robotoFlex"
      value={isActiveAccordion}
      onValueChange={handleToggle}
    >
      <AccordionItem value={title}>
        <AccordionTrigger
         className={cn(
          "flex items-center gap-3 rounded px-3 py-2 transition-all w-full",
          isActive
            ? "bg-[#4B49AC] text-white"
            : "text-slate-700 hover:text-blue-500"
        )}
        >
          <span className="flex items-center text-[#4B49AC] h-5 w-5">
            {icon}
          </span>
          <span className="text-base font-robotoFlex  ">{title}</span>
          <span className="ml-auto">
            {/* Arrow or indicator for collapse */}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-6  border-none   ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}

              className="flex items-center font-robotoFlex text-sm gap-2 pl-4 py-2 text-black hover:text-primary"
            >
              <span className="flex items-center text-[#4B49AC] h-3 w-3">
                {link.icon}
              </span>
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NavItem;
