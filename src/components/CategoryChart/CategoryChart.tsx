import {type CSSProperties, use, useCallback} from "react";
import {Bar, BarChart, Cell, Tooltip, XAxis, YAxis} from 'recharts';
import type {BarRectangleItem} from "recharts/types/cartesian/Bar";
import type {Margin} from "recharts/types/util/types";
import {AccessibilityContext} from "../../providers/AccessibilityProvider/AccessibilityContext.tsx";
import type {ChartDataItem} from "../../types/ChartDataItem.ts";
import {VisuallyHidden} from "../VisuallyHiddin/VisuallyHidden.tsx";

const BAR_COLOR = 'hsl(236, 43%, 47%)';
const ACTIVE_BAR_COLOR = 'hsl(333, 79%, 49%)';
const MAX_NAME_LENGTH = 40;

const BAR_CHART_STYLE: CSSProperties = {
    width: '100%',
    maxHeight: '70vh',
    aspectRatio: 1,
};

const BAR_CHART_MARGIN_DATA: Partial<Margin> = {
    top: 5,
    right: 5,
    left: 0,
    bottom: 5,
};

interface Props {
    chartData: ChartDataItem[];
    activeIndex?: number;
    setActiveIndex: (index: number) => void;
}

const formatNameInXAxis = (name: string) => name.length > MAX_NAME_LENGTH ? name.slice(0, MAX_NAME_LENGTH) + "..." : name;

export const CategoryChart = ({chartData, activeIndex, setActiveIndex}: Props) => {
    const accessibilityContext = use(AccessibilityContext);

    const handleOnBarClick = useCallback(
        ((_: BarRectangleItem, index: number) => setActiveIndex(index)),
        [setActiveIndex]
    );

    if (chartData.length === 0) {
        return (<div>No data to display.</div>);
    }

    const isMotionReduced = accessibilityContext?.isMotionReduced ?? false;


    return (
        <figure>
            <BarChart
                responsive={true}
                style={BAR_CHART_STYLE}
                margin={BAR_CHART_MARGIN_DATA}
                data={chartData}>
                <XAxis
                    dataKey="name"
                    angle={-90}
                    textAnchor="end"
                    tickFormatter={formatNameInXAxis}
                    height={300}
                />
                <YAxis/>
                <Tooltip/>
                <Bar
                    isAnimationActive={!isMotionReduced}
                    dataKey="value"
                    onClick={handleOnBarClick}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.name}`}
                            cursor="pointer"
                            fill={index === activeIndex ? ACTIVE_BAR_COLOR : BAR_COLOR}
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