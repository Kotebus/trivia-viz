import styles from "./LoadingPage.module.css";
import Spinner from "../Spinner";
import VisuallyHidden from "../VisuallyHiddin/VisuallyHidden.tsx";

function LoadingPage() {
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

export default LoadingPage;