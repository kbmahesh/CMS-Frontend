import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../components/Filter";
import StudentTable from "../components/StudentTable";
import styles from "../components/StudentTable.module.css"
import { useNavigate } from "react-router-dom";

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchStudents = async (filters = {}, page = 1) => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-students", {
        params: { ...filters, page, limit: itemsPerPage }
      });
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchStudents({}, newPage);
    }
  };

  return (
    <div>
      <Filter onFilter={(filters) => fetchStudents(filters, 1)} />
      <StudentTable students={students} />
      
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {/* Back to Dashboard Button */}
      <div className={styles.actionButtons}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewStudents;