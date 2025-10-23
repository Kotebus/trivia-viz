import {useCallback, useState} from "react";
import useSWR from "swr";
import {API_CONFIG} from "../../api/ApiConfig.ts";
import {fetchQuestions} from "../../api/trivia.ts";
import {useGetDataWithCounts} from "../../hooks/useGetDataWithCounts.ts";
import {useHtmlDecodedCategoriesData} from "../../hooks/useHtmlDecodedCategoriesData.ts";
import type {Question, DataFieldSelectorType} from "../../types/trivia.ts";
import {MainChart} from "../MainChart/MainChart.tsx";
import {DetailedBySliceChart} from "../DetailedBySliceChart/DetailedBySliceChart.tsx";
import {MainSliceSelection} from "../MainSliceSelection/MainSliceSelection.tsx";
import {FetchErrorMessage} from "../FetchErrorMessage/FetchErrorMessage.tsx";
import {LoadingPage} from "../LoadingPage/LoadingPage.tsx";
import styles from "./Dashboard.module.css";

interface ActiveSlice {
    name: string;
    index: number;
}

interface DashboardProps {
    fetchDataAmount: number;
    allDataLabel: string;
    sourceData?: Question[];
    mainSliceFieldSelector: DataFieldSelectorType;
    detailedSelector: DataFieldSelectorType;
}

export const Dashboard = ({fetchDataAmount, allDataLabel, sourceData, mainSliceFieldSelector, detailedSelector}: DashboardProps) => {
    const {data, isLoading, error} = useSWR(
        [API_CONFIG.QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(sourceData ? 0 : fetchDataAmount)
    );
    const questions = useHtmlDecodedCategoriesData(data ?? []);
    const mainChartData = useGetDataWithCounts(questions, mainSliceFieldSelector);
    const mainSliceNames = mainChartData.map(x => x.name);

    const [activeSlice, setActiveSlice] = useState<ActiveSlice | undefined>(undefined);

    const handleSelectMainSlice = (sliceName?: string) => {
        const nextActiveSlice = sliceName ?
            {
                name: sliceName,
                index: mainChartData.findIndex(x => x.name === sliceName)
            } :
            undefined;

        setActiveSlice(nextActiveSlice);
    }

    const setActiveSliceByIndex = useCallback(
        (index: number) => setActiveSlice({index, name: mainChartData[index].name}),
        [mainChartData]
    );

    if (isLoading) {
        return (<LoadingPage/>);
    }

    const errorMessage = error ? <FetchErrorMessage message={error.message}/> : null;

    if (error && data === undefined) {
        return errorMessage;
    }

    if (data?.length === 0) {
        return (<div>No data.</div>);
    }

    return (
        <div className={styles.dashboard}>
            {errorMessage}
            {data !== undefined && (
                <>
                    <div className={styles.header}>
                        <MainSliceSelection
                            slicesList={mainSliceNames}
                            activeSliceName={activeSlice?.name}
                            selectSlice={handleSelectMainSlice}
                        />
                    </div>
                    <main className={styles.main}>
                        <MainChart
                            chartData={mainChartData}
                            activeIndex={activeSlice?.index}
                            setActiveIndex={setActiveSliceByIndex}
                        />
                    </main>

                    <aside className={styles.sidebar}>
                        <DetailedBySliceChart
                            mainSliceSelector={mainSliceFieldSelector}
                            detailedSelector={detailedSelector}
                            allSlicesLabel={allDataLabel}
                            data={questions}
                        />

                        {activeSlice && (
                            <DetailedBySliceChart
                                allSlicesLabel={allDataLabel}
                                slice={activeSlice.name}
                                mainSliceSelector={mainSliceFieldSelector}
                                detailedSelector={detailedSelector}
                                data={questions}
                            />
                        )}
                    </aside>
                </>
            )}
        </div>
    );
}