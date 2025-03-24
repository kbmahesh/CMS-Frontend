import { Link } from "react-router-dom";
import styles from "./AcademicInfo.module.css";

const AcademicInfo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.AH}>Academic Information</h1>

      <div className={styles.infoContainer}>
        {/* Course Info Card */}
        <div className={`${styles.infoCard} ${styles.academicCard}`}>
          <h3>Course Information</h3>
          <div className={styles.academicInfo}>
            <p><strong>Course Name:</strong> Computer Science</p>
            <p><strong>Course Code:</strong> CS101</p>
            <p><strong>Year of Study:</strong> 2nd Year</p>
            <p><strong>Enrollment Status:</strong> Active</p>
          </div>
        </div>

        {/* Marks Info Card */}
        <div className={`${styles.infoCard} ${styles.academicCard}`}>
          <h3>Marks Summary</h3>
          <div className={styles.marksInfo}>
            <p><strong>Semester 1:</strong> 85%</p>
            <p><strong>Semester 2:</strong> 88%</p>
            <p><strong>CGPA:</strong> 3.7</p>
          </div>
        </div>

        {/* Subjects Info Card */}
        <div className={`${styles.infoCard} ${styles.academicCard}`}>
          <h3>Subjects</h3>
          <div className={styles.subjectsInfo}>
            <ul>
              <li>Data Structures</li>
              <li>Algorithms</li>
              <li>Database Management</li>
              <li>Operating Systems</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <a href="/student-dashboard" className={`${styles.btn} ${styles.btnSecondary}`}>Back to Dashboard</a>
      </div>
    </div>
  );
};

export default AcademicInfo;
