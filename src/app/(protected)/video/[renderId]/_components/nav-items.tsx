"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { video } from "@/lib/db/schema";
import ChatItem from "./chat-item";

export function ChatItems({
  videos,
}: {
  videos: (typeof video.$inferSelect)[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="mt-5 px-2">
      <SidebarGroupLabel>Prompts</SidebarGroupLabel>
      <SidebarMenu className="space-y-16">
        {videos.map((video, index) => (
          <ChatItem key={video.id} video={video} index={index} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
