import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./welcomeheader.module.css"; // Import CSS Module

const Welcomeheader = () => {

  return (
    <div className={styles.container}>
        <div className={styles.clgname}>
          <div className={styles.logo}>
              <img className={styles.logoimg} src="/logo.jpg" alt="" />
          </div>
          <div className={styles.clg}>
              <h2>JNTUA College of Engineering (Autonomous) Ananthapur</h2>
              <h4>Sir Mokshagundam Vishveshwariah Road, Ananthapuramu, Andhra Pradesh-515002, INDIA</h4>
              <h4>An ISO 9001:2015 Certified Institution</h4>
          </div>
          <div className={styles.logo}>
              <img className={styles.logoimg} src="/NAAC.jpg" alt="" />
          </div>
      </div>
    </div>
  );
};

export default Welcomeheader;
