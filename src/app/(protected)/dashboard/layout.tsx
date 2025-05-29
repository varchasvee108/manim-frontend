import React from "react";
import DashboardNavbar from "./_components/nav-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <DashboardNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
