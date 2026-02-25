export type ServiceId = "today" | "newyear" | "compatibility" | "saju";

export interface FortuneFormValues {
  name?: string;
  gender: string;
  birthDate: string;
  isLunar: boolean;
  birthTime?: string | "unknown";
  birthPlace?: string;
}

export interface FortuneFormProps {
  serviceId: ServiceId;
  onSuccess?: (values: FortuneFormValues) => void;
}

// Dummy result types (display only)
export interface DummyTodayResult {
  date: string;
  summary: string;
  categories: { title: string; content: string; score?: number }[];
  luckyItem?: string;
  luckyTime?: string;
}

export interface DummyNewYearResult {
  year: number;
  summary: string;
  monthly: { month: number; text: string }[];
  advice: string;
}

export interface DummyCompatibilityResult {
  names: [string, string];
  score: number;
  summary: string;
  sections: { title: string; content: string }[];
}

export interface DummySajuResult {
  birthDate: string;
  pillars?: { name: string; value: string }[];
  summary: string;
  details: { title: string; content: string }[];
}
