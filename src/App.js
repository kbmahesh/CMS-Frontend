import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./management/ManagementLoginPage";
import StudentLogin from "./student/StudentLoginPage";
import Welcome from "./pages/welcome";
import Layout from "./Layouts/Layouts";
import ManagementDashboard from "./components/ManagementDashboard";
import StudentRegistration from "./management/StudentRegistration";
import ViewStudents from "./management/ViewStudents";
import ViewStudent from "./components/ViewStudent";
import UpdateStudent from "./components/UpdateStudent";
import ViewFees from "./management/ViewFees";
import AddFees from "./components/AddFees";
import StudentDashboard from "./components/StudentDashboard";
import StudentLayout from "./Layouts/StudentLayout";
import PersonalInfo from "./components/PersonalInfo";
import AcademicInfo from "./components/AcademicInfo";
import FeeDetails from "./components/FeeDetails";
import TransactionHistory from "./components/TransactionHistory";
import FeesOverview from "./components/FeesOverview";
import VerifyReceipts from "./components/VerifyReceipts";
import PayNow from "./components/PayNow";
import ReceiptDetails from "./components/ReceiptDetails";
import Unauthorized from "./components/UnauthorizedPage";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={ <Layout><ManagementDashboard /></Layout>} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/register" element={ <Layout> <StudentRegistration /> </Layout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/viewstudents" element={ <Layout> <ViewStudents /> </Layout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/viewstudents/viewstudent/:id" element={ <Layout> <ViewStudent /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/viewstudents/updatestudent/:id" element={ <Layout> <UpdateStudent /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/viewfees" element={ <Layout> <ViewFees /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/viewfees/:id" element={ <Layout> <FeesOverview /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/addfees" element={ <Layout> <AddFees /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/verifyreceipts" element={ <Layout> <VerifyReceipts /> </Layout> }/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/verifyreceipts/receiptDetails/:transactionId" element={ <Layout> <ReceiptDetails /> </Layout> }/>
        </Route>
        <Route path="/student/login" element={<StudentLogin />} />
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<StudentLayout><StudentDashboard /> </StudentLayout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/personalinfo" element={<StudentLayout><PersonalInfo /> </StudentLayout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/academicinfo" element={<StudentLayout><AcademicInfo /> </StudentLayout> } />
        </Route> 
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/feedetails" element={<StudentLayout><FeeDetails /> </StudentLayout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/feedetails/paynow" element={<StudentLayout><PayNow /> </StudentLayout> } />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/transactionhistory" element={<StudentLayout><TransactionHistory /> </StudentLayout> } />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />    
      </Routes>
    </Router>
  );
};

export default App;
