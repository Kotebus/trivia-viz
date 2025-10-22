import {API_CONFIG} from "../../api/ApiConfig.ts";

function FetchErrorMessage({message}:{message?:string}) {
    return (
        <div role={'alert'}>
            <h2>Failed to load data</h2>
            {message && (<p>{message}</p>)}
            {API_CONFIG.SHOULD_RETRY_ON_ERROR && (
                <p>
                    Retry will be performed in {API_CONFIG.ERROR_RETRY_INTERVAL / 1000} seconds
                </p>
            )}
        </div>
    );
}

export default FetchErrorMessage;