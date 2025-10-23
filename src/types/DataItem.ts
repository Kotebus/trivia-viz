export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DataItem {
    mainSlice: string;
    detailedSlice: Difficulty | string;
}

type QuestionFieldTypes = DataItem[keyof DataItem];

export type DataFieldSelectorType = (item: DataItem) => QuestionFieldTypes;