import {decode} from "he";
import type {DataItem, DataItemFieldSelectorType} from "./types/DataItem.ts";

/**
 * Counts occurrences of values extracted from array items using a selector function.
 *
 * @param data - Array of items to process
 * @param selector - Function to extract the value to count from each item. Make sure it's defined above your component,
 * to avoid rerenders.
 * @returns Map with values as keys and their occurrence counts as values
 */
export const countBySelector = <T, K>(
    data: T[],
    selector: (item: T) => K
): Map<K, number> => {
    return data.reduce((accumulator, item) => {
        const key = selector(item);
        const count = (accumulator.get(key) || 0) + 1;
        accumulator.set(key, count);
        return accumulator;
    }, new Map<K, number>());
};

/**
 * Transforms an array into aggregated and counted data suitable for charts.
 *
 * Counts occurrences of values extracted from array items using a selector function
 * and returns the result as an array of objects with `name` and `amount` properties.
 *
 * @param data - Array of items to process, or undefined
 * @param selector - Function to extract the value to count from each item. Make sure it's defined above your component.
 *
 * @returns Array of objects with `name` (extracted value) and `amount` (count) properties.
 */
export const getDataWithCounts = (data: DataItem[], selector: DataItemFieldSelectorType) => {

        if (data.length === 0) {
            return [];
        }

        const dataWithCounts = countBySelector(data, selector);
        return Array.from(dataWithCounts, ([name, value]) => ({name, amount: value}));
    };

/**
 * Custom hook that decodes HTML entities in `mainSlice` fields of data.
 *
 * @param data - Array of data with potentially HTML-encoded `mainSlice`
 * @returns Array of data with decoded `mainSlice` names.
 */
export const getHtmlDecodedMainSliceData =
    (data: DataItem[]): DataItem[] => {

            console.log('getHtmlDecodedMainSliceData');
            if (data.length === 0) {
                return [];
            }

            return data.map(item => ({
                ...item,
                mainSlice: decode(item.mainSlice),
            }));
    }