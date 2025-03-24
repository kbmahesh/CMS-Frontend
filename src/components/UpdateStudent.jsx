import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../management/StudentRegistration.module.css"; // CSS Module

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        student_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        course: "",
        branch: "",
        semester: "",
        guardian_name: "",
        guardian_relation: "",
        guardian_phone: "",
    });

    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        return isoDate.split("T")[0]; // Extracts only YYYY-MM-DD
    };

    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/get-student/${id}`)
            .then((response) => {
                setFormData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching student details");
                setLoading(false);
            });
    }, [id]);
    console.log(formData);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
            axios.get(`http://localhost:5000/api/admin/get-branch`)
                .then(response => setBranches(response.data))
                .catch(error => console.error("Error fetching branches:", error));
    }, [formData.course]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/admin/update-student/${id}`, formData)
            .then(() => {
                alert("Student updated successfully!");
                navigate('/admin/viewstudents');
            })
            .catch(() => {
                alert("Failed to update student.");
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.R}>Update Student Details</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.R}>Student ID</label>
                    <input className={styles.inputR} type="text" name="student_id" value={formData.student_id} readOnly />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>First Name</label>
                    <input className={styles.inputR} type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Last Name</label>
                    <input className={styles.inputR} type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Email</label>
                    <input className={styles.inputR} type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Phone</label>
                    <input className={styles.inputR} type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Date of Birth</label>
                    <input className={styles.inputR} type="date" name="dob" value={formatDate(formData.dob)} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Address</label>
                    <input className={styles.inputR} type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Course</label>
                    <select name="course" value={formData.academic?.course} onChange={handleChange} required disabled>
                        <option value="">Select Course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Branch</label>
                    <select name="course_id" value={formData.academic?.course_id} onChange={handleChange} required disabled>
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch.courseCode} value={branch.courseCode}>
                                {branch.courseName} ({branch.department})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Semester</label>
                    <select name="semester" value={formData.semester} onChange={handleChange} required>
                        {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Name</label>
                    <input className={styles.inputR} type="text" name="guardian_name" value={formData.guardian?.guardian_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Relationship</label>
                    <select name="guardian_relation" value={formData.guardian?.guardian_relation} onChange={handleChange} required>
                        <option value="">Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Grandfather">Grandfather</option>
                        <option value="Grandmother">Grandmother</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Phone</label>
                    <input className={styles.inputR} type="text" name="guardian_phone" value={formData.guardian?.guardian_phone} onChange={handleChange} required />
                </div>

                <button type="submit" className={styles.submitBtn}>Update Student</button>
            </form>
            <div className={styles.actionButtons}>
                <button className={styles.btnSecondary} onClick={() => navigate("/admin/viewstudents")}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdateStudent;
