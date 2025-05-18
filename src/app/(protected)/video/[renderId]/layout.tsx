import React from "react";
import MainNavbar from "../../_components/main-navbar";
import { ChatSidebar } from "./_components/chat-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const ManimLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ renderId: string }>;
}) => {
  const { renderId } = await params;

  return (
    <SidebarProvider>
      <div className="h-full w-full">
        <div className="flex h-full">
          <ChatSidebar renderId={renderId}  />
          <div className="flex-1 flex-col">
            <div className="w-full">
              <MainNavbar />
            </div>
            <main className="">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ManimLayout;
