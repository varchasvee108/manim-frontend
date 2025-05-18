import { db } from "@/lib/db";
import { video } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { video_url, video_id, renderId } = await req.json();
    const [updatedVideo] = await db
      .update(video)
      .set({
        videoStatus: "generated",
        renderId,
        videoUrl: video_url,
      })
      .where(eq(video.id, video_id))
      .returning({ videoStatus: video.videoStatus });

    return NextResponse.json({
      success: true,
      message: "Video updated successfully",
      videoStatus: updatedVideo?.videoStatus,
    });
  } catch (error) {
    console.log(error, "ERROR FROM MANIM UPDATE");
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
