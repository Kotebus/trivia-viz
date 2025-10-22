import {useMemo} from "react";
import type {ChartDataItem} from "../types/ChartDataItem.ts";
import type {Difficulty, Question} from "../types/trivia.ts";

/**
 * Transforms data with questions into a chart-ready format grouped by difficulty level.
 *
 * This hook aggregates questions by their difficulty (easy, medium, hard) and returns
 * the data formatted for chart visualization components.
 *
 * @param data - Array of questions data or undefined
 * @returns Array of chart data items with difficulty names and their corresponding counts.
 *
 * @example
 * ```tsx
 * const questions = [
 *   { difficulty: 'easy', ... },
 *   { difficulty: 'easy', ... },
 *   { difficulty: 'hard', ... }
 * ];
 * const chartData = useGetDifficultyData(questions);
 * // Returns: [{ name: 'easy', value: 2 }, { name: 'hard', value: 1 }]
 * ```
 */
export const useGetDifficultyData = (data: Question[] | undefined): ChartDataItem[] => {
    return useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        const difficultyMap = data.reduce((
            accumulator,
            question
        ) => {
            const name = question.difficulty;
            const count = (accumulator.get(name) || 0) + 1;
            accumulator.set(name, count);
            return accumulator;
        }, new Map<Difficulty, number>());

        return Array.from(
            difficultyMap,
            ([name, value]) => ({name, value})
        );
    }, [data]);
}