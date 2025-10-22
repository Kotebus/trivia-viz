import {useGetDifficultyData} from "../../hooks/useGetDifficultyData.ts";
import DifficultyChart from "../DifficultyChart/DifficultyChart.tsx";
import type {Question} from "../../types/trivia.ts";

interface CategoryDifficultyChartProps {
    category?: string;
    data: Question[] | undefined;
}

const CategoryDifficultyChart = ({category, data}:CategoryDifficultyChartProps) => {
    const filteredData = category ?
        data?.filter(x => x.category === category) : data;
    const categoryChartData = useGetDifficultyData(filteredData);
    return (
        <div>
            <h3>{category ?? "All categories"}</h3>
            <p>Total: {filteredData?.length}</p>
            <DifficultyChart chartData={categoryChartData}/>
        </div>
    );
}

export default CategoryDifficultyChart;