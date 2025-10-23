import {useMemo} from "react";
import {useGetDataWithCounts} from "../../hooks/useGetDataWithCounts.ts";
import type {Question, DataFieldSelectorType} from "../../types/trivia.ts";
import {DetailsChart} from "../DetailsChart/DetailsChart.tsx";
import style from "./DetailedBySliceChart.module.css";

interface DetailedBySliceChartProps {
    slice?: string;
    data: Question[] | undefined;
    allSlicesLabel: string;
    mainSliceSelector: DataFieldSelectorType;
    detailedSelector: DataFieldSelectorType;
}

export const DetailedBySliceChart =
    ({slice, data = [], allSlicesLabel, mainSliceSelector, detailedSelector}: DetailedBySliceChartProps) => {

        const filteredData = useMemo(
            () => slice ? data.filter(x => mainSliceSelector(x) === slice) : data,
            [slice, data, mainSliceSelector]
        );

        const chartData = useGetDataWithCounts(filteredData, detailedSelector);
        const sliceName = slice ?? allSlicesLabel;

        if (filteredData.length === 0) {
            return (
                <div className={style.empty}>
                    <strong>{sliceName}</strong>: no data.
                </div>);
        }

        return (
            <figure
                className={style.chart}
                aria-label={`${sliceName} distribution`}
            >
                <figcaption>
                    <span className={style.slice}>{sliceName}</span>
                    <span className={style.count}>Total: {filteredData?.length}</span>
                </figcaption>
                <DetailsChart chartData={chartData}/>
            </figure>
        );
    }