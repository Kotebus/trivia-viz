import {use} from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {AccessibilityContext} from "../../providers/AccessibilityProvider/AccessibilityContext.tsx";
import type {ChartDataItem} from "../../types/ChartDataItem.ts";
import {type Difficulty} from "../../types/DataItem.ts";
import {COLORS_FOR_DIFFICULTIES, getColorForIndex} from "./DetailsChartHelper.ts";

const CHART_HEIGHT = 250;
const PIE_CHART_OUTER_RADIUS = 80;

interface DetailsChartProps {
    chartData: ChartDataItem[];
}

export const DetailsChart = ({chartData}: DetailsChartProps) => {

    const {isHighContrast, isMotionReduced} = use(AccessibilityContext);

    if (chartData.length === 0) {
        return null;
    }

    const colors = isHighContrast ? COLORS_FOR_DIFFICULTIES.contrast : COLORS_FOR_DIFFICULTIES.regular;
    return (
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>

            <PieChart>

                <Pie
                    isAnimationActive={!isMotionReduced}
                    data={chartData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={PIE_CHART_OUTER_RADIUS}
                >

                    {chartData.map((entry, index) => {
                        const color = colors[entry.name as Difficulty] ?? getColorForIndex(index);
                        return (
                            <Cell
                                key={entry.name}
                                fill={color}
                            />
                        );
                    })}
                </Pie>

                <Tooltip/>

                <Legend/>
            </PieChart>
        </ResponsiveContainer>
    );
}