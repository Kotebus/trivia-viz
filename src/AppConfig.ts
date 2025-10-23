const DEFAULT_DATA_FETCH_AMOUNT = 300;

export type SortingType = 'Ascending' | 'Descending';

export interface AppConfig {
    header?: HeaderConfig,
    fetchDataAmount: number,
    allMainSlicesLabel: string,
    sorting: SortingType,
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
    sorting: 'Ascending',
}