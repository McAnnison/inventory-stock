import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// Vercel Serverless Function entry point
app.post("/api/ai/insights", async (req, res) => {
  try {
    const { inventoryData } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are an advanced retail inventory AI assistant. Analyze the following shelf edge inventory data and provide 3 short, actionable insights or alerts. Keep each insight under 15 words. Focus on restocking, planogram compliance, or sales trends.
      Data: ${JSON.stringify(inventoryData)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Insight Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate insights" });
  }
});

export default app;
