import {type Difficulty, type Question} from "../types/trivia.ts";
import {useMemo} from "react";

export const useGetDifficultyData = (data: Question[] | undefined) => {
    return  useMemo(() => {
        if (!data || data.length === 0) return [];

        const map = new Map<Difficulty, number>();

        data.forEach((q) =>
            map.set(q.difficulty, (map.get(q.difficulty) || 0) + 1)
        );

        return Array.from(map.entries())
            .map(([name, value]) =>
                ({ name, value }));
    }, [data]);
}