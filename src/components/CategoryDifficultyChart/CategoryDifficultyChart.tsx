import {useGetDifficultyData} from "../../hooks/useGetDifficultyData.ts";
import DifficultyChart from "../DifficultyChart/DifficultyChart.tsx";
import type {Question} from "../../types/trivia.ts";
import style from "./CategoryDifficultyChart.module.css";
import {useMemo} from "react";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
    useContrastMode?: boolean;
}

const CategoryDifficultyChart = ({category, data, useContrastMode = false}:CategoryDifficultyChartProps) => {
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!category) return data;
        return data.filter(x => x.category === category);
    },[data, category]);

    const categoryChartData = useGetDifficultyData(filteredData);
    const categoryName = category ?? "All categories";

    if (filteredData.length === 0)
        return (<div className={style.empty}>{categoryName}: no data.</div>);

    return (
        <figure>
            <figcaption>
                <span className={style.category}>{categoryName}</span>
                <span className={style.count}>Total: {filteredData?.length}</span>
            </figcaption>
            <DifficultyChart useContrastMode={useContrastMode} chartData={categoryChartData}/>
        </figure>
    );
}

export default CategoryDifficultyChart;