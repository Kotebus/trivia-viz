import {useMemo} from "react";
import type {ChartDataItem} from "../types/ChartDataItem.ts";
import type {Question} from "../types/trivia.ts";

/**
 * Hook for aggregating question data by categories for chart display.
 *
 * Counts the number of questions in each category and returns a sorted
 * array of data ready for visualization.
 *
 * @param data - Array of questions to process.
 * @returns Array of ChartDataItem objects with name (category name) and value (question count) fields,
 *          sorted in descending order by question count
 *
 * @example
 * ```TypeScript
 * const questions = [
 *   { category: 'Science', ... },
 *   { category: 'History', ... },
 *   { category: 'Science', ... }
 * ];
 * const chartData = useGetCategoryData(questions);
 * // Result: [{ name: 'Science', value: 2 }, { name: 'History', value: 1 }]
 * ```
 */
export const useGetCategoryData = (data: Question[] | undefined): ChartDataItem[] =>
    useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        const categoryMap = data.reduce((accumulator, {category}) => {
            const name = category ? category : 'No category';
            const count = (accumulator.get(name) || 0) + 1;
            accumulator.set(name, count);
            return accumulator;
        }, new Map<string, number>());

        return Array.from(categoryMap, ([name, value]) => ({name, value}))
            .sort((a, b) => b.value - a.value);
    }, [data]);