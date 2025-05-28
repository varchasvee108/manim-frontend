import { db } from "@/lib/db";
import { render, video } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import VideoView from "./_components/video-view";

const RenderPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ renderId: string }>;
  searchParams: Promise<{ videoId?: string }>;
}) => {
  const { renderId } = await params;
  const { videoId } = await searchParams;

  if (!videoId || !renderId) {
    return redirect("/");
  }

  const [returnedRender, returnedVideo] = await Promise.all([
    db.query.render.findFirst({
      where: eq(render.id, renderId),
    }),
    db.query.video.findFirst({
      where: and(eq(video.id, videoId), eq(video.renderId, renderId)),
    }),
  ]);

  if (!returnedRender || !returnedVideo || !returnedVideo.videoUrl) {
    return redirect("/");
  }

  console.log(returnedVideo.videoUrl);

  return (
    <div className="w-full h-full">
      <VideoView videoUrl={returnedVideo.videoUrl} />
    </div>
  );
};

export default RenderPage;
