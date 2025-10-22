import {type Difficulty} from "../../types/trivia.ts";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type {ChartDataItem} from "../../types/components.ts";


const COLORS = {
    easy: 'hsl(95, 75%, 31%)',
    medium: 'hsl(35,96%,56%)',
    hard: 'hsl(0,86%,55%)',
};
const COLORS_CONTRAST = {
    easy: 'hsl(207, 83%, 44%)',
    medium: 'hsl(167, 94%, 25%)',
    hard: 'hsl(350, 100%, 38%)',
};

interface DifficultyChartProps {
    chartData: ChartDataItem[]
}

function DifficultyChart({chartData}:DifficultyChartProps) {
    const userPrefersHighContrast = window.matchMedia("(prefers-contrast: more)").matches;
    const colors = userPrefersHighContrast ? COLORS_CONTRAST : COLORS;
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
                                  fill={colors[entry.name as Difficulty]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
    );
}

export default DifficultyChart;