"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createRender } from "@/actions";
import { video } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

const EXAMPLE_PROMPTS = [
  "Create a scene with a blue circle and a red square.",
  "Animate a sine wave.",
  "Show the formula for Pythagorean theorem.",
  "Draw a number line from -5 to 5.",
  "Transform a square into a triangle.",
];

type res = {
  renderId: string;
  videoId: typeof video.$inferSelect.id;
};

export function PromptForm() {
  const [prompt, setPrompt] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      toast.loading("Generating animation...");
      const result: res = await createRender(prompt);
      toast.dismiss();
      router.push(`/video/${result.renderId}?videoId=${result.videoId}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate animation. Please try again.");
      console.error(error);
    }
  };

  const handleBadgeClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          One click Animations{" "}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Describe your animation idea, and we'll generate the video for you.
        </p>

        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            placeholder="Create an animation of..."
            value={prompt}
            onChange={handleInputChange}
            className="min-h-[200px] resize-none placeholder:text-sm text-base p-4 rounded-lg shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
          />
          {prompt.trim() && (
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-4 right-4 rounded-full"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Try one of these examples:
          </p>
          <div className="flex flex-wrap gap-4 md:gap-x-6 md:gap-y-4 justify-center">
            {EXAMPLE_PROMPTS.map((example) => (
              <Badge
                key={example}
                variant="outline"
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleBadgeClick(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
