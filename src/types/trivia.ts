export const difficultyLevels = ['easy', 'medium', 'hard'] as const;

export type Difficulty = typeof difficultyLevels[number];

export type Question = {
    category: string;
    difficulty: Difficulty;
};