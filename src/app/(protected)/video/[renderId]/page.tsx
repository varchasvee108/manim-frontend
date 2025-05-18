import { db } from "@/lib/db";
import { render, video } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

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
      where: eq(video.id, videoId),
    }),
  ]);

  if (!returnedRender || !returnedVideo) {
    return redirect("/");
  }

  return <div>This is the video</div>;
};

export default RenderPage;
