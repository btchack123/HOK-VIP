
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getVIPSupportResponse = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are the HOK VIP Assistant. You provide elite tips and strategies for Honor of Kings. 
        Tone: Professional, elite, supportive, and slightly "underground VIP" feel. 
        Focus on game mechanics, hero meta, and team composition advice.
        Always maintain the persona of a high-tier gaming coach.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The VIP servers are currently under maintenance. Please try again later.";
  }
};
