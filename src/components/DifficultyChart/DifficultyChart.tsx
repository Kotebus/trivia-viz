import {type Difficulty} from "../../types/trivia.ts";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type {ChartDataItem} from "../../types/components.ts";
import {use} from "react";
import {AccessibilityContext} from "../../providers/AccessibilityProvider/AccessibilityContext.tsx";

const CHART_HEIGHT = 250;
const PIE_CHART_OUTER_RADIUS = 80;

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
    chartData: ChartDataItem[];
}

function DifficultyChart({chartData}:DifficultyChartProps) {
    const accessibilityContext = use(AccessibilityContext);

    const isContrastMode = accessibilityContext?.isHighContrast ?? false;
    const isMotionReduced = accessibilityContext?.isMotionReduced ?? false;

    if (chartData.length === 0) return null;

    const colors = isContrastMode ? COLORS_CONTRAST : COLORS;
    return (
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <PieChart>
                    <Pie
                        isAnimationActive={!isMotionReduced}
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={PIE_CHART_OUTER_RADIUS}
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