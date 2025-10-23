export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Represents a data item for chart visualization.
 * 
 * @interface DataItem
 * @property {string} mainSlice - Field used to build the main bar chart
 * @property {Difficulty | string} detailedSlice - Field used to build the additional pie chart
 */
export interface DataItem {
    mainSlice: string;
    detailedSlice: Difficulty | string;
}

type DataItemFieldTypes = DataItem[keyof DataItem];

export type DataItemFieldSelectorType = (item: DataItem) => DataItemFieldTypes;