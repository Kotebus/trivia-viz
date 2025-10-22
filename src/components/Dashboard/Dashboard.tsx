import useSWR from "swr";
import {fetchQuestions} from "../../api/trivia.ts";
import styles from "./Dashboard.module.css";
import {type Question} from "../../types/trivia.ts";
import {useState} from "react";
import {useGetCategoryData} from "../../hooks/useGetCategoryData.ts";
import CategoryChart from "../CategoryChart/CategoryChart.tsx";
import CategorySelection from "../CategorySelection/CategorySelection.tsx";
import CategoryDifficultyChart from "../CategoryDifficultyChart/CategoryDifficultyChart.tsx";
import {QUESTIONS_AMOUNT, QUESTIONS_REQUEST_KEY, REFRESH_INTERVAL} from "../../configuration/constants.ts";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";

export function Dashboard() {
    const { data, isLoading, error } = useSWR(
        [QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(QUESTIONS_AMOUNT),
        { refreshInterval: REFRESH_INTERVAL }
    );

    const questions = data?.map(item => ({
        ...item,
        category: item.category.replace("&amp;", "&"),
    } as Question)) ?? [];

    const categoryChartData = useGetCategoryData(questions);
    const categories = categoryChartData.map(x => x.name);

    const [activeCategoryName, setActiveCategoryName] = useState<string | undefined>(undefined);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | undefined>(undefined);

    const handleSelectCategory = (categoryName?: string) => {
        setActiveCategoryName(categoryName);
        setActiveCategoryIndex(categoryChartData.findIndex(x => x.name === categoryName));
    }

    if (isLoading) return (<LoadingPage/>);

    return (
        <div className={styles.grid}>
            <div className={styles.header}>
                <CategorySelection
                    categoriesList={categories}
                    activeCategoryName={activeCategoryName}
                    selectCategory={handleSelectCategory}
                />
            </div>
            { error && (
                <div className={styles.header}>
                    <div className={styles.error}>Error: {error.message}</div>
                </div>
            )}


            <main>
                <CategoryChart
                    chartData={categoryChartData}
                    activeIndex={activeCategoryIndex}
                    setActiveIndex={setActiveCategoryIndex}
                    selectCategory={setActiveCategoryName}
                />
            </main>

            <aside>
                <CategoryDifficultyChart
                    data={questions}
                />

                {activeCategoryName && (
                    <CategoryDifficultyChart
                        category={activeCategoryName}
                        data={questions}
                    />
                )}
            </aside>
        </div>
    );
}