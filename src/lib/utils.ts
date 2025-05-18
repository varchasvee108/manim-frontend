import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { manimCodePrompt } from "./prompts";
import { GoogleGenAI } from "@google/genai";
import { db } from "./db";
import { video } from "./db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

