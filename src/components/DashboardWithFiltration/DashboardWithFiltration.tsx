import {type ReactNode, useState} from "react";
import type {SortingType} from "../../AppConfig.ts";
import type {ChartDataItem} from "../../types/ChartDataItem.ts";
import type {DataItem} from "../../types/DataItem.ts";
import {DetailsBySliceChart} from "../DetailsBySliceChart/DetailsBySliceChart.tsx";
import {FetchErrorMessage} from "../FetchErrorMessage/FetchErrorMessage.tsx";
import {MainChart} from "../MainChart/MainChart.tsx";
import {MainSliceSelection} from "../MainSliceSelection/MainSliceSelection.tsx";
import styles from "./DashboardWithFiltration.module.css";

interface ActiveSlice {
    name: string;
    index: number;
}

interface DynamicDashboardProps {
    isDataFromApiUndefined: boolean;
    error?: Error;
    data: DataItem[];
    mainChartData: ChartDataItem[];
    allSlicesLabel: string;
    staticPieChart: ReactNode;
    sortingType: SortingType;
}

export const DashboardWithFiltration = ({
                                     data,
                                     allSlicesLabel,
                                     isDataFromApiUndefined,
                                     error,
                                     staticPieChart,
                                     mainChartData,
                                     sortingType,
                                 }: DynamicDashboardProps) => {

    const [activeSlice, setActiveSlice] = useState<ActiveSlice | undefined>(undefined);

    if (data.length === 0 && !error) {
        return (<div>No data.</div>);
    }

    const mainSliceNames = mainChartData.map(x => x.name);

    const handleSelectMainSlice = (sliceName?: string) => {
        const nextActiveSlice = sliceName ?
            {
                name: sliceName,
                index: mainChartData.findIndex(x => x.name === sliceName)
            } :
            undefined;

        setActiveSlice(nextActiveSlice);
    }

    const setActiveSliceByIndex =
        (index: number) => setActiveSlice({index, name: mainChartData[index].name});

    return (
        <div className={styles.dashboard}>

            {error && <FetchErrorMessage message={error.message}/>}

            {!isDataFromApiUndefined && (
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
                                sortingType={sortingType}
                                data={data}
                            />
                        )}
                    </aside>
                </>
            )}
        </div>
    );
}
