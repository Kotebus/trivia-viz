import { SWRConfig } from "swr";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import styles from "./App.module.css"
import AccessibilityProvider from "./AccessibilityProvider/AccessibilityProvider.tsx";

function App() {
    return (
        <SWRConfig value={{ revalidateOnFocus: false }}>
            <AccessibilityProvider>
                <div className={styles.wrapper}>
                    <Dashboard/>
                </div>
            </AccessibilityProvider>
        </SWRConfig>
    );
}

export default App;