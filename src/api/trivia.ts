import axios from "axios";
import type { Question } from "../types/trivia";

const BASE_API_URL = "https://opentdb.com/api.php";

export const fetchQuestions = async (
    amount: number,
    categoryId?: number
): Promise<Question[]> => {
    const url = new URL(BASE_API_URL);
    url.searchParams.set("amount", String(amount));
    if (categoryId) url.searchParams.set("category", String(categoryId));

    return axios.get(url.toString()).then(r => r.data.results);
};