import {Loader} from 'react-feather';
import styles from './Spinner.module.css';

const SPINNER_SIZE = 24;

export const Spinner = () => {
    return (
        <span
            className={styles.loader}
            role="status"
            aria-label="Loading"
        >

            <Loader color='black' size={SPINNER_SIZE} aria-hidden="true"/>
        </span>
    );
}
