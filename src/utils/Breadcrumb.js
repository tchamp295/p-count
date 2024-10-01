"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="py-2 bg-white shadow-sm px-4 rounded-lg">
      <ol className="flex space-x-4 text-base italic font-medium capitalize text-gray-700 overflow-x-auto">
        {items.map((item, index) => (
          <li key={index} className="flex items-center group">
            {index !== 0 && (
              <ChevronRight className="mx-2 h-5 w-5 text-gray-500 transition-colors duration-300 ease-in-out group-hover:text-indigo-600" />
            )}
            <Link
              href={item.href}
              className={`transition-all duration-300 ease-in-out group hover:text-indigo-600 hover:underline 
              ${index === items.length - 1 ? "text-indigo-600 font-semibold" : "text-gray-600"}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
