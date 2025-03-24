import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentLogin.module.css"; // CSS module (optional)

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Simulating backend API call (Replace with actual API endpoint)
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed. Please try again.");
    } else {
      // Redirect or store auth token here
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful!");
      navigate("/student/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.SL}>Student Login</h2>

      {/* Show error message if present */}
      {error && <p className={styles.alert}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.l} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.l} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button className={styles.sb} type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;
