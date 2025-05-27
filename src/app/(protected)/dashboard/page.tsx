import { isAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { render, user, video } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import VideoCard from "./_components/video-card";

const Dashboard = async () => {
  const session = await isAuthenticated();

  if (!session.user) {
    return redirect("/");
  }

  const userRenders = await db.query.render.findMany({
    where: eq(render.userId, session.user.id),
    orderBy: desc(render.createdAt),
    with: {
      videos: {
        orderBy: desc(video.createdAt),
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-16 px-8 md:px-0">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {userRenders.map((r) => {
          const videoUrl = r.videos[0]?.videoUrl;
          // if (!videoUrl) return null;

          return (
            <VideoCard
              key={r.id}
              prompt={r.videos[0].prompt}
              videoUrl={videoUrl || null}
              renderId={r.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
