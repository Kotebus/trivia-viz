import {
    Tooltip,
    BarChart, YAxis, XAxis, Bar, Cell
} from 'recharts';
import type {ChartDataItem} from "../../types/components.ts";
import VisuallyHidden from "../VisuallyHiddin/VisuallyHidden.tsx";

interface Props {
    chartData: ChartDataItem[];
    activeIndex?: number;
    setActiveIndex: (index: number) => void;
    selectCategory: (category: string) => void;
}

const BAR_COLOR = '#444BAA';
const ACTIVE_BAR_COLOR = '#E21A75';

export default function CategoryChart({chartData, selectCategory, activeIndex, setActiveIndex}: Props) {
    const handleBarSelect = (index: number) => {
        setActiveIndex(index);
        selectCategory(chartData[index].name);
    }

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
                <XAxis dataKey="name" angle={-90} textAnchor="end" height={300} />
                <YAxis />
                <Tooltip />
                <Bar
                    dataKey="value"

                    onClick={(_, index) => handleBarSelect(index)}
                >
                    {chartData.map((_entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? ACTIVE_BAR_COLOR : BAR_COLOR}
                            key={`cell-${index}`}
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