import {Spinner} from "../Spinner/Spinner.tsx";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden.tsx";
import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div
            className={styles.loader}
            role="status"
            aria-live="polite"
            aria-label="Loading"
        >

            <Spinner/>

            <VisuallyHidden ariaLive="polite">
                Loading data, please wait...
            </VisuallyHidden>
        </div>
    );
}