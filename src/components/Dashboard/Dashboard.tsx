import useSWR from "swr";
import {fetchQuestions} from "../../api/trivia.ts";
import styles from "./Dashboard.module.css";
import {useState} from "react";
import {useGetCategoryData} from "../../hooks/useGetCategoryData.ts";
import CategoryChart from "../CategoryChart/CategoryChart.tsx";
import CategorySelection from "../CategorySelection/CategorySelection.tsx";
import CategoryDifficultyChart from "../CategoryDifficultyChart/CategoryDifficultyChart.tsx";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
import {QUESTIONS_AMOUNT, QUESTIONS_REQUEST_KEY} from "../../api/constants.ts";
import {useHtmlDecodedCategoriesData} from "../../hooks/useHtmlDecodedCategoriesData.ts";

interface ActiveCategory {
    name: string;
    index: number;
}

export function Dashboard() {
    const { data, isLoading, error } = useSWR(
        [QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(QUESTIONS_AMOUNT)
    );
    const questions = useHtmlDecodedCategoriesData(data);

    const categoryChartData = useGetCategoryData(questions);
    const categoriesNames = categoryChartData.map(x => x.name);

    const [activeCategory, setActiveCategory] = useState<ActiveCategory | undefined>(undefined);

    const handleSelectCategory = (categoryName?: string) => {
        const nextActiveCategory = categoryName ?
            {
                name: categoryName,
                index: categoryChartData.findIndex(x => x.name === categoryName)
            } :
            undefined;

        setActiveCategory(nextActiveCategory);
    }

    const setActiveCategoryByIndex = (index: number) =>
        setActiveCategory({index, name:  categoryChartData[index].name});

    if (isLoading) return (<LoadingPage/>);
    if (error && data === undefined) return (<div>Error: {error.message}</div>);

    return (
        <div className={styles.grid}>
            <div className={styles.header}>
                <CategorySelection
                    categoriesList={categoriesNames}
                    activeCategoryName={activeCategory?.name}
                    selectCategory={handleSelectCategory}
                />
            </div>
            {error && (<div className={styles.error}>Error: {error.message}</div>)}
            <main>
                <CategoryChart
                    chartData={categoryChartData}
                    activeIndex={activeCategory?.index}
                    setActiveIndex={setActiveCategoryByIndex}
                />
            </main>

            <aside>
                <CategoryDifficultyChart
                    data={questions}
                />

                {activeCategory && (
                    <CategoryDifficultyChart
                        category={activeCategory?.name}
                        data={questions}
                    />
                )}
            </aside>
        </div>
    );
}