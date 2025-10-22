import { SWRConfig } from "swr";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import {AccessibilityProvider} from "./providers/AccessibilityProvider/AccessibilityProvider.tsx";
import {API_CONFIG} from "./api/ApiConfig.ts";
import {Header} from "./components/Header/Header.tsx";
import {type AppConfig, DefaultAppConfig} from "./AppConfig.ts";
import type {Question} from "./types/trivia.ts";

export interface AppProps {
    appConfig?: AppConfig;
    data?: Question[];
}
export function App({appConfig = DefaultAppConfig, data}: AppProps) {
    return (
        <SWRConfig value={{
            revalidateOnFocus: false,
            refreshInterval: API_CONFIG.REFRESH_INTERVAL,
            shouldRetryOnError: API_CONFIG.SHOULD_RETRY_ON_ERROR,
            errorRetryInterval: API_CONFIG.ERROR_RETRY_INTERVAL,
            errorRetryCount: API_CONFIG.ERROR_RETRY_COUNT,
        }}>
            <AccessibilityProvider>
                {appConfig.header && (<Header config={appConfig.header}/>)}
                <Dashboard
                    sourceData={data}
                    fetchDataAmount={appConfig.fetchDataAmount}
                    allDataLabel={appConfig.allDataLabel}
                />
            </AccessibilityProvider>
        </SWRConfig>
    );
}