export interface BaseQuestion {
  _id?: string;
  quiz: string;
  title: string;
  points: number;
  description?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "Multiple Choice";
  options: { text: string; isCorrect: boolean }[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "True/False";
  correctAnswer: boolean;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: "Fill in the Blank";
  correctAnswers: string[];
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion;
