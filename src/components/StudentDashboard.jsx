import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from "axios";
import styles from "./Dashboard.module.css";

const StudentDashboard = ({ feeDetails }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) return; // Exit if no token found

                const response = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                });

                setUser(response.data); // Store user details
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/student/login");
        }
    }, [navigate]);

    return (
      <div className={styles.dashboardContainer}>
        {/* Header Section */}
        <div className={styles.dashboardHeader}>
          <h1>Student Dashboard</h1>
        </div>

        {/* Overview Section */}
        <div className={styles.overviewStats}>
          <div className={styles.statCard}>
            <h3>Academic Status</h3>
            <p><strong>GPA:</strong> 3.85</p>
            <p><strong>Current Semester:</strong> 6th</p>
            <p><strong>Courses Enrolled:</strong> 5</p>
          </div>
          <div className={styles.statCard}>
            <h3>Financial Status</h3>
            <p><strong>Total Fees Paid:</strong> ₹{feeDetails?.total_paid ?? 'N/A'}</p>
            <p><strong>Pending Amount:</strong> ₹{feeDetails?.overdue_total ?? 'N/A'}</p>
            <p><Link to="/fee-details">View Details</Link></p>
          </div>
          <div className={styles.statCard}>
            <h3>Upcoming Exams</h3>
            <p><strong>Math:</strong> Feb 15, 2025</p>
            <p><strong>Physics:</strong> Feb 18, 2025</p>
            <p><Link to="/exams">View Schedule</Link></p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className={styles.notifications}>
          <h2>Notifications</h2>
          <ul>
            <li><strong>Jan 25, 2025:</strong> Timetable for Semester 6 has been updated. <Link to="/timetable">View Timetable</Link></li>
            <li><strong>Jan 20, 2025:</strong> Fee payment deadline is approaching. <Link to="/fee-details">Pay Now</Link></li>
            <li><strong>Jan 15, 2025:</strong> Results for Semester 5 have been published. <Link to="/academic-info">Check Results</Link></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <div className={styles.links}>
            <Link to="/personal-info">Personal Info</Link>
            <Link to="/academic-info">Academic Info</Link>
            <Link to="/fee-details">Fee Details</Link>
            <Link to="/timetable">Timetable</Link>
            <Link to="/transaction-history">Transaction History</Link>
            <Link to="/exams">Exams</Link>
          </div>
        </div>
      </div>
    );
};

export default StudentDashboard;