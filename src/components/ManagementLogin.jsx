import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ManagementLogin.module.css"; // CSS module (optional)

const ManagementLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login Successful!");
      
      navigate("/admin/dashboard"); // Redirect after successful login

    } catch (error) {
      console.error("Login Failed:", error.response?.data || "Error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.ML}>Management Login</h2>

      {/* Show error message if present */}
      {error && <p className={styles.alert}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button className={styles.mb} type="submit">Login</button>
      </form>
    </div>
  );
};

export default ManagementLogin;
