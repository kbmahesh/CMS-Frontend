import { Link } from "react-router-dom";
import styles from "./StudentLayout.module.css";

const StudentLayout = ({ children }) => {
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        alert("Logged out successfully!");
        window.location.href = "/student/login"; // Redirect to login page
      };
    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.logo}>College Management System</div>
            <nav className={styles.SL}>
                <a href="/student/personalinfo">Personal Info</a>
                <a href="/student/academicinfo">Academic Info</a>
                <a href="/student/feedetails">Fee Details</a>
                    {/* <Link to="/courses">Courses</Link> */}
                <a href="/student/transactionhistory">Transaction History</a>
                    {/* <Link to="/exams">Exams</Link> */}
                <a className={styles.logout} onClick={handleLogout}>
                    Logout
                </a>
            </nav>
        </header>
        
        <main className={styles.content}>{children}</main>
        
        <footer className={styles.footer}>
            &copy; {new Date().getFullYear()} College Management System. All rights reserved.
        </footer>
        </div>
    );
};

export default StudentLayout;
