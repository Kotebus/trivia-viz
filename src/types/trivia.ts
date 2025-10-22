export type Difficulty = 'easy' | 'medium' | 'hard';

export type Question = {
    category: string;
    difficulty: Difficulty;
};