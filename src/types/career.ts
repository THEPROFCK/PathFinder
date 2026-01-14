// src/types/career.ts

export interface ThinkingStyle {
  id: string;
  label: string;
  description: string;
}

export interface InterestArea {
  id: string;
  label: string;
  examples: string;
}

export interface UserResponses {
  thinkingStyles: string[];
  customThinkingStyle?: string;
  
  interests: string[];
  customInterest?: string;
  
  skills: string[];
  customSkills?: string;
  
  hasUniversity: boolean;
  degrees?: string;
  certifications?: string;
  educationUse: 'central' | 'supportive' | 'backup' | 'not-relevant' | '';
  
  workEnvironments: string[];
  priorities: string[];
  customPriority?: string;
  
  location?: string;
  learningHours?: string;
  financialConstraints?: string;
  willingToRetrain: boolean;
  otherConstraints?: string;
}

export interface CareerRecommendation {
  primaryCareers: Career[];
  alternativeCareers: Career[];
  explanation: string;
  actionPlan: ActionPlan;
  positioningStrategy: PositioningStrategy;
}

export interface Career {
  title: string;
  description: string;
  fitReason: string;
  requiredSkills: string[];
  requiredEducation: string[];
  tools: string[];
  dailyRoutine: DailyRoutine;
  weeklyRoutine: WeeklyRoutine;
  salaryRange?: string;
  growthPotential: string;
}

export interface DailyRoutine {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface WeeklyRoutine {
  learning: string;
  practice: string;
  networking: string;
  reflection: string;
}

export interface ActionPlan {
  next90Days: string[];
  next6Months: string[];
}

export interface PositioningStrategy {
  localJobs: string[];
  remoteJobs: string[];
  internships: string[];
  freelancing: string[];
  entrepreneurship: string[];
  portfolio: string[];
  onlinePresence: string[];
}