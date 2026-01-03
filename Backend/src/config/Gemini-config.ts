import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found");
}

export const geminiModel = new GoogleGenerativeAI(GEMINI_API_KEY)
  .getGenerativeModel({ model: "gemini-2.5-flash-lite" });