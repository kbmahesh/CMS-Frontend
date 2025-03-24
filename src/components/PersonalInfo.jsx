import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from "axios";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) return; // Exit if no token found

                const response = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                });

                setStudent(response.data); // Store user details
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserInfo();
    }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.PI}>Personal Information</h1>

      {/* Personal Info Display */}
      <div className={styles.infoContainer}>
        <div className={`${styles.infoCard} ${styles.summaryCard}`}>
          <h3>Your Personal Info</h3>
          <div className={styles.personalInfo}>
            <p><strong>Name:</strong> {student?.first_name} {student?.last_name}</p>
            <p><strong>Email:</strong> {student?.email}</p>
            <p><strong>Student ID:</strong> {student?.student_id}</p>
            <p><strong>Phone:</strong> {student?.phone}</p>
            <p><strong>Date of Birth:</strong> {student?.dob}</p>
            <p><strong>Address:</strong> {student?.address}</p>
          </div>
        </div>

        {/* Guardian Info Display */}
        <div className={`${styles.infoCard} ${styles.guardianCard}`}>
          <h3>Guardian's Information</h3>
          <div className={styles.guardianInfo}>
            <p><strong>Guardian Name:</strong> {student?.guardian?.guardian_name}</p>
            <p><strong>Guardian Relationship:</strong> {student?.guardian?.guardian_relation}</p>
            <p><strong>Guardian Phone:</strong> {student?.guardian?.guardian_phone}</p>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <a href="/student-dashboard" className={`${styles.btn} ${styles.btnSecondary}`}>Back to Dashboard</a>
      </div>
    </div>
  );
};

export default PersonalInfo;