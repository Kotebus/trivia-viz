import {useMemo} from "react";
import type {DataFieldSelectorType, DataItem} from "../types/DataItem.ts";

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
 * React hook that transforms an array into aggregated count data suitable for charts.
 *
 * Counts occurrences of values extracted from array items using a selector function
 * and returns the result as an array of objects with `name` and `amount` properties.
 *
 * @param data - Array of items to process, or undefined
 * @param selector - Function to extract the value to count from each item
 *
 * @returns Array of objects with `name` (extracted value) and `amount` (count) properties.
 *
 * @example
 * ```TypeScript
 * interface Question {
 *   difficulty: string;
 * }
 *
 * const questions: Question[] = [
 *   { difficulty: 'easy' },
 *   { difficulty: 'hard' },
 *   { difficulty: 'easy' }
 * ];
 *
 * const chartData = useGetDataWithCounts(questions, q => q.difficulty);
 * // Returns: [{ name: 'easy', amount: 2 }, { name: 'hard', amount: 1 }]
 * ```
 */
export const useGetDataWithCounts = (data: DataItem[], selector: DataFieldSelectorType) =>
    useMemo(() => {
        if (data.length === 0) {
            return [];
        }

        const dataWithCounts = countBySelector(data, selector);
        return Array.from(dataWithCounts, ([name, value]) => ({name, amount: value}));
    }, [data, selector]);