import React from "react";
import { useNavigate } from "react-router-dom";
import Welcomeheader from "../components/welcomeheader";
import Welcomebody from "../components/welcomebody"
import styles from "./welcome.module.css"
import Footer from "../components/Footer";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
        <div>
            <Welcomeheader />
        </div>
        <div className={styles.logins}>
            <Welcomebody />
        </div>
        <div>
          <Footer />
        </div>
    </div>
  );
};

export default Welcome;
