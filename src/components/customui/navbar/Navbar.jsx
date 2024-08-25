import { Bell, CircleUser, Package2, Search } from "lucide-react";
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

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 bg-muted/40 border-b h-14 flex items-center justify-between lg:h-[60px] px-4 lg:px-6">
      {/* Left Side */}
      <div className="">
        

        <form className="w-full max-w-xs md:max-w-xs ">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notification Button */}
        <div className="hidden lg:block">
        <Button variant="outline" size="icon" className="h-8 w-8 ">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        </div>
        {/* Mode Toggle */}
        <ModeToggle />
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
