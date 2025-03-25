import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddFees.module.css"

const FeeManagement = () => {
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState(null);
    const [branches, setBranches] = useState([]);
    const [courses, setCourses] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [batchFee, setBatchFee] = useState("");

    // Fetch student details
    const fetchStudent = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5000/api/admin/get-student/${studentId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        axios.get('http://localhost:5000/api/admin/fee-types', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setFeeTypes(response.data);
        })
        .catch((error) => {
            console.error("Error fetching FeeType details", error);
        });
    }, []); // Empty dependency array ensures it runs only once when the component mounts
    

    // Fetch filtered students based on branch, course, semester
    const fetchStudents = async () => {
        const branch = document.getElementById("branch").value;
        const course = document.getElementById("course").value;
        const semester = document.getElementById("semester").value;
        try {
            const response = await axios.get(`http://localhost:5000/api/students?branch=${branch}&course=${course}&semester=${semester}`);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Submit individual fee
    const submitFee = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/admin/addfees", {
                student_id: studentId,
                fee_category: document.getElementById("fee_category").value,
                amount: document.getElementById("amount").value,
                due_date: document.getElementById("due_date").value
            });
            alert("Fee Submitted Successfully!");
        } catch (error) {
            console.error("Error submitting fee:", error);
        }
    };

    // Apply batch fee to all students
    const applyAmountToAll = () => {
        setBatchFee(document.getElementById("amount_batch").value);
    };

    // Submit batch fee
    const submitBatchFee = async () => {
        try {
            await axios.post("http://localhost:5000/api/fees/batch", {
                students: filteredStudents.map(student => student.student_id),
                fee_category: document.getElementById("fee_category_batch").value,
                amount: batchFee
            });
            alert("Batch Fee Submitted Successfully!");
        } catch (error) {
            console.error("Error submitting batch fee:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.af}>Fetch Student & Enter Fee</h2>

                <form onSubmit={submitFee}>
                    <div className={styles.inputGroup}>
                        <label>Enter Student ID:</label>
                        <div className="input-box">
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                            <button type="button" className={styles.btn} onClick={fetchStudent}>Fetch</button>
                        </div>
                    </div>

                    {/* Student Details */}
                    {student && (
                        <div className={styles.studentInfo}>
                            <div className={styles.infoBox}><label>Student Name:</label> <span>{student.first_name} {student.last_name}</span></div>
                            <div className={styles.infoBox}><label>Branch:</label> <span>{student.academic?.course_id}</span></div>
                            <div className={styles.infoBox}><label>Course:</label> <span>{student.academic?.course}</span></div>
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label>Fee Type:</label>
                        <select id="fee_category">
                            <option>Select Fee</option>
                            {feeTypes.map((fee) => (
                                <option key={fee.fee_type_id} value={fee.fee_name}>{fee.fee_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Fee Amount:</label>
                        <input type="number" id="amount" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Due Date:</label>
                        <input type="date" id="due_date" />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Submit Fee</button>
                </form>
            </div>

            {/* Batch Fee Section */}
            <div className={`${styles.card} ${styles.cardb}`}>
                <h2 className={styles.af}>Batch Wise Add Fee</h2>

                <div className="filters">
                    <div className={styles.filterGroup}>
                        <label>Select Branch:</label>
                        <select id="branch">
                            <option value="">Select Branch</option>
                            {branches.map((branch) => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Select Course:</label>
                        <select id="course">
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Select Semester:</label>
                        <select id="semester">
                            <option value="">Select Semester</option>
                            {[...Array(8).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                            ))}
                        </select>
                    </div>

                    <button className={styles.btn} onClick={fetchStudents}>Filter Students</button>
                </div>

                <div className="student-list">
                    {filteredStudents.map(student => (
                        <div key={student.student_id} className="student-item">
                            {student.first_name} {student.last_name} - {student.branch}
                        </div>
                    ))}
                </div>

                <div className={styles.inputGroup}>
                    <label>Fee Type:</label>
                    <select id="fee_category_batch">
                        <option>Select Fee</option>
                        {feeTypes.map((fee) => (
                            <option key={fee.fee_type_id} value={fee.fee_type_id}>{fee.fee_name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Enter Amount for All:</label>
                    <input type="number" id="amount_batch" value={batchFee} onChange={applyAmountToAll} />
                </div>

                <button className={styles.submitBtn} onClick={submitBatchFee}>Submit Batch Fee</button>
            </div>
        </div>
    );
};

export default FeeManagement;