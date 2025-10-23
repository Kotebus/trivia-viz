import type {AriaAttributes, PropsWithChildren} from "react";
import style from "./VisuallyHidden.module.css";

// These styles will make sure the component
// is not visible but will still be announced
// by screen readers.
//
// Adding “display: none” would hide the
// element from ALL users, including those
// using screen-readers.

interface VisuallyHiddenProps extends PropsWithChildren {
    ariaLive?: AriaAttributes['aria-live'];
}

/**
 * A component that hides content visually while keeping it accessible to screen readers.
 *
 * This is useful for providing additional context or information that is only relevant
 * for users with assistive technologies.
 *
 * @param props - Component props
 * @param props.children - Content to be visually hidden but accessible to screen readers
 * @param props.ariaLive - Optional ARIA live region setting for dynamic content announcements
 *
 * @example
 * ```tsx
 * <VisuallyHidden>
 *   Additional context for screen readers
 * </VisuallyHidden>
 * ```
 */
export const VisuallyHidden = ({children, ariaLive}: VisuallyHiddenProps) => (
    <span aria-live={ariaLive} className={style.hidden}>
        {children}
    </span>
);