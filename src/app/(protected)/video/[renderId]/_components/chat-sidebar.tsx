import { GalleryVerticalEnd, Satellite } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChatItems } from "./nav-items";
import { ChatBar } from "./chat-bar";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { render, video } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { and, asc, desc, eq } from "drizzle-orm";

type ChatSidebarProps = {
  renderId: string;
} & React.ComponentProps<typeof Sidebar>;

export async function ChatSidebar({ renderId, ...props }: ChatSidebarProps) {
  const session = await isAuthenticated();

  if (!session.user) {
    redirect("/");
  }
  const selectedRender = await db.query.render.findFirst({
    where: and(eq(render.id, renderId), eq(render.userId, session.user.id)),
    with: {
      videos: {
        orderBy: [asc(video.createdAt)],
      },
    },
  });

  if (!selectedRender) {
    redirect("/");
  }

  return (
    <Sidebar {...props} className="h-full">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Satellite className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-xl">Mathmotion</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" ">
        <div className="overflow-y-auto">
          <ChatItems videos={selectedRender?.videos} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="">
          <ChatBar renderId={renderId} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
