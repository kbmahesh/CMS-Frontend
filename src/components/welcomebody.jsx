import React from "react";
import { Link } from "react-router-dom";
import styles from "./welcomebody.module.css"; // Import CSS Module

const Welcomebody = () => {

  return (
    <div>
        <div className={styles.welcome}>
            <h1>Welcome to the JNTUA</h1>
            <p>Please select your login type:</p>
            <div className={styles.buttons}>
              <Link to="/admin/login" className={styles.b}>Management Login</Link>
              <Link to="/student/login" className={styles.b}>Student Login</Link>
            </div>
        </div>
    </div>
  );
};

export default Welcomebody;
