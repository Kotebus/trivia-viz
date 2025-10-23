import {decode} from "he";
import {useMemo} from "react";

import type {DataItem} from "../types/DataItem.ts";

/**
 * Custom hook that decodes HTML entities in `mainSlice` fields of data.
 *
 * @param data - Array of data with potentially HTML-encoded `mainSlice`
 * @returns Array of data with decoded `mainSlice` names.
 */
export const useHtmlDecodedMainSliceData =
    (data: DataItem[]): DataItem[] => {

        return useMemo(() => {
            if (data.length === 0) {
                return [];
            }

            return data.map(item => ({
                ...item,
                mainSlice: decode(item.mainSlice),
            }));
        }, [data]);
    }