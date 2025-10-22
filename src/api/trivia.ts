import axios from "axios";
import type { Question } from "../types/trivia";
import {API_CONFIG} from "./ApiConfig.ts";

export const fetchQuestions = async (
    amount: number,
): Promise<Question[]> => {

    if (amount === 0) {
        return [];
    }

    const url = new URL(API_CONFIG.BASE_API_ENDPOINT_URL);
    url.searchParams.set("amount", String(amount));
    return axios.get(url.toString()).then(r => r.data.results);
};