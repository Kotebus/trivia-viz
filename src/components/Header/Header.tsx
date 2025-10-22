import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Trivia Analytics Dashboard</h1>
            <p className={styles.subtitle}>Categories and difficulty statistics</p>
        </header>
    );
}