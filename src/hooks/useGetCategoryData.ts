import {type Question} from "../types/trivia.ts";
import {useMemo} from "react";

export const useGetCategoryData = (data: Question[] | undefined) => {
    return  useMemo(() => {
        if (!data || data.length === 0) return [];

        const map = new Map<string, number>();
        data.forEach((q) =>
            map.set(q.category, (map.get(q.category) || 0) + 1));

        return Array.from(map.entries())
            .map(([name, value]) =>
                ({
                    name: name.replace("&amp;", "&"),
                    value
                }));
    }, [data]);
}