import { GoogleGenAI } from "@google/genai";
import { manimCodePrompt } from "./prompts";

export const runManimPipeline = async (
  prompt: string,
  videoId: string,
  renderId: string
) => {
  if (!prompt || prompt.trim().length <= 0) {
    throw new Error("Prompt is required");
  }
  try {
    const { systemPrompt, userPrompt } = manimCodePrompt(prompt);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: {
          includeThoughts: false,
          thinkingBudget: 0,
        },
      },
    });

    const manimCode = response.text;

    fetch(process.env.FASTAPI_RENDER_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: manimCode,
        video_id: videoId,
        render_id: renderId,
      }),
    }).catch((err) => {
      console.error("Failed to trigger FastAPI render:", err);
    });

    return { manimCode };
  } catch (error) {
    console.log(error, "ERROR FROM RUN MANIM PIPELINE");
    return { error: "Failed to run manim pipeline" };
  }
};
