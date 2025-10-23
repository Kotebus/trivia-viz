import {useMemo} from "react";
import useSWR, {type Fetcher} from "swr";
import {API_CONFIG} from "../../api/ApiConfig.ts";
import {fetchQuestions} from "../../api/TriviaApi.ts";
import type {SortingType} from "../../AppConfig.ts";
import type {DataItem, DataItemFieldSelectorType} from "../../types/DataItem.ts";
import {getDataWithCounts, getHtmlDecodedMainSliceData} from "../../utils.ts";
import {DashboardWithFiltration} from "../DashboardWithFiltration/DashboardWithFiltration.tsx";
import {DetailsBySliceChart} from "../DetailsBySliceChart/DetailsBySliceChart.tsx";
import {Loader} from "../Loader/Loader.tsx";

const mainSliceFieldSelector: DataItemFieldSelectorType = (item) => item.mainSlice;

interface DashboardProps {
    fetchDataAmount: number;
    allDataLabel: string;
    sourceData?: DataItem[];
    sortingType: SortingType;
}

const fetcher: Fetcher<DataItem[], [string, number]> = ([, amount]) => fetchQuestions(amount);

export const Dashboard = ({
                              fetchDataAmount,
                              allDataLabel,
                              sourceData,
                              sortingType
}: DashboardProps) => {

    const {data, isLoading, error} = useSWR<DataItem[], Error>(
        sourceData ? null : [API_CONFIG.QUESTIONS_REQUEST_KEY, fetchDataAmount],
        fetcher
    );

    const cleanedData =  useMemo(
        () => getHtmlDecodedMainSliceData(sourceData ?? data ?? []),
        [data, sourceData]
    );
    const mainChartData = useMemo(
        () => getDataWithCounts(cleanedData, mainSliceFieldSelector, sortingType),
        [cleanedData, sortingType]
    );

    if (isLoading) {
        return (<Loader/>);
    }

    return (
        <DashboardWithFiltration
            isDataFromApiUndefined={data === undefined}
            error={error}
            data={cleanedData}
            mainChartData={mainChartData}
            allSlicesLabel={allDataLabel}
            sortingType={sortingType}
            staticPieChart={(
                <DetailsBySliceChart
                    allSlicesLabel={allDataLabel}
                    sortingType={sortingType}
                    data={cleanedData}
                />
            )}
        />
    );
}