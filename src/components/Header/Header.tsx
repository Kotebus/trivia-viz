import styles from './Header.module.css';
import type {HeaderConfig} from "../../AppConfig.ts";

export function Header({config}: { config: HeaderConfig }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{config.title}</h1>
            { config.subtitle && (<p className={styles.subtitle}>{config.subtitle}</p>)}
        </header>
    );
}