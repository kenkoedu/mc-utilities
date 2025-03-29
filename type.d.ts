// Type for topics
export interface Topic {
  t_id: number;
  t_title: string;
  t_title_c: string;
  is_junior: boolean;
  mia_e2?: number;
}

// Type for questions
export interface Question {
  q_id: number;
  t_id: number[];
  year: number;
  q_num: number;
  ans: string;
  hk_percent: number;
}

// Type for topic-question relationships
export interface TopicQuestion {
  t_id: number;
  q_id: number;
}

// Type for student data (used in StudentReport.vue)
export interface Student {
  class_num: number;
  name_e: string;
  // Add other fields as needed
}

// Type for database table structure
export interface Table {
  name: string;
  data: Record<string, any>[];
  fields: string[];
}

// Type for API responses
export interface ApiResponse<T> {
  data: T[];
  fields: string[];
}

// Type for settings store
export interface Settings {
  lang: "e" | "c";
  showAns: boolean;
  showHKPercent: boolean;
}
