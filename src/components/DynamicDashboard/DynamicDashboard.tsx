import {type ReactNode, useCallback, useState} from "react";
import type {DataItem, DataItemFieldSelectorType} from "../../types/DataItem.ts";
import {getDataWithCounts} from "../../utils.ts";
import {DetailsBySliceChart} from "../DetailsBySliceChart/DetailsBySliceChart.tsx";
import {FetchErrorMessage} from "../FetchErrorMessage/FetchErrorMessage.tsx";
import {MainChart} from "../MainChart/MainChart.tsx";
import {MainSliceSelection} from "../MainSliceSelection/MainSliceSelection.tsx";
import styles from "./DynamicDashboard.module.css";

interface ActiveSlice {
    name: string;
    index: number;
}

const mainSliceFieldSelector: DataItemFieldSelectorType = (item) => item.mainSlice;

interface DynamicDashboardProps {
    isApiDataUndefined: boolean;
    error?: Error;
    questions: DataItem[];
    allSlicesLabel: string;
    staticPieChart: ReactNode;
}

export const DynamicDashboard = ({
                                     questions,
                                     allSlicesLabel,
                                     isApiDataUndefined,
                                     error,
                                     staticPieChart
                                 }: DynamicDashboardProps) => {
    const mainChartData = getDataWithCounts(questions, mainSliceFieldSelector);
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

    if (questions.length === 0 && !error) {
        return (<div>No data.</div>);
    }

    return (
        <div className={styles.dashboard}>
            {error && <FetchErrorMessage message={error.message}/>}
            {!isApiDataUndefined && (
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
                        {staticPieChart}

                        {activeSlice && (
                            <DetailsBySliceChart
                                allSlicesLabel={allSlicesLabel}
                                slice={activeSlice.name}
                                data={questions}
                            />
                        )}
                    </aside>
                </>
            )}
        </div>
    );
}
