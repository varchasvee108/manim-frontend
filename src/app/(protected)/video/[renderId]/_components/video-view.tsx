"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface VideoViewProps {
  videoUrl: string;
}

const VideoSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-[calc(100%-2rem)]" />
    </div>
  );
};

const VideoView = ({ videoUrl }: VideoViewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoUrl) {
      setIsLoading(false);
    }
  }, [videoUrl]);

  if (isLoading || !videoUrl) {
    return <VideoSkeleton />;
  }

  return (
    <div className="w-full h-full">
      <video src={videoUrl} controls className="w-full h-full object-contain" />
    </div>
  );
};

export default VideoView;
