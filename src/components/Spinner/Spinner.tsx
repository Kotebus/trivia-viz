import {Loader} from 'react-feather';
import styles from './Spinner.module.css';

const SPINNER_SIZE = 24;

export const Spinner = () => {
    return (
        <span
            className={styles.wrapper}
            role="status"
            aria-label="Loading"
            style={{
                width: SPINNER_SIZE,
                height: SPINNER_SIZE,
            }}
        >
      <Loader color='black' size={SPINNER_SIZE} aria-hidden="true"/>
    </span>
    );
}
