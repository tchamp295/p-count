import { Bell, CircleUser, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ModeToggle } from "../../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Image from "next/image"; // Import Next.js Image component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 bg-stone-100 border-b h-14 flex items-center justify-between lg:h-[60px] px-4 lg:px-6">
      <div className="flex gap-10 justify-between items-center">
        <Link href="/" className="flex w-full items-center gap-2 font-semibold">
          <Image
            src="/worrior.png" // Path to your image
            alt="P-count logo"
            width={24} // Set width (adjust as needed)
            height={24} // Set height (adjust as needed)
            className="h-6 w-6" // Additional styles if necessary
          />
          <span>P-count</span>
        </Link>

        <form className="w-full hidden md:flex lg:max-w-xl">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" /> {/* Muted color */}
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-stone-50 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-gray-400 pl-8 shadow-none rounded-md" // Softer background and border to blend
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Button */}
        <div className="hidden lg:block">
          <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 border-gray-300 bg-stone-50 hover:bg-stone-200">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        {/* Mode Toggle */}
        <ModeToggle className="text-gray-600  hover:text-gray-800" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer bg-stone-50 hover:bg-stone-200">
              <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
              <AvatarFallback>VN</AvatarFallback> {/* Initials or fallback content */}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-stone-50 border border-gray-300">
            <DropdownMenuLabel className="text-gray-700">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-600 hover:bg-stone-200">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-600 hover:bg-stone-200">Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-600 hover:bg-stone-200">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
