export interface Supplement {
  name: string;
  purpose: string;
  dosage: string;
  timing: string;
  phase: string;
  brand: string;
}

export interface BiofeedbackEntry {
  date: string;
  hrv?: number;
  restingHR?: number;
  tempDelta?: number;
  vo2Max?: number;
  activeCals?: number;
  deepSleep?: number;
  remSleep?: number;
  brainFog?: number;
  mood?: number;
  libido?: number;
  energy?: number;
  notes?: string;
}

export interface DayEntry {
  day: number;
  week: number;
  title: string;
  phase: string;
  tasks: Task[];
  dieOffScore?: number;
  completed: boolean;
}

export interface Task {
  id: string;
  time: string;
  description: string;
  completed: boolean;
}

export interface JournalEntry {
  date: string;
  physical: string;
  emotional: string;
  cognitive: string;
  spiritual: string;
  dieOffSymptoms: string;
  dieOffIntensity?: number;
  dieOffMitigation: string;
  meals: MealEntry[];
}

export interface MealEntry {
  meal: string;
  foods: string;
  notes: string;
}

export interface UserProgress {
  currentDay: number;
  startDate: string;
  completedDays: number[];
  journalEntries: { [date: string]: JournalEntry };
  biofeedbackEntries: { [date: string]: BiofeedbackEntry };
  dayEntries: { [day: number]: DayEntry };
} 