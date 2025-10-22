import {decode} from "he";
import {useMemo} from "react";

import type {Question} from "../types/trivia.ts";

/**
 * Custom hook that decodes HTML entities in category names of questions data.
 *
 * @param data - Array of questions with potentially HTML-encoded category names, or undefined
 * @returns Array of questions with decoded category names. Returns an empty array if the input is undefined or empty.
 *
 * @example
 * ```TypeScript
 * const questions = useHtmlDecodedCategoriesData(fetchedQuestions);
 * // Input: [{ category: "Entertainment: &amp; Music", ... }]
 * // Output: [{ category: "Entertainment: & Music", ... }]
 * ```
 */
export const useHtmlDecodedCategoriesData =
    (data: Question[] | undefined): Question[] => {

        return useMemo(() => {
            if (!data || data.length === 0) {
                return [];
            }

            return data.map(item => ({
                ...item,
                category: decode(item.category),
            }));
        }, [data]);
    }