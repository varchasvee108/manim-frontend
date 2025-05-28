"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  prompt: string;
  videoId: string;
  renderId: string;
  videoUrl: string;
  createdAt: Date;
}

const VideoCard = ({
  prompt,
  videoId,
  renderId,
  videoUrl,
  createdAt,
}: VideoCardProps) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`/video/${renderId}?videoId=${videoId}`);
      }}
    >
      <CardHeader>
        <CardTitle className="line-clamp-2">{prompt}</CardTitle>
      </CardHeader>
      <CardContent>
        <video src={videoUrl} className="w-full rounded-lg" controls />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Created {formatDistanceToNow(createdAt, { addSuffix: true })}
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
