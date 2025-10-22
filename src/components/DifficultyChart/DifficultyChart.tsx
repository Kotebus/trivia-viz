import type {Difficulty} from "../../types/trivia.ts";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type {ChartDataItem} from "../../types/components.ts";

const COLORS: Record<Difficulty, string> = {
    easy: "#22c55e",
    medium: "#eab308",
    hard: "#ef4444",
};

function DifficultyChart({chartData}:{chartData: ChartDataItem[]}) {
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