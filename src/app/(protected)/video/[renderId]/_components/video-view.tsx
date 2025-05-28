"use client";

import React from "react";

interface VideoViewProps {
  videoUrl: string;
}

const VideoView: React.FC<VideoViewProps> = ({ videoUrl }) => {
  return (
    <div className="w-full h-full">
      <video src={videoUrl} controls className="w-full h-full object-contain" />
    </div>
  );
};

export default VideoView;
