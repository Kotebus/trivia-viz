import {SWRConfig} from "swr";
import {API_CONFIG} from "./api/ApiConfig.ts";
import {type AppConfig, defaultAppConfig} from "./AppConfig.ts";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import {Header} from "./components/Header/Header.tsx";
import {AccessibilityProvider} from "./providers/AccessibilityProvider/AccessibilityProvider.tsx";
import type {DataItem} from "./types/DataItem.ts";

/**
 * @property {AppConfig} [appConfig] - Application configuration settings. Defaults to defaultAppConfig if not provided.
 * @property {DataItem[]} [data] - Array of data to display. If provided, the app will use this data instead of fetching from API.
 */
export interface AppProps {
    appConfig?: AppConfig;
    data?: DataItem[];
}

export const App = ({
        appConfig = defaultAppConfig,
        data
    }: AppProps) => {
    return (
        <SWRConfig value={{
            revalidateOnFocus: false,
            refreshInterval: API_CONFIG.REFRESH_INTERVAL,
            shouldRetryOnError: API_CONFIG.SHOULD_RETRY_ON_ERROR,
            errorRetryInterval: API_CONFIG.ERROR_RETRY_INTERVAL,
            errorRetryCount: API_CONFIG.ERROR_RETRY_COUNT,
        }}>
            <AccessibilityProvider>
                {appConfig.header && (
                    <Header
                        title={appConfig.header.title}
                        subtitle={appConfig?.header.subtitle}
                    />)
                }

                <Dashboard
                    sourceData={data}
                    fetchDataAmount={appConfig.fetchDataAmount}
                    allDataLabel={appConfig.allMainSlicesLabel}
                    sortingType={appConfig.sorting}
                />
            </AccessibilityProvider>
        </SWRConfig>
    );
}