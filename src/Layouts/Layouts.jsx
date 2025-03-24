import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css"; // Import CSS Module

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    alert("Logged out successfully!");
    window.location.href = "/admin/login"; // Redirect to login page
  };
  

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>College Management System</div>
        <nav>
          {/* Student Management Dropdown */}
          <div className={styles.dropdown}>
            <a href="#" className={styles.dropbtn}>Student Management</a>
            <div className={styles.dropdownContent}>
              <a href="/admin/register">Register Student</a>
              <a href="/admin/viewstudents">View All Students</a>
            </div>
          </div>

          {/* Fee Management Dropdown */}
          <div className={styles.dropdown}>
            <a href="#" className={styles.dropbtn}>Fee Management</a>
            <div className={styles.dropdownContent}>
              <a href="/admin/viewfees">View Fees</a>
              <a href="/admin/addfees">Add Fee Payment</a>
              <a href="/admin/verifyreceipts">Verify Receipts</a>
            </div>
          </div>

          {/* Logout */}
          <div className={styles.dropdown}>
            <a className={styles.logout} onClick={handleLogout}>
                Logout
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.content}>{children}</main>

      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} College Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
