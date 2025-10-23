import {useCallback, useState} from "react";
import useSWR from "swr";
import {API_CONFIG} from "../../api/ApiConfig.ts";
import {fetchQuestions} from "../../api/trivia.ts";
import {useGetDataWithCounts} from "../../hooks/useGetDataWithCounts.ts";
import {useHtmlDecodedCategoriesData} from "../../hooks/useHtmlDecodedCategoriesData.ts";
import type {Question} from "../../types/trivia.ts";
import {CategoryChart} from "../CategoryChart/CategoryChart.tsx";
import {CategoryDifficultyChart} from "../CategoryDifficultyChart/CategoryDifficultyChart.tsx";
import {CategorySelection} from "../CategorySelection/CategorySelection.tsx";
import {FetchErrorMessage} from "../FetchErrorMessage/FetchErrorMessage.tsx";
import {LoadingPage} from "../LoadingPage/LoadingPage.tsx";
import styles from "./Dashboard.module.css";

interface ActiveCategory {
    name: string;
    index: number;
}

interface DashboardProps {
    fetchDataAmount: number;
    allDataLabel: string;
    sourceData?: Question[];
}

const categorySelector = (item: Question) => item.category;

export const Dashboard = ({fetchDataAmount, allDataLabel, sourceData}: DashboardProps) => {
    const {data, isLoading, error} = useSWR(
        [API_CONFIG.QUESTIONS_REQUEST_KEY],
        () => fetchQuestions(sourceData ? 0 : fetchDataAmount)
    );
    const questions = useHtmlDecodedCategoriesData(data ?? []);
    const categoryChartData = useGetDataWithCounts(questions, categorySelector);
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

    const setActiveCategoryByIndex = useCallback(
        (index: number) => setActiveCategory({index, name: categoryChartData[index].name}),
        [categoryChartData]
    );

    if (isLoading) {
        return (<LoadingPage/>);
    }

    const errorMessage = error ? <FetchErrorMessage message={error.message}/> : null;

    if (error && data === undefined) {
        return errorMessage;
    }

    if (data?.length === 0) {
        return (<div>No data.</div>);
    }

    return (
        <div className={styles.dashboard}>
            {errorMessage}
            {data !== undefined && (
                <>
                    <div className={styles.header}>
                        <CategorySelection
                            categoriesList={categoriesNames}
                            activeCategoryName={activeCategory?.name}
                            selectCategory={handleSelectCategory}
                        />
                    </div>
                    <main className={styles.main}>
                        <CategoryChart
                            chartData={categoryChartData}
                            activeIndex={activeCategory?.index}
                            setActiveIndex={setActiveCategoryByIndex}
                        />
                    </main>

                    <aside className={styles.sidebar}>
                        <CategoryDifficultyChart
                            allCategoriesLabel={allDataLabel}
                            data={questions}
                        />

                        {activeCategory && (
                            <CategoryDifficultyChart
                                allCategoriesLabel={allDataLabel}
                                category={activeCategory.name}
                                data={questions}
                            />
                        )}
                    </aside>
                </>
            )}
        </div>
    );
}