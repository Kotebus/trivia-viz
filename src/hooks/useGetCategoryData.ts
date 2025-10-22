import {type Question} from "../types/trivia.ts";
import {useMemo} from "react";
import type {ChartDataItem} from "../types/components.ts";

export const useGetCategoryData = (data: Question[] | undefined): ChartDataItem[] => {
    return useMemo(() => {
        if (!data || data.length === 0) return [];

        const categoryMap = data.reduce((accumulator, question) => {
            const category = question.category;
            const name = category ? category : 'No category';
            const count = (accumulator.get(name) || 0) + 1;
            accumulator.set(name, count);
            return accumulator;
        }, new Map<string, number>());

        return Array.from(categoryMap, ([name, value]) => ({name, value}))
            .sort((a, b) => b.value - a.value);
    }, [data]);
}