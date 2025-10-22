import {useMemo} from "react";
import { decode } from "he";

import type {Question} from "../types/trivia.ts";

export const  useHtmlDecodedCategoriesData =
    (data: Question[] | undefined): Question[] => {

    return useMemo(() => {
        if (!data || data.length === 0) return [];

        return data.map(item => ({
            ...item,
            category: decode(item.category),
        }));
    }, [data]);
}