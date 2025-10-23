import {SWRConfig} from "swr";
import {API_CONFIG} from "./api/ApiConfig.ts";
import {type AppConfig, categoryFieldSelector, defaultAppConfig, difficultyFieldSelector} from "./AppConfig.ts";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import {Header} from "./components/Header/Header.tsx";
import {AccessibilityProvider} from "./providers/AccessibilityProvider/AccessibilityProvider.tsx";
import type {DataFieldSelectorType, Question} from "./types/trivia.ts";

/**
 * @property {AppConfig} [appConfig] - Application configuration settings. Defaults to defaultAppConfig if not provided.
 * @property {Question[]} [data] - Array of data to display. If provided, the app will use this data instead of fetching from API.
 * @property {DataFieldSelectorType} [mainSliceFieldSelector] - Main field selector from the data used to build the primary dashboard chart.
 *                                                               Expected to have up to 30 different values for optimal visualization.
 *                                                               Defaults to categoryFieldSelector if not provided.
 * @property {DataFieldSelectorType} [detailedSelector] - Additional breakdown selector for detailed view.
 *                                                         Expected to have between 2 to 6 different values for optimal UI.
 *                                                         More values may result in uncomfortable UI experience.
 *                                                         Defaults to difficultyFieldSelector if not provided.
 */
export interface AppProps {
    appConfig?: AppConfig;
    data?: Question[];
    mainSliceFieldSelector?: DataFieldSelectorType,
    detailedSelector?: DataFieldSelectorType,
}

export const App = ({
        appConfig = defaultAppConfig,
        mainSliceFieldSelector,
        detailedSelector,
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
                {appConfig.header && (<Header config={appConfig.header}/>)}
                <Dashboard
                    sourceData={data}
                    detailedSelector={detailedSelector ?? difficultyFieldSelector}
                    mainSliceFieldSelector={mainSliceFieldSelector ?? categoryFieldSelector}
                    fetchDataAmount={appConfig.fetchDataAmount}
                    allDataLabel={appConfig.allMainSlicesLabel}
                />
            </AccessibilityProvider>
        </SWRConfig>
    );
}