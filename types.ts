
export interface UserProfile {
  name: string;
  email: string;
  targetRole: string;
  resumeText?: string;
  parsedData?: ResumeParsedData;
}

export interface ResumeParsedData {
  skills: string[];
  experience: string[];
  education: string[];
  atsScore: number;
  scoreBreakdown: {
    formatting: number;
    keywordMatch: number;
    impact: number;
  };
}

export interface SkillGap {
  skill: string;
  gapLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
}

export interface RoadmapItem {
  week: number;
  topic: string;
  resources: { title: string; link: string; type: 'course' | 'youtube' }[];
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'hr';
  expectedKeywords: string[];
}

export interface DashboardStats {
  learningProgress: number;
  interviewScore: number;
  quizAverage: number;
  applicationsSent: number;
}
