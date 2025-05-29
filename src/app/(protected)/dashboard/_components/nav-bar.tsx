import { Button } from "@/components/ui/button";
import React from "react";

const DashboardNavbar = () => {
  return (
    <div className="border-b border-b-gray-300">
      <div className="w-full flex h-12 justify-between items-center">
        <div />
        <Button
          variant={"link"}
          className="text-muted-foreground hover:text-zinc-900 transition"
        >
          &larr; Home{" "}
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
