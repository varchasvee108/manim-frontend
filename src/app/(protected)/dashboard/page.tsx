import { isAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { render, user, video } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import VideoCard from "./_components/video-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

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

  if (userRenders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">No videos created yet</p>
        <Button variant={"outline"} className="cursor-pointer">
          <Link className="" href="/video">
            Create Video <Plus className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-8 md:px-0 h-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {userRenders.map((r) => {
          const videoUrl = r.videos[0]?.videoUrl;
          if (!videoUrl) return null;

          return (
            <VideoCard
              key={r.id}
              prompt={r.videos[0].prompt}
              videoId={r.videos[0].id}
              renderId={r.id}
              videoUrl={videoUrl}
              createdAt={r.videos[0].createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
