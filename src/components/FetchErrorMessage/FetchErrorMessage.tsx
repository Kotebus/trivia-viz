import {API_CONFIG} from "../../api/ApiConfig.ts";
import styles from "./FetchErrorMessage.module.css";

interface FetchErrorMessageProps {
    message: string;
}
export const FetchErrorMessage = ({message}: FetchErrorMessageProps) => {
    return (
        <div role={'alert'} className={styles.wrapper}>
            <h2>Failed to load data</h2>
            <p>{message}</p>
            {API_CONFIG.SHOULD_RETRY_ON_ERROR && (
                <p>
                    Retry will be performed in {API_CONFIG.ERROR_RETRY_INTERVAL / 1000} seconds
                </p>
            )}
        </div>
    );
}