import React from "react";
import { useNavigate } from "react-router-dom";
import Welcomeheader from "../components/welcomeheader";
import ManagementLogin from "../components/ManagementLogin"
import styles from "./ManagementLoginPage.module.css"
import Footer from '../components/Footer';
const ManagementLoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
        <div>
            <Welcomeheader />
        </div>
        <div className={styles.loginContainer}>
            <ManagementLogin />
        </div>
        <div>
          <Footer />
        </div>
    </div>
  );
};

export default ManagementLoginPage;
