import {type ChangeEvent, useId} from "react";
import VisuallyHidden from "../VisuallyHiddin/VisuallyHidden.tsx";

interface CategorySelectionProps {
    categoriesList: string[];
    activeCategoryName?: string;
    selectCategory: (category?: string) => void;
}

const ALL_CATEGORY_VALUE = 'all';

function CategorySelection({categoriesList, activeCategoryName = ALL_CATEGORY_VALUE, selectCategory} : CategorySelectionProps) {
    const selectionId = "category-select-" + useId();

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        const nextCategory = selectedCategory === ALL_CATEGORY_VALUE ? undefined : selectedCategory;
        selectCategory(nextCategory);
    }

    return (
        <>
            <label htmlFor={selectionId}>
                Selected category:{' '}
            </label>

            <select
                id={selectionId}
                value={activeCategoryName}
                onChange={handleCategoryChange}
            >
                <option value={ALL_CATEGORY_VALUE}>
                    All
                </option>
                {categoriesList?.map(category => (
                    <option value={category} key={category}>
                        {category}
                    </option>
                ))}
            </select>
            <VisuallyHidden ariaLive={'polite'}>
                {activeCategoryName ? `Selected: ${activeCategoryName}` : "All categories selected"}
            </VisuallyHidden>
        </>
    );
}

export default CategorySelection;