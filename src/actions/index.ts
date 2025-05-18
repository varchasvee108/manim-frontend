"use server";
import { isAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { render, video } from "@/lib/db/schema";
import { runManimPipeline } from "@/lib/utils.server";
import { eq } from "drizzle-orm";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

// if (!process.env.FASTAPI_RENDER_URL) {
//   throw new Error("FASTAPI_RENDER_URL is not set");
// }

export const createRender = async (prompt: string) => {
  try {
    const session = await isAuthenticated();
    if (!session?.user) throw new Error("Unauthorized");

    const result = await db.transaction(async (tx) => {
      const [newRender] = await tx
        .insert(render)
        .values({
          userId: session.user.id,
        })
        .returning({ id: render.id });

      const [newvideo] = await tx
        .insert(video)
        .values({
          prompt,
          renderId: newRender.id,
          scriptStatus: "pending",
          videoStatus: "pending",
        })
        .returning({ videoId: video.id });

      return { renderId: newRender.id, videoId: newvideo.videoId };
    });

    return result;
  } catch (error) {
    console.error("ERROR FROM createRender", error);
    throw new Error("Failed to create render, please try again later");
  }
};
export const initialCreateAndGenerateVideo = async (
  prompt: string,
  renderId: string,
  videoId: string
) => {
  try {
    if (!prompt || prompt.trim().length <= 0) {
      throw new Error("Prompt is required");
    }
    if (!renderId || !videoId) {
      throw new Error("Render ID and video ID are required");
    }
    await db
      .update(video)
      .set({
        prompt,
        renderId,
        scriptStatus: "pending",
        videoStatus: "pending",
      })
      .where(eq(video.id, videoId));
    const { manimCode } = await runManimPipeline(prompt, videoId);
    await db
      .update(video)
      .set({
        scriptStatus: "generated",
        script: manimCode,
      })
      .where(eq(video.id, videoId));

    return { success: true };
  } catch (error) {
    console.log(error, "ERROR FROM ADD MANIM VIDEO TO RENDER");
    return { error: "Failed to add manim video to render" };
  }
};

export const addVideoToRender = async (prompt: string, renderId: string) => {
  try {
    if (!prompt || prompt.trim().length <= 0) {
      throw new Error("Prompt is required");
    }

    const [newVideo] = await db
      .insert(video)
      .values({
        prompt,
        renderId,
        scriptStatus: "pending",
        videoStatus: "pending",
      })
      .returning({ videoId: video.id });

    // const { manimCode } = await runManimPipeline(prompt, newVideo.id);
    // await db
    //   .update(video)
    //   .set({
    //     scriptStatus: "generated",
    //     script: manimCode,
    //   })
    //   .where(eq(video.id, newVideo.id))
    //   .returning({ videoId: video.id });

    await db.update(video).set({});

    return { videoId: newVideo.videoId };
  } catch (error) {
    console.log(error, "ERROR FROM CREATE AND GENERATE VIDEO");
    return { error: "Failed to create and generate video" };
  }
};
