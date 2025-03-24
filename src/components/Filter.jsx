import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Filter.module.css";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    student_id: "",
    branch: "",
    course: "",
    semester: ""
  });

  const [branches, setBranches] = useState([]);

  // Fetch branches when a course is selected
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) return; // Exit if no token found

    if (filters.course) {
      axios
        .get(`http://localhost:5000/api/admin/get-branches?course=${filters.course}`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        })
        .then(response => setBranches(response.data))
        .catch(error => console.error("Error fetching branches:", error));
    } else {
      setBranches([]);
    }
  }, [filters.course]);

  // Handle input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle filter submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Call Parent Component's API Fetching
  };

  // Handle Reset
  const handleReset = () => {
    setFilters({
      student_id: "",
      branch: "",
      course: "",
      semester: ""
    });
    setBranches([]);
    onFilter({}); // Reset in Parent Component
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={`${styles.filterContainer} ${styles.mb4}`}>
          <div className={styles.colMd3}>
            <input
              type="text"
              name="student_id"
              className={styles.formControl}
              placeholder="Search by Student ID"
              value={filters.student_id}
              onChange={handleChange}
            />
          </div>
          <div className={styles.colMd3}>
            <select
              name="course"
              className={styles.formControl}
              value={filters.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
            </select>
          </div>
          <div className={styles.colMd3}>
            <select
              name="branch"
              className={styles.formControl}
              value={filters.branch}
              onChange={handleChange}
            >
              <option value="">-- Select Branch --</option>
              {branches.map(branch => (
                <option key={branch.courseCode} value={branch.courseCode}>
                  {branch.courseName} ({branch.department})
                </option>
              ))}
            </select>
          </div>
          <div className={styles.colMd3}>
            <select
              name="semester"
              className={styles.formControl}
              value={filters.semester}
              onChange={handleChange}
            >
              <option value="">Select Semester</option>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  Semester {i}
                </option>
              ))}
            </select>
          </div>
        <div className={`${styles.colMd12} ${styles.dFlex} ${styles.justifyContentBetween} ${styles.mt2}`}>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            Filter
          </button>
          <button type="button" onClick={handleReset} className={`${styles.btn} ${styles.btnSecondary}`}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
