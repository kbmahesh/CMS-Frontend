import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./FeesOverview.module.css";

const FeesOverview = () => {
    const { id } = useParams();  // Extract Student ID from URL
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [fees, setFee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentFees = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) return;
                const response = await axios.get(`http://localhost:5000/api/admin/get-fees/${id}`,{
                      headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                  });
                setStudent(response.data.student);
                setFee(response.data.fees);
            } catch (error) {
                console.error("Error fetching student fee details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentFees();
    }, [id]);
    
    if (loading) return <p>Loading student details...</p>;
    if (!student) return <p>No student found with ID {id}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Fee Details - {student.first_name} {student.last_name}</h2>

            <div className={styles.studentInfo}>
                <p><strong>Student ID:</strong> {student.student_id}</p>
                <p><strong>Branch:</strong> {student.academic?.course_id || "N/A"}</p>
                <p><strong>Course:</strong> {student.academic?.course || "N/A"}</p>
                <p><strong>Semester:</strong> {student.academic?.semester || "N/A"}</p>
            </div>

            <h3 className={styles.sectionTitle}>Fee Breakdown</h3>
            <table className={styles.feeDetailsTable}>
                <thead>
                    <tr>
                        <th>Fee Type</th>
                        <th>Total Fees</th>
                        <th>Paid Amount</th>
                        <th>Remaining Amount</th>
                        <th>Payment Status</th>
                        <th>Payment Mode</th>
                        <th>Due Date</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {fees?.map((fee, index) => (
                        <tr key={index}>
                            <td>{fee.fee_type || "N/A"}</td>
                            <td>₹{fee.total_fees?.toFixed(2) || "0.00"}</td>
                            <td>₹{fee.paid_amount?.toFixed(2) || "0.00"}</td>
                            <td>₹{fee.due_amount?.toFixed(2) || "0.00"}</td>
                            <td>
                                <span className={`${styles.status} ${styles[`status-${fee?.payment_status?.toLowerCase().replace(/\s/g, "-") || "pending"}`]}`}>
                                    {fee.payment_status || "Pending"}
                                </span>
                            </td>
                            <td>{fee.payment_mode || "N/A"}</td>
                            <td>{fee.next_due_date ? new Date(fee.next_due_date).toLocaleDateString() : "N/A"}</td>
                            <td>{fee.remarks || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className={styles.backButton} onClick={() => navigate("/admin/viewfees")}>
                Back
            </button>
        </div>
    );
};

export default FeesOverview;