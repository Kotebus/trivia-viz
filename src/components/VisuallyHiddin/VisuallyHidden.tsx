// These styles will make sure the component
// is not visible, but will still be announced
// by screen readers.
//
// Adding “display: none” would hide the
// element from ALL users, including those
// using screen-readers.
import type {AriaAttributes, CSSProperties, PropsWithChildren} from "react";


const hiddenStyles: CSSProperties = {
    display: 'inline-block',
    position: 'absolute',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    height: 1,
    width: 1,
    margin: -1,
    padding: 0,
    border: 0,
};

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
export const VisuallyHidden = ({children, ariaLive}: VisuallyHiddenProps) => {
    return (
        <span aria-live={ariaLive} style={hiddenStyles}>
           {children}
       </span>
    );
};