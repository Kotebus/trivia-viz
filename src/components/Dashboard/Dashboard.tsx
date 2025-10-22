import useSWR from "swr";
import {fetchQuestions} from "../../api/trivia.ts";
import styles from "./Dashboard.module.css";
import {useState} from "react";
import {useGetCategoryData} from "../../hooks/useGetCategoryData.ts";
import CategoryChart from "../CategoryChart/CategoryChart.tsx";
import CategorySelection from "../CategorySelection/CategorySelection.tsx";
import CategoryDifficultyChart from "../CategoryDifficultyChart/CategoryDifficultyChart.tsx";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
import {QUESTIONS_AMOUNT, QUESTIONS_REQUEST_KEY, REFRESH_INTERVAL} from "../../api/constants.ts";
import {useContrastMode} from "../../hooks/useContrastMode.ts";
import {useDataHtmlCleaner} from "../../hooks/useDataHtmlCleaner.ts";

interface ActiveCategory {
    name: string;
    index: number;
}

export function Dashboard() {
    const { data, isLoading, error } = useSWR(
        [QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(QUESTIONS_AMOUNT),
        { refreshInterval: REFRESH_INTERVAL }
    );
    const userPrefersHighContrast = useContrastMode();

    const questions = useDataHtmlCleaner(data);

    const categoryChartData = useGetCategoryData(questions);
    const categories = categoryChartData.map(x => x.name);

    const [activeCategory, setActiveCategory] = useState<ActiveCategory | undefined>(undefined);

    const handleSelectCategory = (categoryName?: string) => {
        if (!categoryName) {
            setActiveCategory(undefined);
            return;
        }

        setActiveCategory({name: categoryName, index: categoryChartData.findIndex(x => x.name === categoryName)});
    }

    const setActiveCategoryIndex = (index: number) =>
        setActiveCategory({index, name:  categoryChartData[index].name});

    if (isLoading) return (<LoadingPage/>);
    if (error && data === undefined) return (<div>Error: {error.message}</div>);

    return (
        <div className={styles.grid}>
            <div className={styles.header}>
                <CategorySelection
                    categoriesList={categories}
                    activeCategoryName={activeCategory?.name}
                    selectCategory={handleSelectCategory}
                />
            </div>
            {error && (<div className={styles.error}>Error: {error.message}</div>)}
            <main>
                <CategoryChart
                    chartData={categoryChartData}
                    activeIndex={activeCategory?.index}
                    setActiveIndex={setActiveCategoryIndex}
                />
            </main>

            <aside>
                <CategoryDifficultyChart
                    useContrastMode={userPrefersHighContrast}
                    data={questions}
                />

                {activeCategory && (
                    <CategoryDifficultyChart
                        useContrastMode={userPrefersHighContrast}
                        category={activeCategory?.name}
                        data={questions}
                    />
                )}
            </aside>
        </div>
    );
}