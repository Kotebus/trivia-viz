import {createContext} from "react";
import type {IAccessibilityProvider} from "./AccessibilityProvider.tsx";

export const AccessibilityContext =
    createContext<IAccessibilityProvider>({ isMotionReduced: false, isHighContrast: false});