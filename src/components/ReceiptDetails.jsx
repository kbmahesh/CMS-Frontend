import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ReceiptDetails.module.css"; // CSS Module for styling

const ReceiptDetails = () => {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/transactions/${transactionId}`);

                setTransaction(data[0]);
            } catch (error) {
                console.error("Error fetching transaction:", error);
            }
        };

        fetchTransaction();
    }, [transactionId]);

    const handleApprove = async (id) => {
        if (window.confirm("Are you sure you want to approve this payment?")) {
            try {
                const response = await axios.put(`http://localhost:5000/api/admin/transactions/approve/${id}`);
                setMessage(response.data.message);
            } catch (error) {
                console.error("Error approving payment:", error);
            }
        }
    };

    if (!transaction) return <p>Loading receipt details...</p>;

    return (
        <div className={styles.receiptContainer}>
            <h2>Receipt Details</h2>

            <table className={styles.receiptTable}>
                <tbody>
                    <tr>
                        <td><strong>Transaction ID:</strong></td>
                        <td>TXN-{transaction._id}</td>
                    </tr>
                    <tr>
                        <td><strong>Student ID:</strong></td>
                        <td>{transaction.student_id}</td>
                    </tr>
                    <tr>
                        <td><strong>Amount:</strong></td>
                        <td>₹{transaction.amount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Mode:</strong></td>
                        <td>{transaction.payment_mode}</td>
                    </tr>
                    <tr>
                        <td><strong>Date:</strong></td>
                        <td>{new Date(transaction.date).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric"
                        })}</td>
                    </tr>
                    <tr>
                        <td><strong>Status:</strong></td>
                        <td className={transaction.status === "Pending" ? styles.statusPending : styles.statusPaid}>
                            {transaction.status}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={styles.proofContainer}>
                <h4>Payment Proof</h4>
                {transaction.payment_proof ? (
                    <img src={`${transaction.payment_proof}`} className={styles.proofImage} alt="Payment Proof" />
                ) : (
                    <p className={styles.statusPending}>No Proof Uploaded</p>
                )}
            </div>

            {transaction.status === "Pending" ? (
                <div className={styles.proofContainer}>
                    <button 
                        className={styles.approveBtn} 
                        onClick={() => handleApprove(transaction._id)}
                    >
                        ✅ Approve Payment
                    </button>
                </div>
            ) : (
                <p className={styles.verifiedText}>Already Verified</p>
            )}
        </div>
    );
};

export default ReceiptDetails;