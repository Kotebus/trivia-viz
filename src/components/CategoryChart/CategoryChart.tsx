import {
    Tooltip,
    BarChart, YAxis, XAxis, Bar, Cell
} from 'recharts';
import type {ChartDataItem} from "../../types/components.ts";
import VisuallyHidden from "../VisuallyHiddin/VisuallyHidden.tsx";
import {use} from "react";
import {AccessibilityContext} from "../../AccessibilityProvider/AccessibilityContext.tsx";

interface Props {
    chartData: ChartDataItem[];
    activeIndex?: number;
    setActiveIndex: (index: number) => void;
}

const BAR_COLOR = 'hsl(236, 43%, 47%)';
const ACTIVE_BAR_COLOR = 'hsl(333, 79%, 49%)';
const MAX_NAME_LENGTH = 40;

export default function CategoryChart({chartData, activeIndex, setActiveIndex}: Props) {
    const accessibilityContext = use(AccessibilityContext);
    const isMotionReduced = accessibilityContext?.isMotionReduced ?? false;
    if (chartData.length === 0)
        return (<div>No data to display.</div>);

    const formatNameInXAxis = (name: string) =>
        name.length > MAX_NAME_LENGTH ? name.slice(0, MAX_NAME_LENGTH) + "..." : name;

    return (
        <figure>
            <BarChart
                style={{ width: '100%',
                    maxHeight: '70vh',
                    aspectRatio: 1, paddingRight: '1rem' }}
                responsive
                margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}
                data={chartData}>
                <XAxis
                    dataKey="name"
                    angle={-90}
                    textAnchor="end"
                    tickFormatter={formatNameInXAxis}
                    height={300} />
                <YAxis />
                <Tooltip />
                <Bar
                    isAnimationActive={!isMotionReduced}
                    dataKey="value"

                    onClick={(_, index) => setActiveIndex(index)}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? ACTIVE_BAR_COLOR : BAR_COLOR}
                            key={`cell-${entry.name}`}
                        />
                    ))}
                </Bar>
            </BarChart>
            <figcaption>
                <VisuallyHidden>Distribution by category</VisuallyHidden>
            </figcaption>
        </figure>
    );
}