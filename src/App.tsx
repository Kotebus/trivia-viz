import { SWRConfig } from "swr";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import AccessibilityProvider from "./providers/AccessibilityProvider/AccessibilityProvider.tsx";
import {API_CONFIG} from "./api/ApiConfig.ts";
import {Header} from "./components/Header/Header.tsx";

function App() {
    return (
        <SWRConfig value={{
            revalidateOnFocus: false,
            refreshInterval: API_CONFIG.REFRESH_INTERVAL,
            shouldRetryOnError: API_CONFIG.SHOULD_RETRY_ON_ERROR,
            errorRetryInterval: API_CONFIG.ERROR_RETRY_INTERVAL,
            errorRetryCount: API_CONFIG.ERROR_RETRY_COUNT,
        }}>
            <AccessibilityProvider>
                <Header/>
                <Dashboard/>
            </AccessibilityProvider>
        </SWRConfig>
    );
}

export default App;