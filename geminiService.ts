
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (resumeText: string, targetRole: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this resume for the role of "${targetRole}". Return JSON.
    Resume: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          experience: { type: Type.ARRAY, items: { type: Type.STRING } },
          education: { type: Type.ARRAY, items: { type: Type.STRING } },
          atsScore: { type: Type.NUMBER },
          scoreBreakdown: {
            type: Type.OBJECT,
            properties: {
              formatting: { type: Type.NUMBER },
              keywordMatch: { type: Type.NUMBER },
              impact: { type: Type.NUMBER }
            }
          },
          skillGaps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                gapLevel: { type: Type.STRING },
                recommendation: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const getCareerAdvice = async (history: any[], resumeData: string, role: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are VidyāMitra, a world-class AI Career Mentor. 
      You are helping a candidate for the role of: ${role}.
      Their resume highlights: ${resumeData.substring(0, 1000)}...
      Be encouraging, professional, and provide actionable technical or HR advice. 
      Keep answers concise and structured.`,
    }
  });

  const lastMessage = history[history.length - 1].content;
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};

export const generateLearningPath = async (skills: string[], gaps: string[], role: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 4-week learning roadmap for a ${role} focusing on these skill gaps: ${gaps.join(', ')}. Current skills: ${skills.join(', ')}. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.NUMBER },
            topic: { type: Type.STRING },
            description: { type: Type.STRING },
            resources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  link: { type: Type.STRING },
                  type: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateQuiz = async (skills: string[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 multiple choice questions based on these skills: ${skills.join(', ')}. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateInterviewQuestions = async (resumeData: string, role: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Acting as a professional recruiter, generate 5 interview questions (mixture of technical and HR) for a ${role} candidate based on this resume: ${resumeData}. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            type: { type: Type.STRING },
            expectedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const evaluateInterviewResponse = async (question: string, answer: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate this interview answer. 
    Question: ${question}
    Answer: ${answer}
    Provide a score (0-100), feedback, and improvement plan. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          improvementPlan: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
