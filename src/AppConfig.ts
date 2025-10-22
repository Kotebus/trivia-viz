const DEFAULT_DATA_FETCH_AMOUNT = 300;

export interface AppConfig {
    header?: HeaderConfig,
    fetchDataAmount: number,
    allDataLabel: string,
}

export interface HeaderConfig {
    title: string;
    subtitle?: string;
}

export const DefaultAppConfig : AppConfig = {
    header: {
        title: 'Trivia Analytics Dashboard',
        subtitle: 'Categories and difficulty statistics',
    },

    fetchDataAmount: DEFAULT_DATA_FETCH_AMOUNT,
    allDataLabel: 'All categories',
}