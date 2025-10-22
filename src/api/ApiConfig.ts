export const API_CONFIG = {
    BASE_API_ENDPOINT_URL: "https://opentdb.com/api.php",
    QUESTIONS_REQUEST_KEY: "questions",

    REFRESH_INTERVAL: 0,
    ERROR_RETRY_INTERVAL: 1500,
    ERROR_RETRY_COUNT: 5,
    SHOULD_RETRY_ON_ERROR: true,
} as const;