import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./VerifyReceipts.module.css"; // Import CSS module

const VerifyReceipts = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/transactions/pending");
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading pending receipts...</p>;

    return (
        <div>
            <h2 className={styles.title}>Pending Receipts</h2>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Student ID</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Payment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.transaction_id}>
                                <td>TXN-{transaction._id}</td>
                                <td>{transaction.student_id}</td>
                                <td>₹{transaction.amount.toFixed(2)}</td>
                                <td>{transaction.payment_mode}</td>
                                <td>{new Date(transaction.date).toLocaleDateString("en-GB", {
                                    day: "2-digit", month: "short", year: "numeric"
                                })}</td>
                                <td>
                                    <Link to={`/admin/verifyreceipts/ReceiptDetails/${transaction._id}`} className={styles.viewButton}>
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No pending transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VerifyReceipts;
