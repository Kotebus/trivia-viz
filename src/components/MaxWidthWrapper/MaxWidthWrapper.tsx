import type {PropsWithChildren} from "react";
import styles from "./MaxWidthWrapper.module.css";

function MaxWidthWrapper({children} : PropsWithChildren) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}

export default MaxWidthWrapper;