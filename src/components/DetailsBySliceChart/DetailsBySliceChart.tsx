import {useMemo} from "react";
import {useGetDataWithCounts} from "../../hooks/useGetDataWithCounts.ts";
import type {DataItem, DataItemFieldSelectorType} from "../../types/DataItem.ts";
import {DetailsChart} from "../DetailsChart/DetailsChart.tsx";
import style from "./DetailsBySliceChart.module.css";

const detailedSelector : DataItemFieldSelectorType = (item)=> item.detailedSlice;

interface DetailedBySliceChartProps {
    slice?: string;
    data: DataItem[] | undefined;
    allSlicesLabel: string;
}

export const DetailsBySliceChart =
    ({slice, data = [], allSlicesLabel}: DetailedBySliceChartProps) => {

        const filteredData = useMemo(
            () => slice ? data.filter(x => x.mainSlice === slice) : data,
            [slice, data]
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