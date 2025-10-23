import {useMemo} from "react";
import {useGetDataWithCounts} from "../../hooks/useGetDataWithCounts.ts";
import type {Question} from "../../types/trivia.ts";
import {DifficultyChart} from "../DifficultyChart/DifficultyChart.tsx";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden.tsx";
import style from "./CategoryDifficultyChart.module.css";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
    allCategoriesLabel: string;
}

const difficultySelector = (item: Question) => item.difficulty;

export const CategoryDifficultyChart =
    ({category, data = [], allCategoriesLabel}: CategoryDifficultyChartProps) => {

        const filteredData = useMemo(
            () => category ? data.filter(x => x.category === category) : data,
            [data, category]
        );

        const categoryChartData = useGetDataWithCounts(filteredData, difficultySelector);
        const categoryName = category ?? allCategoriesLabel;

        if (filteredData.length === 0) {
            return (
                <div className={style.empty}>
                    <strong>{categoryName}</strong>: no data.
                </div>);
        }

        return (
            <figure
                className={style.chart}
                aria-label={`${categoryName} difficulty distribution`}
            >
                <figcaption>
                    <VisuallyHidden>Distribution by difficulty level</VisuallyHidden>
                    <span className={style.category}>{categoryName}</span>
                    <span className={style.count}>Total: {filteredData?.length}</span>
                </figcaption>
                <DifficultyChart chartData={categoryChartData}/>
            </figure>
        );
    }