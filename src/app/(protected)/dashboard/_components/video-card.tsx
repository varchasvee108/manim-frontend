"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VideoCardProps {
  prompt: string;
  videoUrl: string | null;
  renderId: string;
}

const VideoCard = ({ prompt, videoUrl, renderId }: VideoCardProps) => {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`/video/${renderId}?videoUrl=${videoUrl}`);
      }}
    >
      <CardHeader>
        <CardTitle>{prompt}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default VideoCard;
