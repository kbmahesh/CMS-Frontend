import styles from './ManagementDashboard.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const ManagementDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h2>College Management Dashboard</h2>
                <p>Manage student data, fees, and academic details.</p>
            </div>

            {/* Stats Overview Section */}
            <div className={styles.overviewStats}>
                <div className={styles.statCard}>
                    <h4>Total Students</h4>
                    <p>1500</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Total Revenue</h4>
                    <p>₹5,00,000</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Pending Fees</h4>
                    <p>₹50,000</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Verified Payments</h4>
                    <p>₹4,50,000</p>
                </div>
            </div>

            {/* Recent Transactions Section */}
            <div className={styles.recentTransactions}>
                <h3>Recent Transactions</h3>
                <div className={styles.transactionsList}>
                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <p><strong>₹10,000</strong></p>
                            <p>1st February 2025</p>
                        </div>
                        <div className={styles.transactionStatus}>
                            <span className={styles.statusPending}>Pending</span>
                        </div>
                    </div>
                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <p><strong>₹5,000</strong></p>
                            <p>28th January 2025</p>
                        </div>
                        <div className={styles.transactionStatus}>
                            <span className={styles.statusCompleted}>Completed</span>
                        </div>
                    </div>
                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <p><strong>₹7,500</strong></p>
                            <p>20th January 2025</p>
                        </div>
                        <div className={styles.transactionStatus}>
                            <span className={styles.statusPending}>Pending</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementDashboard;
