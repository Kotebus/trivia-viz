export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
    category: string;
    type: string;//We need it for demonstration purposes
    difficulty: Difficulty;
}

type QuestionFieldTypes = Question[keyof Question];

export type DataFieldSelectorType = (item: Question) => QuestionFieldTypes;