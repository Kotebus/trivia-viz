import { SWRConfig } from "swr";
import {Dashboard} from "./components/Dashboard/Dashboard.tsx";
import styles from "./App.module.css"

function App() {
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
            }}
        >
            <div className={styles.wrapper}>
                <Dashboard/>
            </div>
        </SWRConfig>
    );
}

export default App;