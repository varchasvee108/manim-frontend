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
    <div className="w-full h-full flex flex-col px-5 ">
      <div className="pt-4">
        <h1 className=" text-muted-foreground text-sm">
          {returnedVideo.prompt}
        </h1>
      </div>
      <div className="flex-1">
        <VideoView videoUrl={returnedVideo.videoUrl} />
      </div>
    </div>
  );
};

export default RenderPage;
