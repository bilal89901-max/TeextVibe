import { GoogleGenAI, Type } from "@google/genai";
import { type GenerationParams, type GeneratedContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    script: {
      type: Type.STRING,
      description: "The full video script, structured with an emotional hook, engaging core content, and a clear call-to-action, paced for the specified duration.",
    },
    caption: {
      type: Type.STRING,
      description: "A short, catchy, and viral-style social media caption.",
    },
    hashtags: {
      type: Type.ARRAY,
      description: "An array of exactly 5 viral hashtags, mixing trending and niche-relevant tags.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['script', 'caption', 'hashtags'],
};


const buildPrompt = (params: GenerationParams): string => {
  const { topic, videoType, length } = params;

  return `
    Act as a world-class viral content strategist and expert AI prompt engineer specializing in short-form video platforms like TikTok, YouTube Shorts, and Instagram Reels.
    Your mission is to architect a content package designed for maximum virality, engagement, and audience retention using proven prompt engineering strategies.

    **Core Inputs:**
    - User's Choice: "${videoType}"
    - Topic: "${topic}"
    - Target Duration: ${length} minutes

    **Your Expert-Level Task (Follow these steps precisely):**

    1.  **Deconstruct the Topic:**
        *   Identify the core emotion (e.g., curiosity, humor, awe, outrage).
        *   Define the target audience persona for this topic.
        *   Brainstorm a unique, contrarian, or surprising angle.

    2.  **Architect the Script (for a ${length}-minute video):**
        *   Your script MUST be suitable for the user's choice: "${videoType}". If "Short Video" is selected, keep the script concise and punchy, ideal for platforms like TikTok or Reels, regardless of the specified duration.
        *   **The Pattern Interrupt Hook (First 3 Seconds):** Start with a shocking statement, a strange visual cue, or a question that challenges a common belief. This MUST grab attention immediately.
        *   **The Value-Driven Core:** Deliver the main content. It should be concise, engaging, and emotionally resonant. Structure it with a clear narrative arc, even for short videos.
        *   **The Call-to-Action / Loop:** End with a question to drive comments or a statement that makes the viewer want to re-watch.

    3.  **Craft a Viral Caption:**
        *   Keep it short and punchy.
        *   Lead with a polarizing question or a bold, relatable statement.
        *   Generate curiosity that can only be satisfied by watching the video.

    4.  **Develop a Hashtag Strategy:**
        *   Provide exactly 5 hashtags.
        *   Include a mix of 2 broad/trending hashtags, 2 niche-specific hashtags, and 1 community-focused hashtag.

    **Output Constraints:**
    - Generate ONLY the Script, Caption, and 5 Hashtags.
    - DO NOT generate any AI image or video generation prompts.
    - Format the entire output as a single, clean JSON object that strictly adheres to the provided schema.
    - The tone must be modern, audience-grabbing, and highly shareable.
  `;
};

export const generateViralTopic = async (): Promise<string> => {
  const prompt = `
    Act as a viral content researcher and AI video strategist.
    Your task is to generate 1 random, trending video topic that is highly engaging and suitable for short-form video platforms like YouTube Shorts, TikTok, or Instagram Reels.
    The topic should be concise and intriguing.
    Return ONLY the topic text, without any labels, quotation marks, or additional commentary.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 1.0,
    },
  });

  return response.text.trim().replace(/^"|"$/g, ''); // Trim and remove potential quotes
};


export const generateVideoStrategy = async (params: GenerationParams): Promise<GeneratedContent> => {
  const prompt = buildPrompt(params);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
      temperature: 0.8,
    },
  });

  try {
    const text = response.text.trim();
    const parsedJson = JSON.parse(text);

    // Basic validation
    if (!parsedJson.script || !parsedJson.caption || !Array.isArray(parsedJson.hashtags)) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsedJson as GeneratedContent;
  } catch (error) {
    console.error("Failed to parse JSON response:", response.text);
    throw new Error("The AI returned an invalid response. Please try again.");
  }
};