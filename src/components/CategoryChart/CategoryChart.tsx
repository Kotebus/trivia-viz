import {
    Tooltip,
    BarChart, YAxis, XAxis, Bar, Cell
} from 'recharts';
import type {ChartDataItem} from "../../types/components.ts";

interface Props {
    chartData: ChartDataItem[];
    activeIndex?: number;
    setActiveIndex: (index: number) => void;
    selectCategory: (category: string) => void;
}

export default function CategoryChart({chartData, selectCategory, activeIndex, setActiveIndex}: Props) {
    const handleBarSelect = (index: number) => {
        setActiveIndex(index);
        selectCategory(chartData[index].name);
    }

    return (
        <>
            <BarChart
                style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1, paddingRight: '1rem' }}
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
                    fill="#3b82f6"
                    onClick={(_, index) => handleBarSelect(index)}
                >
                    {chartData.map((_entry, index) => (
                        <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                    ))}
                </Bar>
            </BarChart>
        </>
    );
}