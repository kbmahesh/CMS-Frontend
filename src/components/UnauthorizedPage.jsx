import { Navigate, useLocation } from "react-router-dom";
import styles from "./Unauthorized.module.css"

const Unauthorized = ({ user }) => {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🚫 Unauthorized Access</h2>
            <p className={styles.message}>You do not have permission to view this page.</p>
        </div>
    );
};

export default Unauthorized;