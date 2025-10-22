// These styles will make sure the component
// is not visible, but will still be announced
// by screen readers.
//
// Adding “display: none” would hide the
// element from ALL users, including those
// using screen-readers.
import type {AriaAttributes, CSSProperties, PropsWithChildren} from "react";


const hiddenStyles : CSSProperties = {
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

interface VisuallyHiddenProps extends PropsWithChildren{
    ariaLive?: AriaAttributes['aria-live'];
}

const VisuallyHidden = ({ children, ariaLive }: VisuallyHiddenProps) => {
    return (
        <span aria-live={ariaLive} style={hiddenStyles}>
           {children}
       </span>
    );
};


export default VisuallyHidden;