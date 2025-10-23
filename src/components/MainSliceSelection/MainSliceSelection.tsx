import {type ChangeEvent, useId} from "react";
import styles from "./MainSliceSelection.module.css";

interface MainSliceSelectionProps {
    slicesList: string[];
    activeSliceName?: string;
    selectSlice: (slice?: string) => void;
}

const ALL_SLICES_VALUE = 'all';

export const MainSliceSelection = (
    {slicesList, activeSliceName = ALL_SLICES_VALUE, selectSlice}: MainSliceSelectionProps
) => {

    const selectionId = "main-slice-select-" + useId();

    const handleSliceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedSlice = event.target.value;
        const nextSlice = selectedSlice === ALL_SLICES_VALUE ? undefined : selectedSlice;
        selectSlice(nextSlice);
    }

    return (
        <>
            <label
                className={styles.label}
                htmlFor={selectionId}>
                Selected:
            </label>

            <select
                id={selectionId}
                value={activeSliceName}
                onChange={handleSliceChange}
            >

                <option value={ALL_SLICES_VALUE}>
                    All
                </option>

                {slicesList?.map(slice => (
                    <option value={slice} key={slice}>
                        {slice}
                    </option>
                ))}
            </select>
        </>
    );
}