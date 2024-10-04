import { Bell, Search } from "lucide-react";
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
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-100 via-gray-50 to-white shadow-md h-16 flex items-center justify-between lg:h-[60px] px-4 lg:px-8 transition-all duration-300">
      {/* Logo and Branding */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center font-matrix gap-2 font-semibold text-lg lg:text-xl text-gray-800 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-in-out"
        >
          <div className="relative">
            <Image
              src="/worrior.png"
              alt="P-count logo"
              width={40} // Slightly larger for better visual impact
              height={40}
              className="rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 hover:rotate-6" // Add hover scale and slight rotation
            />
            {/* Optional glowing effect around the image */}
            <span className="absolute inset-0 rounded-full border border-purple-500 animate-pulse"></span>
          </div>
          <span className="relative text-base font-quicksand font-bold text-customColor uppercase">
            P-count Admin
            <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 hover:scale-x-100"></span>
          </span>
        </Link>
      </div>

      {/* Search Bar (Uncomment if needed) */}
      {/* <form className="hidden md:flex lg:max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-50 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400 pl-10 py-2 rounded-md shadow-md"
          />
        </div>
      </form> */}

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Notification Button */}
        {/* <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 text-gray-600 border-gray-300 bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button> */}

        {/* Mode Toggle */}
        {/* <ModeToggle className="text-gray-600 hover:text-gray-800 transition-colors duration-300" /> */}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-md">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User profile"
              />
              <AvatarFallback>VN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
          >
            <DropdownMenuLabel className="text-gray-800 font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/admin/profile"
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 px-4 py-2 rounded-md"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
