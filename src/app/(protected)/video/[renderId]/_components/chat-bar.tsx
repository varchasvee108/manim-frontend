"use client";
import { addVideoToRender } from "@/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChatBar({ renderId }: { renderId: string }) {
  const { isLoading, setIsLoading, isGenerating } = useStore();
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleCreateVideo = async () => {
    try {
      setIsLoading(true);
      const { videoId } = await addVideoToRender(prompt, renderId);
      if (videoId) {
        router.push(`/video/${renderId}?videoId=${videoId}`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          isGenerating
            ? "Please wait for the current video to finish generating..."
            : "Create a video of..."
        }
        className="min-h-[150px] resize-none placeholder:text-sm pr-24"
        disabled={isGenerating}
      />
      {prompt.trim() && (
        <Button
          onClick={handleCreateVideo}
          className="absolute bottom-2 right-2 bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
          size="sm"
          disabled={isLoading || isGenerating}
        >
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      )}
    </div>
  );
}
