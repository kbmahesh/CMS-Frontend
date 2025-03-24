import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from "./ViewStudent.module.css"; // Using CSS Module

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/get-student/${id}`)
            .then((response) => {
                setStudent(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching student details");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Student Details</h2>

            <div className={styles.studentDetails}>
                <h4 className={styles.h}>Personal Information</h4>
                <p><strong>Student ID:</strong> {student.student_id}</p>
                <p><strong>Full Name:</strong> {student.first_name} {student.last_name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Address:</strong> {student.address}</p>

                <h4 className={styles.h}>Academic Details</h4>
                <p><strong>Course:</strong> {student.academic?.course || "N/A"}</p>
                <p><strong>Branch:</strong> {student.academic?.course_id || "N/A"}</p>
                <p><strong>Semester:</strong> {student.academic?.semester || "N/A"}</p>

                <h4 className={styles.h}>Guardian Details</h4>
                <p><strong>Name:</strong> {student.guardian?.guardian_name || "N/A"}</p>
                <p><strong>Relationship:</strong> {student.guardian?.guardian_relation || "N/A"}</p>
                <p><strong>Contact:</strong> {student.guardian?.guardian_phone || "N/A"}</p>
            </div>

            <div className={styles.actionButtons}>
                <Link to="/admin/viewstudents" className={styles.backBtn}>Back</Link>
            </div>
        </div>
    );
};

export default ViewStudent;