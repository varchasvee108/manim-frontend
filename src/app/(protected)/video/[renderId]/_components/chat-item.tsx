"use client";

import { initialCreateAndGenerateVideo } from "@/actions";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { video } from "@/lib/db/schema";
import { Check, CheckCheck, CheckCircle, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useStore from "@/store";

interface ChatItemProps {
  video: typeof video.$inferSelect;
  index: number;
}

const ChatItem = ({ video, index }: ChatItemProps) => {
  const searchParams = useSearchParams();
  const currentVideoId = searchParams.get("videoId");
  const isActive = currentVideoId === video.id;
  const router = useRouter();
  const { setIsGenerating } = useStore();

  useEffect(() => {
    const generateVideo = async () => {
      try {
        if (isActive && video.scriptStatus === "pending") {
          setIsGenerating(true);
          const { success, error } = await initialCreateAndGenerateVideo(
            video.prompt,
            video.renderId,
            video.id
          );

          if (error) {
            console.error("Failed to generate video:", error);
            return;
          }

          if (success) {
            router.refresh();
          }
        }
      } catch (error) {
        console.error("Error in video generation:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateVideo();
  }, [
    isActive,
    video.scriptStatus,
    video.prompt,
    video.renderId,
    video.id,
    router,
    setIsGenerating,
  ]);

  return (
    <div>
      <SidebarMenuItem
        className={`text-sm ${
          isActive ? "text-black " : "text-muted-foreground"
        }`}
      >
        <SidebarMenuButton
          className={`w-full ${
            isActive
              ? "hover:bg-transparent hover:text-black"
              : "cursor-pointer"
          }`}
        >
          <Link
            href={`/video/${video.renderId}?videoId=${video.id}`}
            className={`w-full ${
              isActive ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <div className="flex items-center gap-x-2">
              <span
                className={`text-sm ${
                  isActive ? "text-black" : "text-muted-foreground"
                }`}
              >
                {index + 1} -
              </span>
              <span>{video.prompt}</span>
            </div>
          </Link>
        </SidebarMenuButton>
        <div className="px-2 flex flex-col gap-y-2 py-2">
          {video.scriptStatus === "pending" ? (
            <div className="flex gap-x-2 items-center">
              <span>Generating script...</span>
              <Loader className="animate-spin size-4 text-sky-600" />
            </div>
          ) : video.scriptStatus === "generated" ? (
            <div className="flex gap-x-2 items-center">
              <span>Script generated</span>
              <CheckCheck className="size-4 text-green-600" />
            </div>
          ) : null}
          {video.videoStatus === "pending" ? (
            <div className="flex gap-x-2 items-center">
              <span>Generating video...</span>
              <Loader className="animate-spin size-4 text-sky-600" />
            </div>
          ) : video.videoStatus === "generated" ? (
            <div className="flex gap-x-2 items-center">
              <span>Video generated</span>
              <CheckCheck className="size-4" />
            </div>
          ) : null}
        </div>
      </SidebarMenuItem>
    </div>
  );
};

export default ChatItem;
