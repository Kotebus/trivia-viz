import {API_CONFIG} from "../../api/ApiConfig.ts";

interface FetchErrorMessageProps {
    message: string;
}
export const FetchErrorMessage = ({message}: FetchErrorMessageProps) => {
    return (
        <div role='alert'>

            <strong>Failed to load data</strong>

            <p>{message}</p>

            {API_CONFIG.SHOULD_RETRY_ON_ERROR && (
                <p>
                    Retry will be performed in {API_CONFIG.ERROR_RETRY_INTERVAL / 1000} seconds
                </p>
            )}
        </div>
    );
}