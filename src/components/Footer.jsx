import React from "react";
import styles from "./Footer.module.css"; // Import CSS Module

const Footer = () => {

  return (
    <div className={styles.container}>
      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} College Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
