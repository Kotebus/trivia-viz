import {use, useCallback} from "react";
import {Bar, BarChart, Cell, Tooltip, XAxis, YAxis} from 'recharts';
import type {BarRectangleItem} from "recharts/types/cartesian/Bar";
import {AccessibilityContext} from "../../providers/AccessibilityProvider/AccessibilityContext.tsx";
import type {ChartDataItem} from "../../types/ChartDataItem.ts";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden.tsx";
import styles from "./MainChart.module.css"

const BAR_COLOR = 'hsl(236, 43%, 47%)';
const ACTIVE_BAR_COLOR = 'hsl(333, 79%, 49%)';
const MAX_NAME_LENGTH = 40;

interface Props {
    chartData: ChartDataItem[];
    activeIndex?: number;
    setActiveIndex: (index: number) => void;
}

const formatNameInXAxis = (name: string) => name.length > MAX_NAME_LENGTH ? name.slice(0, MAX_NAME_LENGTH) + "..." : name;

export const MainChart = ({chartData, activeIndex, setActiveIndex}: Props) => {
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
        <figure className={styles.figure}>

            <BarChart
                className={styles.chart}
                responsive={true}
                data={chartData}>

                <XAxis
                    dataKey="name"
                    textAnchor="end"
                    angle={-90}
                    height={300}
                    tickFormatter={formatNameInXAxis}
                />

                <YAxis/>

                <Tooltip/>

                <Bar
                    dataKey="amount"
                    isAnimationActive={!isMotionReduced}
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
                <VisuallyHidden>Distribution by main slice</VisuallyHidden>
            </figcaption>
        </figure>
    );
}