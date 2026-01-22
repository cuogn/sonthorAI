import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateFinancialInsight = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are Henry SWE, a senior AI financial analyst for SONTHOR. Keep anSWErs concise, professional, and data-driven. Use financial terminology appropriately but remain accessible.",
      }
    });
    return response.text || "I apologize, I cannot access the market data at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Market connection interrupted. Please check your API configuration.";
  }
};

export const streamChatResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
    try {
        const ai = getAiClient();
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history,
            config: {
                systemInstruction: "You are Henry SWE, the AI face of SONTHOR investment. You are helpful, smart, and confident. You help users analyze stocks like AAPL, TSLA, and NVDA. Keep responses brief (under 100 words) unless asked for a deep dive.",
            }
        });

        const result = await chat.sendMessageStream({ message: newMessage });
        return result;
    } catch (error) {
        console.error("Chat Stream Error:", error);
        throw error;
    }
}