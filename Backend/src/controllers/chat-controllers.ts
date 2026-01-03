import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { geminiModel } from "../config/Gemini-config";

export const generatechatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: "User not registered OR Token malfunctioned",
      });
    }

    /**
     * Convert stored chats to Gemini format
     * Gemini roles:
     *  - "user"
     *  - "model"
     */
    const history = user.chats.map((chat) => ({
      role: chat.role === "assistant" ? "model" : "user",
      parts: [{ text: chat.content }],
    }));

    // Start Gemini chat with history
    const chatSession = geminiModel.startChat({
      history,
    });

    // Send new user message
    const result = await chatSession.sendMessage(message);
    const assistantReply = result.response.text();

    if (!assistantReply) {
      return res.status(500).json({
        message: "Gemini response failed",
      });
    }

    // Save chats in DB (your existing format)
    user.chats.push({ role: "user", content: message });
    user.chats.push({ role: "assistant", content: assistantReply });

    await user.save();

    return res.status(200).json({
      reply: assistantReply,
      chats: user.chats,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      message: "Something went wrong with Gemini API",
    });
  }
};
