import { db } from "@/lib/db";
import { video } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface ManimUpdateRequest {
  video_url: string;
  render_id: string;
  video_id: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ManimUpdateRequest;
    console.log(body);

    if (!body.video_url || !body.render_id || !body.video_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [updatedVideo] = await db
      .update(video)
      .set({
        videoStatus: "generated",
        renderId: body.render_id,
        videoUrl: body.video_url,
      })
      .where(eq(video.id, body.video_id))
      .returning({ videoStatus: video.videoStatus });

    if (!updatedVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    console.log("Updated successfully");

    return NextResponse.json({
      success: true,
      message: "Video updated successfully",
      videoStatus: updatedVideo.videoStatus,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
