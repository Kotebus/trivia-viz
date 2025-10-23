import useSWR from "swr";
import {API_CONFIG} from "../../api/ApiConfig.ts";
import {fetchQuestions} from "../../api/TriviaApi.ts";
import type {DataItem} from "../../types/DataItem.ts";
import {getHtmlDecodedMainSliceData} from "../../utils.ts";
import {DynamicDashboard} from "../DynamicDashboard/DynamicDashboard.tsx";
import {DetailsBySliceChart} from "../DetailsBySliceChart/DetailsBySliceChart.tsx";
import {LoadingPage} from "../LoadingPage/LoadingPage.tsx";

interface DashboardProps {
    fetchDataAmount: number;
    allDataLabel: string;
    sourceData?: DataItem[];
}

export const Dashboard = ({fetchDataAmount, allDataLabel, sourceData}: DashboardProps) => {
    const {data, isLoading, error} = useSWR(
        [API_CONFIG.QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(sourceData ? 0 : fetchDataAmount)
    );
    const cleanedData = getHtmlDecodedMainSliceData(data ?? []);

    if (isLoading) {
        return (<LoadingPage/>);
    }

    return (
        <DynamicDashboard
            isDataFromApiUndefined={data === undefined}
            error={error}
            data={cleanedData}
            allSlicesLabel={allDataLabel}
            staticPieChart={(
                <DetailsBySliceChart
                    allSlicesLabel={allDataLabel}
                    data={cleanedData}
                />
            )}
        />
    );
}