import {type PropsWithChildren} from "react";
import {AccessibilityContext} from "./AccessibilityContext.tsx";

export interface IAccessibilityProvider {
    isHighContrast: boolean;
    isMotionReduced: boolean;
}

const checkMediaQuery = (query: string) =>
     (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia(query).matches);

export const AccessibilityProvider = ({ children }:PropsWithChildren) => {
    const isHighContrast = checkMediaQuery("(prefers-contrast: more)");
    const isMotionReduced = checkMediaQuery("(prefers-reduced-motion: reduce)");

    return (
        <AccessibilityContext value={{ isHighContrast, isMotionReduced}}>
            {children}
        </AccessibilityContext>
    );
}