// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY!);

export const getGeminiModel = () =>
  genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
