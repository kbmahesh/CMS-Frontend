import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentTable.module.css";

const StudentTable = ({ students }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.studentTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.academicDetails?.Branch || "N/A"}</td>
                <td>{student.academicDetails?.Course || "N/A"}</td>
                <td>{student.academicDetails?.Semester || "N/A"}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.viewButton}
                    onClick={() =>
                      navigate(`/admin/viewstudents/viewstudent/${student.student_id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className={styles.updateButton}
                    onClick={() =>
                      navigate(`/admin/viewstudents/updatestudent/${student.student_id}`)
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noData}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
