
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

const getAI = () => {
  if (!API_KEY) {
    throw new Error("Gemini AI is not configured. Add GEMINI_API_KEY to enable AI features.");
  }

  return new GoogleGenAI({ apiKey: API_KEY });
};

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const getDiagnostics = async (problemDescription: string, image?: File): Promise<GenerateContentResponse> => {
  const model = 'gemini-2.5-pro'; 
  const prompt = `
    Analyze the following car problem description and the provided image (if any).
    Problem: "${problemDescription}"
    Based on this information, provide a diagnosis. Be as detailed and accurate as possible.
  `;
  
  const parts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [{ text: prompt }];

  if (image) {
    const imagePart = await fileToGenerativePart(image);
    parts.push(imagePart);
  }

  return getAI().models.generateContent({
    model,
    contents: { parts },
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          possible_causes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of potential causes for the described problem."
          },
          recommended_actions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of actionable steps the user should take."
          },
          severity_level: {
            type: Type.STRING,
            description: "An assessment of the problem's severity (Low, Medium, or High)."
          }
        },
        required: ["possible_causes", "recommended_actions", "severity_level"]
      }
    }
  });
};

export const generateMaintenanceSchedule = (make: string, model: string, year: number, mileage: number): Promise<GenerateContentResponse> => {
    const modelName = 'gemini-2.5-flash';
    const prompt = `
        Generate a maintenance schedule for a ${year} ${make} ${model} with ${mileage} miles.
    `;

    return getAI().models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    schedule: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                task_name: { type: Type.STRING, description: "Name of the maintenance task" },
                                interval_miles: { type: Type.NUMBER, description: "Recommended mileage interval for this task" },
                                description: { type: Type.STRING, description: "Brief description of the task" }
                            },
                             required: ["task_name", "interval_miles", "description"]
                        }
                    }
                },
                 required: ["schedule"]
            }
        }
    });
};

export const getDIYGuide = (topic: string): Promise<GenerateContentResponse> => {
    const model = 'gemini-2.5-pro';
    const prompt = `
        Provide a detailed, step-by-step DIY guide for the following car maintenance task: "${topic}".
        Include a list of necessary tools and safety precautions. Format the response as a single markdown string.
    `;
    return getAI().models.generateContent({ model, contents: prompt });
};

export const findCarParts = (query: string): Promise<GenerateContentResponse> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Based on the user's query "${query}", find suitable car parts. Provide a summary of the best options and links to where they can be purchased. Use Google Search to find up-to-date information and pricing. Format the response in markdown.`;
    return getAI().models.generateContent({
       model,
       contents: prompt,
       config: {
         tools: [{googleSearch: {}}],
       },
    });
};

export const findShops = (query: string, location: { latitude: number, longitude: number }): Promise<GenerateContentResponse> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Find nearby car shops based on the user's query: "${query}". Provide a summary of the best options, including their specialties and contact information if available. Format the response in markdown.`;
    return getAI().models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{googleMaps: {}}],
            toolConfig: {
                retrievalConfig: {
                    latLng: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    }
                }
            }
        }
    });
};
