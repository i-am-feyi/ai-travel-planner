import { getGeminiModel } from "@/lib/gemini";
import { generateTripPrompt } from "../utils/generate-trip-prompt";

export async function generateTripFromGemini(input: {
  location: string;
  groupType: string;
  numberOfDays: number;
  travelStyle: string;
  interests: string[];
  budget: string;
}) {
  const model = getGeminiModel();
  const prompt = generateTripPrompt(input);

  // Parse and return trip object
  try {
    const result = await model.generateContent(prompt);
    const raw = await result.response.text();

    // Clean up Gemini's markdown code block
    const cleaned = raw
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const json = JSON.parse(cleaned);
    return json;
  } catch (err) {
    console.error("Failed to parse Gemini response", err);
    throw new Error("Invalid JSON from Gemini");
  }
}
