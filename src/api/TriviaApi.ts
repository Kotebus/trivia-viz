import axios from "axios";
import type {Difficulty, DataItem} from "../types/DataItem.ts";
import {API_CONFIG} from "./ApiConfig.ts";

interface ServerResponse {
    results: QuestionItem[];
}

interface QuestionItem {
    category: string;
    difficulty: Difficulty;
}

export const fetchQuestions = async (
    amount: number,
): Promise<DataItem[]> => {

    if (amount === 0) {
        return [];
    }

    return axios.get<DataItem[]>(
        API_CONFIG.API_ENDPOINT_URL,
        {
            baseURL: API_CONFIG.BASE_URL,
            params: { amount },
            transformResponse: (r) => {
                const data = JSON.parse(r) as ServerResponse;
                return data.results?.map(item => ({
                    mainSlice: item.category,
                    detailedSlice: item.difficulty
                } as DataItem)) ?? [];
            },
        },
    ).then(r => r.data);
};