import styles from "./LoadingPage.module.css";
import Spinner from "../Spinner";

function LoadingPage() {
    return (<div className={styles.wrapper}><Spinner/></div>);
}

export default LoadingPage;