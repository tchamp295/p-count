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

  const handleToggle = () => {
    if (title === isActiveAccordion) {
      setActiveAccordion(null); // Collapse if it's already open
    } else {
      setActiveAccordion(title); // Open the selected item
    }
  };

  // If there are no links, render a simple navigation item
  if (!links || links.length === 0) {
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
        {title}
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger
          onClick={handleToggle}
          className={cn( 
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all w-full  ",
            isActive
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <span className="flex items-center h-4 w-4">{icon}</span>
          {title}
          {/* {badgeCount && (
            <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
              {badgeCount}
            </span>
          )} */}
          <span className="ml-auto">{/* Arrow or indicator for collapse */}</span>
        </AccordionTrigger>
        {links && links.length > 0 && isActiveAccordion=== title && (
        <AccordionContent className="pl-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default NavItem;
