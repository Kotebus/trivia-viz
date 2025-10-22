import {useGetDifficultyData} from "../../hooks/useGetDifficultyData.ts";
import DifficultyChart from "../DifficultyChart/DifficultyChart.tsx";
import type {Question} from "../../types/trivia.ts";
import style from "./CategoryDifficultyChart.module.css";
import {useMemo} from "react";
import VisuallyHidden from "../VisuallyHiddin/VisuallyHidden.tsx";

const ALL_CATEGORIES = "All categories";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
}

const CategoryDifficultyChart =
    ({category, data}: CategoryDifficultyChartProps) => {

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!category) return data;
        return data.filter(x => x.category === category);
    }, [data, category]);

    const categoryChartData = useGetDifficultyData(filteredData);
    const categoryName = category ?? ALL_CATEGORIES;

    if (filteredData.length === 0)
        return (
            <div className={style.empty}>
                <strong>{categoryName}</strong>: no data.
            </div>);

    return (
        <figure aria-label={`${categoryName} difficulty distribution`}>
            <figcaption>
                <VisuallyHidden>Distribution by difficulty level</VisuallyHidden>
                <span className={style.category}>{categoryName}</span>
                <span className={style.count}>Total: {filteredData?.length}</span>
            </figcaption>
            <DifficultyChart chartData={categoryChartData}/>
        </figure>
    );
}

export default CategoryDifficultyChart;