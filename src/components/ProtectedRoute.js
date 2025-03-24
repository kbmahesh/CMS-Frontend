import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

    if (!user) return <Navigate to="/login" />; // Redirect if not logged in

    return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
