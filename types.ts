
export enum Section {
  NONE,
  LISTENING,
  STRUCTURE,
  READING,
  PRACTICE,
  MATERIAL_SELECTION,
}

export type QuizSection = 'Listening' | 'Structure' | 'Reading';

export interface QuizQuestion {
  passage?: string; // For Reading
  audioScript?: string; // For Listening
  question: string;
  options: { [key: string]: string }; // e.g., { "A": "Text A", "B": "Text B" }
  answer: string; // The key of the correct option, e.g., "A"
}
