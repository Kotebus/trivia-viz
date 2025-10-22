import styles from "./LoadingPage.module.css";
import {VisuallyHidden} from "../VisuallyHiddin/VisuallyHidden.tsx";
import {Spinner} from "../Spinner/Spinner.tsx";

export const LoadingPage = () => {
    return (
        <div
            className={styles.wrapper}
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