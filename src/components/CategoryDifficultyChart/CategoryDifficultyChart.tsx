import {useMemo} from "react";
import {useGetDifficultyData} from "../../hooks/useGetDifficultyData.ts";
import type {Question} from "../../types/trivia.ts";
import {DifficultyChart} from "../DifficultyChart/DifficultyChart.tsx";
import {VisuallyHidden} from "../VisuallyHiddin/VisuallyHidden.tsx";
import style from "./CategoryDifficultyChart.module.css";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
    allCategoriesLabel: string;
}

export const CategoryDifficultyChart =
    ({category, data, allCategoriesLabel}: CategoryDifficultyChartProps) => {

        const filteredData = useMemo(() => {
            if (!data) {
                return [];
            }

            if (!category) {
                return data;
            }

            return data.filter(x => x.category === category);
        }, [data, category]);

        const categoryChartData = useGetDifficultyData(filteredData);
        const categoryName = category ?? allCategoriesLabel;

        if (filteredData.length === 0) {
            return (
                <div className={style.empty}>
                    <strong>{categoryName}</strong>: no data.
                </div>);
        }

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