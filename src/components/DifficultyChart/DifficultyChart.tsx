import {type Difficulty} from "../../types/trivia.ts";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type {ChartDataItem} from "../../types/components.ts";

const COLORS = {
    easy:   'rgb(70, 140, 20)',
     medium: 'rgb(255,167,52)',
     hard: 'rgb(239, 67, 67)',
//     medium: 'rgb(210, 120, 20)',
//     hard:   'rgb(200, 30, 30)',
};

interface DifficultyChartProps {
    chartData: ChartDataItem[]
}

function DifficultyChart({chartData}:DifficultyChartProps) {
    return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {chartData.map((entry) => (
                            <Cell key={entry.name}
                                  fill={COLORS[entry.name as Difficulty]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
    );
}

export default DifficultyChart;