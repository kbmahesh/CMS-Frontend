import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../components/Filter";
import StudentTable from "../components/StudentTable";
import FeesTable from "../components/FeeTable";

const ViewFees = () => {
  const [students, setStudents] = useState([]);

  // Function to fetch students (all students initially, filtered ones later)
  const fetchStudents = async (filters = {}) => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-students", { params: filters });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents(); // Load all students initially
  }, []);

  return (
    <div>
      <Filter onFilter={fetchStudents} />
      <FeesTable students={students} />
    </div>
  );
};

export default ViewFees;