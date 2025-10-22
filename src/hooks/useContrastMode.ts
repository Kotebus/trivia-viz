export const useContrastMode = () => {
    return typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-contrast: more)").matches;
}
