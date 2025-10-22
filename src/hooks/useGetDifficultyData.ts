import {type Difficulty, type Question} from "../types/trivia.ts";
import {useMemo} from "react";
import type {ChartDataItem} from "../types/components.ts";

// export const useGetDifficultyData = (data: Question[] | undefined) => {
//     return  useMemo(() => {
//         if (!data || data.length === 0) return [];
//
//         const map = new Map<Difficulty, number>();
//
//         data.forEach((q) =>
//             map.set(q.difficulty, (map.get(q.difficulty) || 0) + 1)
//         );
//
//         return Array.from(map.entries())
//             .map(([name, value]) =>
//                 ({ name, value }));
//     }, [data]);
// }

export const useGetDifficultyData = (data: Question[] | undefined): ChartDataItem[] => {
    return useMemo(() => {
        if (!data || data.length === 0) return [];

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