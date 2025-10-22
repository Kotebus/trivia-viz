import type {HeaderConfig} from "../../AppConfig.ts";
import styles from './Header.module.css';

export function Header({config}: { config: HeaderConfig }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{config.title}</h1>
            {config.subtitle && (<p className={styles.subtitle}>{config.subtitle}</p>)}
        </header>
    );
}