import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./StudentRegistration.module.css"; // Import your CSS module

const StudentRegistration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        student_id: "",
        phone: "",
        dob: "",
        address: "",
        course: "",
        course_id: "",
        semester: "",
        admission_date: "",
        guardian_name: "",
        guardian_relation: "",
        guardian_phone: ""
    });

    const [branches, setBranches] = useState([]);
    const [errors, setErrors] = useState([]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fetch branches when the course changes
    useEffect(() => {
        if (formData.course) {
            axios.get(`http://localhost:5000/api/admin/get-branches?course=${formData.course}`)
                .then(response => setBranches(response.data))
                .catch(error => console.error("Error fetching branches:", error));
        } else {
            setBranches([]);
        }
    }, [formData.course]);
    

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!window.confirm("Are you sure you want to submit the form?")) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/admin/register-student", formData, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                alert(`Student registered successfully! \n Password:" ${response.data.defaultPassword}`);
                // navigate("/admin/dashboard"); // Redirect after successful submission
            } else {
                alert(response.data.errors || []);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form.");
        }
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.R}>Student Registration</h2>

            {/* Error Messages */}
            {errors.length > 0 && (
                <div className={styles.warningAlert}>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            )}

            <form id="studentForm" onSubmit={handleSubmit}>
                {/* Personal Info */}
                <h3>Personal Info</h3>
                <div className={styles.formGroup}>
                    <label className={styles.R}>First Name:</label>
                    <input className={styles.inputR} type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Last Name:</label>
                    <input className={styles.inputR} type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Email:</label>
                    <input className={styles.inputR} type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Student ID:</label>
                    <input className={styles.inputR} type="text" name="student_id" value={formData.student_id} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Phone:</label>
                    <input className={styles.inputR} type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Date of Birth:</label>
                    <input className={styles.inputR} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Address:</label>
                    <input className={styles.inputR} type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                {/* Academic Info */}
                <h3>Academic Info</h3>
                <div className={styles.formGroup}>
                    <label className={styles.R}>Course:</label>
                    <select name="course" value={formData.course} onChange={handleChange} required>
                        <option value="">Select Course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Branch:</label>
                    <select name="course_id" value={formData.course_id} onChange={handleChange} required>
                        <option value="">-- Select Branch --</option>
                        {branches.map(branch => (
                            <option key={branch.courseCode} value={branch.courseCode}>
                                {branch.courseName} ({branch.department})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Semester:</label>
                    <input className={styles.inputR} type="number" name="semester" value={formData.semester} min="1" max="8" onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Admission Date:</label>
                    <input className={styles.inputR} type="date" name="admission_date" value={formData.admission_date} onChange={handleChange} required />
                </div>

                {/* Guardian Info */}
                <h3>Guardian's Information</h3>
                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Name:</label>
                    <input className={styles.inputR} type="text" name="guardian_name" value={formData.guardian_name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Relationship:</label>
                    <select name="guardian_relation" value={formData.guardian_relation} onChange={handleChange} required>
                        <option value="">Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Grandfather">Grandfather</option>
                        <option value="Grandmother">Grandmother</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.R}>Guardian Phone:</label>
                    <input className={styles.inputR} type="tel" name="guardian_phone" value={formData.guardian_phone} onChange={handleChange} required />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitBtn}>Register</button>
            </form>

            <div className={styles.actionButtons}>
                <button className={styles.btnSecondary} onClick={() => navigate("/admin/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default StudentRegistration;
