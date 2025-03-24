import React, { useState } from "react";
import styles from "./StudentLoginPage.module.css"; // Import CSS Module
import Welcomeheader from "../components/welcomeheader"
import StudentLogin from "../components/StudentLogin"
import Footer from "../components/Footer";

const StudentLoginPage = () => {

  return (
    <div className={styles.page}>
      <div>
        <Welcomeheader />
      </div>
      <div className={styles.loginContainer}>
        <StudentLogin />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentLoginPage;
