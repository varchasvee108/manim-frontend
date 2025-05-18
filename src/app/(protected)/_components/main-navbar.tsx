import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

const MainNavbar = () => {
  return (
    <div className="flex border-b h-16 justify-between w-full items-center px-4 md:px-8">
      <SidebarTrigger />
      <div className="flex">
        <Link
          href="/dashboard"
          className="text-sm flex items-center text-muted-foreground hover:text-gray-800"
        >
          <span className="mr-1">&larr;</span>
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
