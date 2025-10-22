import { SWRConfig } from "swr";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import AccessibilityProvider from "./AccessibilityProvider/AccessibilityProvider.tsx";
import {ERROR_RETRY_COUNT, ERROR_RETRY_INTERVAL, REFRESH_INTERVAL, SHOULD_RETRY_ON_ERROR} from "./api/constants.ts";

function App() {
    return (
        <SWRConfig value={{
            revalidateOnFocus: false,
            refreshInterval: REFRESH_INTERVAL,
            shouldRetryOnError: SHOULD_RETRY_ON_ERROR,
            errorRetryInterval: ERROR_RETRY_INTERVAL,
            errorRetryCount: ERROR_RETRY_COUNT,
        }}>
            <AccessibilityProvider>
                <Dashboard/>
            </AccessibilityProvider>
        </SWRConfig>
    );
}

export default App;