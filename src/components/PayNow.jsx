import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./PayNow.module.css"; // Assuming you use CSS modules

const PayNow = () => {
  const location = useLocation();
  const { transaction_id, student_id, fee_type_id, amount } = location.state || {};
  console.log(transaction_id);
  const [paymentMode, setPaymentMode] = useState("");
  const [payment_proof, setProof] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setProof(reader.result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:5000/api/student/pay-now", {
        transaction_id:transaction_id,
        student_id:student_id,
        fee_type_id,
        amount,
        paymentMode,
        payment_proof, // Base64 encoded image
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Payment submission failed:", error);
      setMessage("Payment submission failed. Please try again.");
    }
  };

  return (
    <div className={styles.payContainer}>
      <h2>Pay Now via Bank Transfer / UPI</h2>

      {message && <div className={styles.alert}>{message}</div>}

      {/* Payment Instructions */}
      <div className={styles.inst}>
        <h4>Payment Instructions:</h4>
        <p><strong>Pay to:</strong> XYZ University Fees Account</p>
        <p><strong>UPI ID:</strong> xyzuniversity@upi</p>
        <p><strong>Bank Account Details:</strong></p>
        <ul>
          <li><strong>Bank:</strong> ABC Bank</li>
          <li><strong>Account Number:</strong> 123456789012345</li>
          <li><strong>IFSC Code:</strong> ABCD1234</li>
        </ul>
        <p><strong>Amount:</strong> Ensure you pay the correct fee amount.</p>
        <p><strong>Important:</strong> After payment, upload the transaction screenshot.</p>
      </div>

      {/* QR Code */}
      <div className={styles.qrContainer}>
        <h4>Scan to Pay (UPI)</h4>
        <img src="/Payment QR.jpg" alt="UPI QR Code" />
        <p>Use the UPI QR code above for payment.</p>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div className={styles.formGroupPay}>
          <label>Amount</label>
          <input type="text" value={`₹${amount}`} readOnly />
          
          <label>Fee Type</label>
          <input type="text" value={fee_type_id} readOnly />
          
          <label>Payment Mode</label>
          <select onChange={(e) => setPaymentMode(e.target.value)} required>
            <option value="">Select Payment Mode</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {/* Upload Screenshot */}
        <div className={styles.formGroupPay}>
          <label>Upload Transaction Screenshot</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        <button type="submit" className={styles.submitBtn}>Submit Payment</button>
      </form>
    </div>
  );
};

export default PayNow;