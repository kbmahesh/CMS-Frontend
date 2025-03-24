import React, { useState, useEffect } from "react";
import styles from "./FeesTable.module.css";
import { useNavigate } from "react-router-dom";

const FeesTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/student/students?page=${page}&limit=10`);
                if (!response.ok) throw new Error("Failed to fetch students");
                
                const data = await response.json();
                console.log(data);
                setStudents(data.students);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [page]); // Fetch data when `page` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Student Fees Details</h2>

            {/* Fees Table */}
            <table className={styles.feeDetailsTable}>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Total Fees</th>
                        <th>Paid Amount</th>
                        <th>Remaining Amount</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{student.academic?.course || "N/A"}</td>
                                <td>₹{student.feeSummary?.totalFees?.toFixed(2) || "0.00"}</td>
                                <td className={styles.textSuccess}>₹{student.feeSummary?.totalPaid?.toFixed(2) || "0.00"}</td>
                                <td className={styles.textDanger}>₹{student.feeSummary?.totalDue?.toFixed(2) || "0.00"}</td>
                                <td>
                                <span className={`${styles.status} ${styles[`status-${student.feeSummary?.paymentStatus?.toLowerCase().replace(/\s/g, "-") || "pending"}`]}`}>
                                    {student.feeSummary?.paymentStatus || "Pending"}
                                </span>
                                </td>
                                <td>
                                <button
                                    className={styles.viewButton}
                                    onClick={() =>
                                    navigate(`/admin/viewfees/${student.student_id}`)
                                    }
                                >
                                    View
                                </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="8">No students found.</td></tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span> Page {page} of {totalPages} </span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default FeesTable;