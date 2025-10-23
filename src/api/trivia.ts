import axios from "axios";
import type { Question } from "../types/trivia";
import {API_CONFIG} from "./ApiConfig.ts";

interface ServerResponse {
    results: Question[];
}

export const fetchQuestions = async (
    amount: number,
): Promise<Question[]> => {

    if (amount === 0) {
        return [];
    }

    return axios.get<Question[]>(
        API_CONFIG.API_ENDPOINT_URL,
        {
            baseURL: API_CONFIG.BASE_URL,
            params: { amount },
            transformResponse: (r) => {
                const data = JSON.parse(r) as ServerResponse;
                return data.results;
            },
        },
    ).then(r => r.data);
};