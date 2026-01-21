
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateMaterial = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const text = response.text;
    if (text) {
        return text;
    } else {
        return "No content generated. Please try again.";
    }

  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        return `Error generating content: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while generating content.";
  }
};

// FIX: Added a schema for the quiz question JSON structure to ensure reliable parsing.
const quizQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING },
        options: {
            type: Type.OBJECT,
            properties: {
                A: { type: Type.STRING },
                B: { type: Type.STRING },
                C: { type: Type.STRING },
                D: { type: Type.STRING },
            },
            required: ['A', 'B', 'C', 'D'],
        },
        answer: { type: Type.STRING },
        passage: { type: Type.STRING },
        audioScript: { type: Type.STRING },
    },
    required: ['question', 'options', 'answer'],
};

export const generateJsonMaterial = async <T>(prompt: string): Promise<T> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        // FIX: Using responseSchema to enforce a valid JSON output.
        responseSchema: quizQuestionSchema,
      },
    });

    const text = response.text;
    if (text) {
      // FIX: With responseSchema, string cleaning is no longer needed.
      return JSON.parse(text.trim()) as T;
    } else {
      throw new Error("No content generated from API.");
    }
  } catch (error) {
    console.error("Error generating JSON content:", error);
    throw new Error("Failed to generate or parse quiz question.");
  }
};
