import type {DataFieldSelectorType} from "./types/trivia.ts";

const DEFAULT_DATA_FETCH_AMOUNT = 300;

export interface AppConfig {
    header?: HeaderConfig,
    fetchDataAmount: number,
    allMainSlicesLabel: string,
}

export interface HeaderConfig {
    title: string;
    subtitle?: string;
}

export const defaultAppConfig: AppConfig = {
    header: {
        title: 'Trivia Analytics Dashboard',
        subtitle: 'Categories and difficulty statistics',
    },

    fetchDataAmount: DEFAULT_DATA_FETCH_AMOUNT,
    allMainSlicesLabel: 'All categories',
}

export const categoryFieldSelector : DataFieldSelectorType = (item)=> item.category;
export const difficultyFieldSelector : DataFieldSelectorType = (item)=> item.difficulty;