import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TransactionHistory.module.css";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) return; // Exit if no token found

                const response = await axios.get("http://localhost:5000/api/student/transactions",{
                    headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                });
                console.log(response.data);
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
      <h1 className={styles.TL}>Transaction History</h1>
      <div className={styles.transactionContainer}>
        {/* Transaction Table */}
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Fee Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr key={index}>
                <td>TXN-{transaction._id}</td>
                <td>{new Date(transaction.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
                <td>{transaction.feeType?.fee_name ?? "N/A"}</td>
                <td>{transaction.description}</td>
                <td>₹{transaction.amount}</td>
                <td className={transaction.status === "Pending" ? styles.statusPending : styles.statusPaid}>
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.actionButtons}>
        <a href="/student-dashboard" className={`${styles.btn} ${styles.btnSecondary}`}>Back to Dashboard</a>
        <a href="/make-payment" className={`${styles.btn} ${styles.btnPrimary}`}>Make a Payment</a>
      </div>
    </div>
  );
};

export default TransactionHistory;
