import useSWR from "swr";
import {API_CONFIG} from "../../api/ApiConfig.ts";
import {fetchQuestions} from "../../api/TriviaApi.ts";
import type {DataItem, DataItemFieldSelectorType} from "../../types/DataItem.ts";
import {getDataWithCounts, getHtmlDecodedMainSliceData} from "../../utils.ts";
import {DashboardWithFiltration} from "../DashboardWithFiltration/DashboardWithFiltration.tsx";
import {DetailsBySliceChart} from "../DetailsBySliceChart/DetailsBySliceChart.tsx";
import {LoadingPage} from "../LoadingPage/LoadingPage.tsx";

const mainSliceFieldSelector: DataItemFieldSelectorType = (item) => item.mainSlice;

interface DashboardProps {
    fetchDataAmount: number;
    allDataLabel: string;
    sourceData?: DataItem[];
}

export const Dashboard = ({fetchDataAmount, allDataLabel, sourceData}: DashboardProps) => {
    const {data, isLoading, error} = useSWR(
        sourceData ? null : [API_CONFIG.QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(fetchDataAmount)
    );

    if (isLoading) {
        return (<LoadingPage/>);
    }

    const cleanedData = getHtmlDecodedMainSliceData(data ?? []);
    const mainChartData = getDataWithCounts(cleanedData, mainSliceFieldSelector);

    return (
        <DashboardWithFiltration
            isDataFromApiUndefined={data === undefined}
            error={error}
            data={cleanedData}
            mainChartData={mainChartData}
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