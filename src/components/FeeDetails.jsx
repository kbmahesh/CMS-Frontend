import { useEffect,useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./FeeDetails.module.css";

const FeeDetails = () => {
  const navigate = useNavigate();
  const [fees, setFees] = useState(null);
  const [feeSummary, setFeeSummary] = useState(null);
  
      useEffect(() => {
          const fetchUserInfo = async () => {
              try {
                  const token = localStorage.getItem("token"); // Get token from localStorage
                  if (!token) return; // Exit if no token found
  
                  const response = await axios.get("http://localhost:5000/api/student/get-fees", {
                      headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                  });

                  setFeeSummary(response.data.feeSummary);
                  setFees(response.data.fees); // Store user details
              } catch (error) {
                  console.error("Error fetching user data:", error);
              }
          };
  
          fetchUserInfo();
      }, []);
  return (
    <div>
      <h1 className={styles.FH}>Fee Details</h1>
      <div className={styles.feeContainer}>
        {/* Fee Summary */}
        <div className={`${styles.feeCard} ${styles.summaryCard}`}>
          <h3>Fee Summary</h3>
          <div className={styles.feeSummaryInfo}>
            <p><strong>Total Fee:</strong> ₹{feeSummary?.totalFees ?? "N/A"}</p>
            <p><strong>Paid:</strong> ₹{feeSummary?.totalPaid ?? "N/A"}</p>
            <p><strong>Outstanding Balance:</strong> ₹{feeSummary?.totalDue ?? "N/A"}</p>
            <p><strong>Last Payment Date:</strong> {new Date(fees?.[0].next_due_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>

        {/* Fee Breakdown Table */}
        <div className={`${styles.feeCard} ${styles.breakdownCard}`}>
          {/* Fee Breakdown Table */}
          <div className={`${styles.feeCard} ${styles.breakdownCard}`}>
            {fees?.some(fee => fee.due_amount > 0) ? (  // ✅ Corrected condition
              <>
                <h3>Fee Breakdown</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees?.map((fee, index) => (
                      fee.due_amount > 0 && (
                        <tr key={index}>
                          <td>{fee.fee_type}</td>
                          <td>₹{fee.due_amount}</td>
                          <td>{new Date(fee.next_due_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate("/student/feedetails/paynow", {
                                  state: {
                                    transaction_id:fee._id,
                                    student_id:fee.student_id,
                                    fee_type_id: fee.fee_type,
                                    amount: fee.due_amount,
                                  },
                                })
                              }
                                className={styles.btn}
                              >
                              Pay Now
                            </button>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p><strong>✅ No pending dues! All fees are cleared.</strong></p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <a href="/student-dashboard" className={`${styles.btn} ${styles.btnSecondary}`}>Back to Dashboard</a>
      </div>
    </div>
  );
};

export default FeeDetails;
