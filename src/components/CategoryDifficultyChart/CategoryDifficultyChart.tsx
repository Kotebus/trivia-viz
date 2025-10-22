import {useGetDifficultyData} from "../../hooks/useGetDifficultyData.ts";
import DifficultyChart from "../DifficultyChart/DifficultyChart.tsx";
import type {Question} from "../../types/trivia.ts";
import style from "./CategoryDifficultyChart.module.css";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
}

const CategoryDifficultyChart = ({category, data}:CategoryDifficultyChartProps) => {
    const filteredData = category ?
        data?.filter(x => x.category === category) : data;
    const categoryChartData = useGetDifficultyData(filteredData);
    return (
        <figure>
            {/*<h3>{category ?? "All categories"}</h3>*/}
            {/*<p>Total: {filteredData?.length}</p>*/}
            <figcaption>
                <span className={style.category}>{category ?? "All categories"}</span>
                <span className={style.count}>Total: {filteredData?.length}</span>
            </figcaption>
            <DifficultyChart chartData={categoryChartData}/>
        </figure>
    );
}

export default CategoryDifficultyChart;