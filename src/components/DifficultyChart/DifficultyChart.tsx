import {type Difficulty} from "../../types/trivia.ts";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type {ChartDataItem} from "../../types/components.ts";

const COLORS = {
    easy: 'hsl(89.06deg 57.66% 56.47%)',
    medium: 'hsl(46.45deg 100% 48.63%)',
    hard: 'hsl(0, 84%, 60%)',
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
                            <Cell key={entry.name} fill={COLORS[entry.name as Difficulty]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
    );
}

export default DifficultyChart;