import axios from "axios";
import type { Question } from "../types/trivia";
import {BASE_API_ENDPOINT_URL} from "./constants.ts";

export const fetchQuestions = async (
    amount: number,
): Promise<Question[]> => {
    const url = new URL(BASE_API_ENDPOINT_URL);
    url.searchParams.set("amount", String(amount));
    return axios.get(url.toString()).then(r => r.data.results);
};